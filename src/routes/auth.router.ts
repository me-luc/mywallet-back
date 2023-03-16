import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/token.middleware';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signUp);
authRouter.put('/sign-out', validateTokenSchema(), checkTokenAuth, signOut);

export default authRouter;
