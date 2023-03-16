import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import middlewares from './app.middlewares';

dotenv.config();
export const prisma = new PrismaClient();

const app = express().use(...middlewares);

const PORT = process.env.PORT || 9191;
app.listen(PORT, async function () {
	connectToDatabase();
	console.log(`server is running on port ${PORT}`);
});

async function connectToDatabase() {
	try {
		await prisma.$connect;
		console.log('Prisma is connected to database');
	} catch (error) {
		await prisma.$disconnect;
		console.log('Error on connecting to database -> ', error);
	}
}
