import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/AuthController';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/TokenMiddleware';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signUp);
authRouter.put('/sign-out', validateTokenSchema(), checkTokenAuth, signOut);

export default authRouter;
