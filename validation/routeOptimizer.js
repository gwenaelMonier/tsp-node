'use strict';

const Joi = require('joi');

module.exports = {
  body: {
    departureTime: Joi.number().min(Math.trunc(Date.now() / 1000)).required(),
    home: Joi.object().required().keys({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
    }),
    tasks: Joi.array().required().min(1).items(
      Joi.object().keys({
        id: Joi.number().required(),
        lat: Joi.number().min(-90).max(90).required(),
        lng: Joi.number().min(-180).max(180).required(),
        duration: Joi.number().required(),
      })
    ),
  },
};
