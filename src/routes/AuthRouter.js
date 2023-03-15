import { Router, Request, Response } from 'express';
import { signIn, signOut, signUp } from '../controllers/AuthController.js';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/TokenMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signUp);
authRouter.put('/sign-out', validateTokenSchema(), checkTokenAuth, signOut);

export default authRouter;
