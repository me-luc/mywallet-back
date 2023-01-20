import { userSchema } from "../schemas/UserSchema.js";
import { usersCollection, sessionsCollection } from "../config/database.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function signIn(req, res) {}

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

		const hashPassword = bcrypt.hash(password, 10);

		const newUser = await usersCollection.insertOne({
			email,
			name,
			password: hashPassword,
		});

		const token = uuid();

		await sessionsCollection.insertOne({
			userId: new ObjectId(newUser.insertedId),
			token,
		});

		return res.sendStatus(201);
	} catch (error) {
		return res.status(500).send("server error");
	}
}

export async function signOut(req, res) {}
