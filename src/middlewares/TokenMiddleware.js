import { ObjectId } from "mongodb";
import { sessionsCollection, usersCollection } from "../config/database.js";
import { tokenSchema } from "../schemas/TokenSchema.js";

export async function checkTokenAuth(req, res, next) {
	const { token } = req.headers;
	try {
		const foundUserSession = await sessionsCollection.findOne({ token });

		if (!foundUserSession) return res.status(401).send("Invalid token");

		const user = await usersCollection.findOne({
			_id: new ObjectId(foundUserSession.userId),
		});

		res.locals.user = user;

		next();
	} catch (error) {
		console.log("ERROR -> ", error);
		return res.status(500).send("server error");
	}
}

export function validateTokenSchema() {
	return (req, res, next) => {
		const { token } = req.headers;

		const validation = tokenSchema.validate(token);

		if (validation.error) {
			const errors = validation.error.details.map(
				(detail) => detail.message
			);
			return res.status(422).send(errors);
		}
		next();
	};
}
