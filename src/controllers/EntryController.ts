import { ObjectId } from "mongodb";
import { usersCollection } from "../config/database.js";
import { getNowDate } from "../utils/Date.js";

export async function getUserHistory(req, res) {
	const user = res.locals.user;
	if (user) return res.status(200).send(user.entries);
	return res.status(500).send("server error");
}

export async function addNewEntry(req, res) {
	const user = res.locals.user;
	const entry = req.body;

	try {
		await usersCollection.findOneAndUpdate(
			{ _id: new ObjectId(user._id) },
			{
				$push: {
					entries: {
						...entry,
						formattedDate: getNowDate(),
						date: Date.now(),
					},
				},
			}
		);

		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return res.status(500).send("server error");
	}
}
