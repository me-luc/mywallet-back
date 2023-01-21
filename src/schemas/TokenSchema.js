import Joi from "joi";

export const tokenSchema = Joi.string().min(32).max(36).messages({
	"string.base": `"token" should be a type of 'string'`,
	"string.empty": `"token" cannot be an empty field`,
	"string.min": `"token" should be bigger than 36`,
});
