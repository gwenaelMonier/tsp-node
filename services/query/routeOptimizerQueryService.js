'use strict';

const GoogleMapDirectionsQuery =
  require('../../clients/googleMapDirectionsQuery.js');
const OptimizedRoute = require('./optimizedRoute.js');

const googleMapClient = require('../../clients/googleMapClient.js');
const responseStatus = require('../../controllers/model/responseStatus.js');

module.exports.getOptimizedRoute = function(routeOptimizerQuery) {
  const query = new GoogleMapDirectionsQuery(routeOptimizerQuery);

  return googleMapClient.getDirections(query)
    .then(function(googleMapDirectionsResponse) {
      if (googleMapDirectionsResponse.status === responseStatus.OK.status) {
        googleMapDirectionsResponse.result =
          new OptimizedRoute(
            googleMapDirectionsResponse.result,
            routeOptimizerQuery
          );
      }

      return googleMapDirectionsResponse;
    });
};
