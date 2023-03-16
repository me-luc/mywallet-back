import { ObjectId } from 'mongodb';
import { tokenSchema } from '../schemas/TokenSchema.js';
import { Request, Response, NextFunction } from 'express';

export async function checkTokenAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { token } = req.headers;

	try {
		// const foundUserSession = await sessionsCollection.findOne({ token });

		// if (!foundUserSession) return res.status(401).send('Invalid token');

		// console.log('user found -> ', foundUserSession);

		// const user = await usersCollection.findOne({
		// 	_id: new ObjectId(foundUserSession.userId),
		// });

		// if (!user) return res.status(404).send("Couldn't find user");

		// res.locals.user = user;

		next();
	} catch (error) {
		console.log('ERROR -> ', error);
		return res.status(500).send('server error');
	}
}

export function validateTokenSchema() {
	return (req: Request, res: Response, next: NextFunction) => {
		// const { token } = req.headers;
		// const validation = tokenSchema.validate(token);
		// if (validation.error) {
		// 	const errors = validation.error.details.map(
		// 		(detail) => detail.message
		// 	);
		// 	return res.status(422).send(errors);
		// }
		// next();
	};
}
