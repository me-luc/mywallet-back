import { prisma } from '../app';
import { Session } from '../models/types.model';

export async function findByToken(token: string) {
	return await prisma.sessions.findUnique({
		where: {
			token,
		},
	});
}

export async function createSession(session: Session) {
	return await prisma.sessions.create({
		data: session,
	});
}

export async function deleteById(id: string) {
	return await prisma.sessions.delete({
		where: {
			id,
		},
	});
}

export async function deleteByToken(token: string) {
	return await prisma.sessions.delete({
		where: {
			token,
		},
	});
}
