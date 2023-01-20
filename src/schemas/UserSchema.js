import Joi from "joi";

export const userSchema = Joi.object({
	name: Joi.string().min(1).required().messages({
		"string.base": `"description" should be a type of 'text'`,
		"string.empty": `"description" cannot be an empty field`,
		"string.min": `"description" should have a minimum length of 1`,
		"any.required": `"description" is a required field`,
	}),
	email: Joi.string().email().required().messages({
		"string.base": `"description" should be a type of 'text'`,
		"string.empty": `"description" cannot be an empty field`,
		"string.min": `"description" should have a minimum length of 1`,
		"any.required": `"description" is a required field`,
	}),
	password: Joi.string().min(8).max(16).required().messages({
		"string.base": `"password" should be a type of 'text'`,
		"string.empty": `"password" cannot be an empty field`,
		"string.min": `"password" should have a minimum length of 8`,
		"string.max": `"password" should have a maximum length of 18`,
		"any.required": `"password" is a required field`,
	}),
	confirmPassword: joi
		.string()
		.valid(joi.ref("password"))
		.label("")
		.required()
		.messages({
			"any.only": "Passwords doesn't match",
		}),
});
