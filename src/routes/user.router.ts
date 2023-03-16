import { Router } from 'express';
import { getUserData } from '../controllers/user.controller';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/token.middleware';

const userRouter = Router();

userRouter.get('/users', validateTokenSchema(), checkTokenAuth, getUserData);

export default userRouter;
