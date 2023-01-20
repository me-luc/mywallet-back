import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const db = await connectToDatabase();

async function connectToDatabase() {
	const mongoClient = new MongoClient(process.env.DEV_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	await mongoClient.connect();
	console.log("connected to mongo");
	const db = await mongoClient.db("my-wallet");
	console.log("connected to database");
	return db;
}

export default db;
