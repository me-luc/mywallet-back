import { prisma } from '../app';

export async function findUserByEmail(email: string) {
	return await prisma.users.findUnique({
		where: {
			email,
		},
	});
}
