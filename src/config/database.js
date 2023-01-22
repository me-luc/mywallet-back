import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const db = await connectToDatabase();

async function connectToDatabase() {
	try {
		const mongoClient = new MongoClient(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverApi: ServerApiVersion.v1,
		});
		await mongoClient.connect();
		console.log("connected to mongo");
		const db = await mongoClient.db("my-wallet");
		console.log("connected to database");
		return db;
	} catch (error) {
		console.log("error while trying to connect to database");
	}
}

const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");

export { usersCollection, sessionsCollection };
