import { userSchema } from "../schemas/UserSchema.js";
import { tokenSchema } from "../schemas/TokenSchema.js";
import { usersCollection, sessionsCollection } from "../config/database.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function signIn(req, res) {
	const { email, password } = req.body;

	try {
		const foundUser = await usersCollection.findOne({ email });

		if (!foundUser) return res.status(401).send("Invalid data!");

		const isPasswordCorrect = await bcrypt.compare(
			password,
			foundUser.password
		);

		if (!isPasswordCorrect) return res.status(401).send("Invalid data!");

		const userHasToken = await sessionsCollection.findOneAndDelete({
			userId: new ObjectId(foundUser._id),
		});

		const token = uuid();

		await sessionsCollection.insertOne({
			userId: new ObjectId(foundUser._id),
			date: Date.now(),
			token,
		});

		return res.status(201).send(token);
	} catch (error) {
		console.log(error);
		return res.status(500).send("server error");
	}
}

export async function signUp(req, res) {
	const user = req.body;
	const validation = userSchema.validate(user, { abortEarly: false });

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	try {
		const { email, password, name } = user;
		const foundUser = await usersCollection.findOne({ email });

		if (foundUser) return res.status(401).send("Invalid data");

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = await usersCollection.insertOne({
			email,
			name,
			password: hashPassword,
			history: [],
		});

		const token = uuid();

		await sessionsCollection.insertOne({
			userId: new ObjectId(newUser.insertedId),
			token,
		});

		return res.status(201).send(token);
	} catch (error) {
		return res.status(500).send("server error");
	}
}

export async function signOut(req, res) {
	const { token } = req.body;

	const result = await sessionsCollection.findOneAndDelete({ token });

	return res.status(200).send(result);
}
