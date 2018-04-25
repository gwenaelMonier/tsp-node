'use strict';

const router = require('express').Router();
const validate = require('express-validation');

const validation = require('../../validation');

const optimizerControllerV1 = require('../../controllers/v1/optimizer.js');

router.post(
  '/routeOptimizer',
  validate(validation.routeOptimizer),
  optimizerControllerV1.routeOptimizer
);

module.exports = router;
