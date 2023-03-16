import { prisma } from '../app';
import { Session } from '../models/types.model';

const sessions = prisma.sessions;

export async function findByToken(token: string) {
	return await sessions.findUnique({
		where: {
			token,
		},
	});
}

export async function createSession(session: Session) {
	return await sessions.create({
		data: session,
	});
}

export async function deleteById(id: string) {
	return await sessions.delete({
		where: {
			id,
		},
	});
}

export async function deleteByToken(token: string) {
	return await sessions.delete({
		where: {
			token,
		},
	});
}
