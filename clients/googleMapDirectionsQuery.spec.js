'use strict';

const GoogleMapDirectionsQuery = require('./googleMapDirectionsQuery.js');
const assert = require('assert');

describe('Google Map directions query class validation', function() {

  describe('Constructor validation', function() {
    it('should construct a correct object when arguments are correct',
      function() {
        const routeOptimizerQuery = instanciateRouteOptimizerQuery();
        const targetGoogleMapDirectionsQuery =
          instanciateGoogleMapDirectionsQuery();

        const googleMapDirectionsQuery =
          new GoogleMapDirectionsQuery(routeOptimizerQuery);

        assert.deepEqual(
          googleMapDirectionsQuery,
          targetGoogleMapDirectionsQuery
        );
      }
    );
  });
});

function instanciateRouteOptimizerQuery() {
  return {
    departureTime: 1524904095,
    home: {
      lat: 48.83310530000001,
      lng: 2.333563799999979,
    },
    tasks: [
      {
        id: 1,
        lat: 48.8623348,
        lng: 2.3447356000000354,
        duration: 45,
      },
      {
        id: 2,
        lat: 48.879251,
        lng: 2.282264899999973,
        duration: 60,
      },
      {
        id: 3,
        lat: 48.7251521,
        lng: 2.259899799999971,
        duration: 30,
      },
      {
        id: 4,
        lat: 48.83477,
        lng: 2.370769999999993,
        duration: 90,
      },
    ],
  };
}

function instanciateGoogleMapDirectionsQuery() {
  return {
    origin: {
      lat: 48.83310530000001,
      lng: 2.333563799999979,
    },
    destination: {
      lat: 48.83310530000001,
      lng: 2.333563799999979,
    },
    waypoints: [
      {
        lat: 48.8623348,
        lng: 2.3447356000000354,
      },
      {
        lat: 48.879251,
        lng: 2.282264899999973,
      },
      {
        lat: 48.7251521,
        lng: 2.259899799999971,
      },
      {
        lat: 48.83477,
        lng: 2.370769999999993,
      },
    ],
    optimize: true,
    mode: 'driving',
  };
}
