import { Response, Request, NextFunction } from 'express';
import { Schema } from 'joi';

export function validateSchema(schema: Schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		console.log('BODY -> ', req.body);
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const errors = error.details.map(
				(detail: { message: string }) => detail.message
			);
			return res.status(422).send(errors);
		}
		next();
	};
}
