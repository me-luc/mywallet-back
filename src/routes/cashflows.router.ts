import { Router } from 'express';
import {
	addNewEntry,
	getUserHistory,
} from '../controllers/cashflow.controller';
import {
	checkTokenAuth,
	validateTokenSchema,
} from '../middlewares/token.middleware';
import { validateSchema } from '../middlewares/schema.middleware';
import { entrySchema } from '../schemas/entry.schema';

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
