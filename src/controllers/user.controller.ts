import { Request, Response } from 'express';

export async function getUserData(req: Request, res: Response) {
	const user = res.locals.user;
	return res.status(200).send({ name: user.name, email: user.email });
}
