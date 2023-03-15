import { Router } from 'express';
import { getUserData } from '../controllers/UserController.js';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/TokenMiddleware.js';

const userRouter = Router();

userRouter.get('/users', validateTokenSchema(), checkTokenAuth, getUserData);

export default userRouter;
