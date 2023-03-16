import { prisma } from '../app';
import { User } from '../models/types.model';

export async function findUserByEmail(email: string) {
	return await prisma.users.findUnique({
		where: {
			email,
		},
	});
}

export async function addNewUser(user: User) {
	return await prisma.users.create({
		data: user,
	});
}
