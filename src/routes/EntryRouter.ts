import { Router } from 'express';
import { addNewEntry, getUserHistory } from '../controllers/EntryController';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/TokenMiddleware';
import { validateSchema } from '../middlewares/ValidateSchema';
import { entrySchema } from '../schemas/EntrySchema';

const entryRouter = Router();

entryRouter.get(
	'/entries',
	validateTokenSchema(),
	checkTokenAuth,
	getUserHistory
);
entryRouter.post(
	'/entries',
	validateTokenSchema(),
	checkTokenAuth,
	validateSchema(entrySchema),
	addNewEntry
);

export default entryRouter;
