import Joi from "joi";

export const entrySchema = Joi.object({
	description: Joi.string().min(1).required().messages({
		"string.base": `"description" should be a type of 'text'`,
		"string.empty": `"description" cannot be an empty field`,
		"string.min": `"description" should have a minimum length of 1`,
		"any.required": `"description" is a required field`,
	}),

	price: Joi.number().min(0).required().messages({
		"string.base": `"price" should be a type of 'number'`,
		"string.empty": `"price" cannot be an empty field`,
		"string.min": `"price" should be bigger than 0`,
		"any.required": `"price" is a required field`,
	}),

	type: Joi.string().valid(["income", "outcome"]).required().messages({
		"string.base": `"type" should be a type of 'text'`,
		"string.empty": `"type" cannot be an empty field`,
		"string.min": `"type" should be bigger than 0`,
		"any.required": `"type" is a required field`,
		"any.only": `"type" must be of "income" or "outcome"`,
	}),
});
