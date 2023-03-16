import { prisma } from '../app';
import { User } from '../models/types.model';

export async function findByEmail(email: string) {
	return await prisma.users.findUnique({
		where: {
			email,
		},
	});
}

export async function create(user: User) {
	return await prisma.users.create({
		data: user,
	});
}
