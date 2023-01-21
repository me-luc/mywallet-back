import { Router } from "express";
import { addNewEntry, getUserHistory } from "../controllers/History.js";
import {
	checkTokenAuth,
	validateTokenSchema,
} from "../middlewares/TokenMiddleware.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { entrySchema } from "../schemas/EntrySchema.js";

const historyRouter = Router();

historyRouter.get("/history", getUserHistory);
historyRouter.post(
	"/history",
	validateTokenSchema(),
	checkTokenAuth,
	validateSchema(entrySchema),
	addNewEntry
);

export default historyRouter;
