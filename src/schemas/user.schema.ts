import Joi from 'joi';

export const userSchema = Joi.object({
	name: Joi.string().min(1).required().messages({
		'string.base': `"name" should be a type of 'text'`,
		'string.empty': `"name" cannot be an empty field`,
		'string.min': `"name" should have a minimum length of 1`,
		'any.required': `"name" is a required field`,
	}),
	email: Joi.string().email().required().messages({
		'string.base': `"email" should be a type of 'text'`,
		'string.empty': `"email" cannot be an empty field`,
		'string.min': `"email" should have a minimum length of 1`,
		'any.required': `"email" is a required field`,
	}),
	password: Joi.string().min(8).max(16).required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'string.empty': `"password" cannot be an empty field`,
		'string.min': `"password" should have a minimum length of 8`,
		'string.max': `"password" should have a maximum length of 18`,
		'any.required': `"password" is a required field`,
	}),
	confirmPassword: Joi.string()
		.valid(Joi.ref('password'))
		.label('confirm password')
		.required()
		.messages({
			'any.only': "Passwords doesn't match",
		}),
});
