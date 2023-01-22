import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter, entryRouter, userRouter } from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use([authRouter, entryRouter, userRouter]);

app.listen(process.env.PORT || 9191, function () {
	console.log(`server is running on port ${PORT}`);
});
