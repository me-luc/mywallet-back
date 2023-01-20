import { Router } from "express";
import { addNewEntry, getUserHistory } from "../controllers/History.js";

const historyRouter = Router();

historyRouter.get("/history", getUserHistory);
historyRouter.post("/history", addNewEntry);

export default historyRouter;
