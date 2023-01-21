import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/AuthController.js";

const authRouter = Router();

authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-out", signOut);

export default authRouter;
