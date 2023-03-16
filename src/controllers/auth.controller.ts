import { userSchema } from '../schemas/user.schema';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { create, findByEmail } from '../repository/users.repository';
import { User } from '../models/types.model';
import {
	createSession,
	deleteByToken,
} from '../repository/sessions.repository';
import { IncomingHttpHeaders } from 'http';

interface CustomHeaders extends IncomingHttpHeaders {
	token?: string;
}

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

		const token = uuid();

		await createSession({ userId: foundUser.id, token });
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
		const newUser = await create({ ...user, password: hashPassword });

		const token = uuid();
		await createSession({ userId: newUser.id, token });

		return res.status(201).send(token);
	} catch (error) {
		return res.status(500).send('server error');
	}
}

export async function signOut(req: Request, res: Response) {
	const { token } = req.headers as CustomHeaders;

	if (!token) return res.status(404).send('Token missing...');

	const result = await deleteByToken(token);

	return res.status(200).send(result);
}
