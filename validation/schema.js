import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com','net','org']}}).required(),
  password: Joi.string().min(8).max(30).required().label('Password'),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm Password').messages({ 'any.only': '{{#label}} does not match password' }),
}).required()

export { registerSchema }