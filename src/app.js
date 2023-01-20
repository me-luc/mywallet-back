import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

db.collection("haha").insertOne({ name: "hey" });

app.post("/sign-in", async (req, res) => {});

app.post("/sign-up", async (req, res) => {});

app.get("/history", async (req, res) => {});

const PORT = process.env.PORT || 9191;
app.listen(PORT, function () {
	console.log(`server is running on port ${PORT}`);
});
