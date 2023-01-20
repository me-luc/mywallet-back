import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter, historyRouter } from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use([authRouter, historyRouter]);

const PORT = process.env.PORT || 9191;
app.listen(PORT, function () {
	console.log(`server is running on port ${PORT}`);
});
