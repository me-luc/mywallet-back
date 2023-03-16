import { Router } from 'express';
import { getUserData } from '../controllers/UserController';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/TokenMiddleware';

const userRouter = Router();

userRouter.get('/users', validateTokenSchema(), checkTokenAuth, getUserData);

export default userRouter;
