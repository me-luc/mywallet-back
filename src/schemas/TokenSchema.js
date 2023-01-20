import Joi from "joi";

export const tokenSchema = Joi.object({
	token: Joi.string().min(1).required().messages({
		"string.base": `"token" should be a type of 'string'`,
		"string.empty": `"token" cannot be an empty field`,
		"string.min": `"token" should be bigger than 0`,
		"any.required": `"token" is a required field`,
	}),
});
