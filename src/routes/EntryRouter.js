import { Router } from 'express';
import { addNewEntry, getUserHistory } from '../controllers/EntryController.js';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/TokenMiddleware.js';
import { validateSchema } from '../middlewares/ValidateSchema.js';
import { entrySchema } from '../schemas/EntrySchema.js';

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
