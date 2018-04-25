'use strict';

const routeOptimizerQueryService =
  require('../../services/query/routeOptimizerQueryService.js');
const responseStatus = require('../model/responseStatus.js');

module.exports.routeOptimizer = function(req, res){
  routeOptimizerQueryService.getOptimizedRoute(req.body)
    .then(function(response) {
      const status = response.status === responseStatus.OK.status ? 200 : 400;
      res.status(status).json(response);
    });
};
