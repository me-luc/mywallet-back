import dotenv from 'dotenv';
import { MongoClient, Db, Collection } from 'mongodb';

export const collections: { users?: Collection; sessions?: Collection } = {};

export async function connectToDatabase() {
	try {
		dotenv.config();

		if (!process.env.DATABASE_URL)
			throw new Error('Database URL missing..');

		const client: MongoClient = new MongoClient(process.env.DATABASE_URL!);

		await client.connect();

		const db: Db = client.db(process.env.DB_NAME!);

		const usersCollection: Collection = db.collection('users');
		const sessionsCollection: Collection = db.collection('sessions');

		collections.users = usersCollection;
		collections.sessions = sessionsCollection;

		if (!collections.users || !collections.sessions) {
			throw new Error('Required collections are missing');
		}
		console.log(`Successfully connected to database: ${db.databaseName}`);
	} catch (error) {
		console.log('ERROR WHILE TRYING TO CONNECT TO DATABSE -> ', error);
	}
}
