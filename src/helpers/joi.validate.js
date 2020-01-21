import JoiP from '@hapi/joi';
import joiDate from '@hapi/joi-date';

const Joi = JoiP.extend(joiDate);
const multyCity = Joi.object().keys({
  From: Joi.number().integer().required().messages({
    'any.required': 'Origin is required',
    'string.empty': 'Origin is not allowed to be empty'
  }),
  To: Joi.number().integer().required().messages({
    'any.required': 'Destination is required',
    'string.empty': 'Destination is not allowed to be empty'
  }),
  reason: Joi.string().required().messages({
    'any.required': 'Reason is required',
    'string.empty': 'Reason is not allowed to be empty'
  }),
  departureDate: Joi.date().greater('now').utc().format('YYYY-MM-DD')
    .required()
    .messages({
      'date.greater': 'Date should be greater than today\'s date',
      'date.format': 'Date must be in YYYY-MM-DD format',
      'any.required': 'Travel date is required'
    }),
  accomodationId: Joi.number().integer(),
  type: Joi.string().required().messages({
    'any.required': 'Type is required please',
    'string.empty': 'Type is not allowed to be empty'
  }),
  isUpdated: Joi.boolean().optional()
});

export default multyCity;
