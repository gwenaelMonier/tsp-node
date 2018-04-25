'use strict';

const OptimizedRoute = require('./optimizedRoute.js');
const assert = require('assert');

describe('Optimized route class validation', function() {

  describe('Constructor validation', function() {
    it('should construct a correct object when arguments are correct',
      function() {
        const googleMapDirectionsResult =
          instanciateGoogleMapDirectionsResult();
        const routeOptimizerQuery = instanciateRouteOptimizerQuery();
        const targetOptimizedRoute = instanciateOptimizedRoute();

        const optimizedRoute = new OptimizedRoute(
          googleMapDirectionsResult,
          routeOptimizerQuery
        );

        assert.deepEqual(optimizedRoute, targetOptimizedRoute);
      }
    );
  });
});

function instanciateOptimizedRoute() {
  return {
    totalTime: 330,
    schedule: [
      {
        id: 4,
        startsAt: 1524904748,
        endsAt: 1524910148,
        lat: 48.83477,
        lng: 2.370769999999993,
      },
      {
        id: 1,
        startsAt: 1524911257,
        endsAt: 1524913957,
        lat: 48.8623348,
        lng: 2.3447356000000354,
      },
      {
        id: 2,
        startsAt: 1524915091,
        endsAt: 1524918691,
        lat: 48.879251,
        lng: 2.282264899999973,
      },
      {
        id: 3,
        startsAt: 1524920570,
        endsAt: 1524922370,
        lat: 48.7251521,
        lng: 2.259899799999971,
      },
    ],
  };
}

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

function instanciateGoogleMapDirectionsResult() {
  return {
    geocoded_waypoints: [],
    routes: [
      {
        bounds: {},
        copyrights: 'Map data ©2018 Google',
        legs: [
          {
            distance: {
              text: '3.1 km',
              value: 3073,
            },
            duration: {
              text: '11 mins',
              value: 653,
            },
            end_address: 'Rue Ada Lovelace, 75013 Paris, France',
            end_location: {
              lat: 48.8347466,
              lng: 2.3707914,
            },
            start_address: '1 Rue Jean-Claude Arnould, 75014 Paris, France',
            start_location: {
              lat: 48.83301950000001,
              lng: 2.3339469,
            },
            steps: [],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
          {
            distance: {
              text: '4.4 km',
              value: 4406,
            },
            duration: {
              text: '18 mins',
              value: 1109,
            },
            end_address: '35 Allée Jules Supervielle, 75001 Paris, France',
            end_location: {
              lat: 48.86187409999999,
              lng: 2.3445434,
            },
            start_address: 'Rue Ada Lovelace, 75013 Paris, France',
            start_location: {
              lat: 48.8347466,
              lng: 2.3707914,
            },
            steps: [],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
          {
            distance: {
              text: '5.4 km',
              value: 5438,
            },
            duration: {
              text: '19 mins',
              value: 1134,
            },
            end_address: '33 Boulevard Pershing, 75017 Paris, France',
            end_location: {
              lat: 48.8792848,
              lng: 2.2822046,
            },
            start_address: '35 Allée Jules Supervielle, 75001 Paris, France',
            start_location: {
              lat: 48.86187409999999,
              lng: 2.3445434,
            },
            steps: [],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
          {
            distance: {
              text: '28.6 km',
              value: 28563,
            },
            duration: {
              text: '31 mins',
              value: 1879,
            },
            end_address: '45 Avenue Carnot, 91300 Massy, France',
            end_location: {
              lat: 48.7247305,
              lng: 2.2606561,
            },
            start_address: '33 Boulevard Pershing, 75017 Paris, France',
            start_location: {
              lat: 48.8792848,
              lng: 2.2822046,
            },
            steps: [],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
          {
            distance: {
              text: '19.2 km',
              value: 19193,
            },
            duration: {
              text: '25 mins',
              value: 1501,
            },
            end_address: '1 Rue Jean-Claude Arnould, 75014 Paris, France',
            end_location: {
              lat: 48.83301950000001,
              lng: 2.3339469,
            },
            start_address: '45 Avenue Carnot, 91300 Massy, France',
            start_location: {
              lat: 48.7247305,
              lng: 2.2606561,
            },
            steps: [],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
        ],
        overview_polyline: {},
        summary: 'Boulevard Auguste Blanqui and Boulevard Vincent Auriol',
        warnings: [],
        waypoint_order: [3, 0, 1, 2],
      },
    ],
    status: 'OK',
  };
}
