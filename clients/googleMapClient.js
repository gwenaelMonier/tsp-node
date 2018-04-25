'use strict';

const googleMaps = require('@google/maps');

const responseStatus = require('../controllers/model/responseStatus.js');
const Response = require('../controllers/model/response.js');

const googleMapsClient = googleMaps.createClient({
  key: process.env.GOOGLE_MAP_API_KEY,
  Promise: Promise,
});

function handleError(response) {
  const apiResponse = new Response(
    responseStatus.UNKNOWN_ERROR.status,
    responseStatus.UNKNOWN_ERROR.statusText
  );

  if (response.status === 200) {
    apiResponse.status = response.json.status;
    apiResponse.statusText = response.json.error_message;
  } else {
    console.warn(response);
  }
  return apiResponse;
}

function getDirections(googleMapDirectionsQuery) {
  return googleMapsClient.directions(googleMapDirectionsQuery)
    .asPromise()
    .then(function(response) {
      const statusInfo = responseStatus[response.json.status];
      const apiResponse = new Response(
        statusInfo.status,
        statusInfo.statusText
      );

      if (statusInfo.status === responseStatus.OK.status) {
        apiResponse.result = response.json;
      }

      return apiResponse;
    }).catch(handleError);
}

module.exports = {
  getDirections: getDirections,
};
