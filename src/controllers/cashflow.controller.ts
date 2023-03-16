import { create } from '../repository/cashflow.repository';
import { findByToken } from '../repository/sessions.repository.js';
import { getNowDate } from '../utils/Date';
import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

interface CustomHeaders extends IncomingHttpHeaders {
	token: string;
}

export function getUserHistory(req: Request, res: Response) {
	const user = res.locals.user;
	if (user) return res.status(200).send(user.entries);
	return res.status(500).send('server error');
}

export async function addNewEntry(req: Request, res: Response) {
	const user = res.locals.user;
	const { type, title, price } = req.body;
	const { token } = req.headers as CustomHeaders;

	try {
		const foundUser = await findByToken(token);

		if (!foundUser) return res.sendStatus(404);

		await create({ title, price, type, ownerId: foundUser.id });
		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).send('server error');
	}
}
