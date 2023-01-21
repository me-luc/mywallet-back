import { ObjectId } from "mongodb";
import { sessionsCollection, usersCollection } from "../config/database.js";
import { tokenSchema } from "../schemas/TokenSchema.js";
import { entrySchema } from "../schemas/EntrySchema.js";

export async function getUserHistory(req, res) {
	const { token } = req.body;

	const validation = tokenSchema.validate(token);

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	try {
		const foundUserSession = await sessionsCollection.findOne({ token });

		if (!foundUserSession) return res.status(401).send("Invalid token");

		const user = await usersCollection.findOne({
			_id: new ObjectId(foundUserSession.userId),
		});

		return res.status(200).send(user.history);
	} catch (error) {
		console.log(error);
		return res.status(500).send("server error");
	}
}

export async function addNewEntry(req, res) {
	const { entry } = req.body;
	const { token } = req.headers;

	return res.sendStatus(200);

	const validateToken = tokenSchema.validate(token);

	if (validateToken.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	const validateEntry = entrySchema.validate(entry);

	if (validateEntry.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}
}
