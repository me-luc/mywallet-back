import { userSchema } from '../schemas/user.schema';
import { tokenSchema } from '../schemas/token.schema';
import { Request, Response } from 'express';
import { collections } from '../database/database.service';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { create, findByEmail } from '../repository/users.repository';
import { User } from '../models/types.model';

export async function signIn(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const foundUser = await findByEmail(email);
		if (!foundUser) return res.status(401).send('Invalid data!');

		const isPasswordCorrect = await bcrypt.compare(
			password,
			foundUser.password
		);
		if (!isPasswordCorrect) return res.status(401).send('Invalid data!');

		const userHasToken = await collections.sessions.findOneAndDelete({
			userId: new ObjectId(foundUser._id),
		});
		const token = uuid();
		await collections.sessions.insertOne({
			userId: new ObjectId(foundUser._id),
			date: Date.now(),
			token,
		});
		return res.status(201).send(token);
	} catch (error) {
		console.log(error);
		return res.status(500).send('server error');
	}
}

export async function signUp(req: Request, res: Response) {
	const user: User = req.body;
	const validation = userSchema.validate(user, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map(
			(detail: { message: string }) => detail.message
		);
		return res.status(422).send(errors);
	}

	try {
		const { email, password, name } = user;
		const foundUser = await findByEmail(email);
		if (foundUser) return res.status(401).send('Invalid data');

		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await create(user);

		const token = uuid();

		await collections.sessions.insertOne({
			userId: new ObjectId(newUser.insertedId),
			token,
		});
		return res.status(201).send(token);
	} catch (error) {
		return res.status(500).send('server error');
	}
}

export async function signOut(req: Request, res: Response) {
	const { token } = req.headers;

	const result = await collections.sessions.findOneAndDelete({ token });

	return res.status(200).send(result);
}
