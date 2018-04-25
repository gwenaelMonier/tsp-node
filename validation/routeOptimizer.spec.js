'use strict';

const Joi = require('joi');
const assert = require('assert');
const validation = require('./');

describe('Route optimizer controller request validation', function() {

  describe('Body parameters validation', function() {
    describe('departureTime validation', function() {
      it('should invalidate when departureTime is incorrect', function() {
        let request = instanciateCorrectRequest();

        delete request.body.departureTime;
        assertValidation(request, false, ['"departureTime" is required']);

        request.body.departureTime = null;
        assertValidation(request, false, ['"departureTime" must be a number']);

        request.body.departureTime = 1220004;
        let result = Joi.validate(
          request,
          validation.routeOptimizer,
          {abortEarly: false}
        );

        assert.equal(result.error.details.length, 1);
        assert.equal(
          /^"departureTime" must be larger than or equal to \d+$/
            .test(result.error.details[0].message),
          true
        );
      });

      it('should validate when departureTime is correct', function() {
        let request = instanciateCorrectRequest();

        assertValidation(request, true);

        request.body.departureTime = request.body.departureTime.toString();
        assertValidation(request, true);
      });
    });

    describe('home validation', function() {
      it('should invalidate when home is incorrect', function() {
        let request = instanciateCorrectRequest();

        delete request.body.home;
        assertValidation(request, false, ['"home" is required']);

        request.body.home = null;
        assertValidation(request, false, ['"home" must be an object']);

        request.body.home = 'invalid home';
        assertValidation(request, false, ['"home" must be an object']);
      });

      it('should invalidate when home.lat or home.lng is incorrect',
        function() {
          let request = instanciateCorrectRequest();
          assertInvalidCoordinatesValidation(request.body.home, request);
        }
      );

      it('should validate when home is correct', function() {
        let request = instanciateCorrectRequest();

        assertValidCoordinatesValidation(request.body.home, request);
      });
    });

    describe('tasks validation', function() {
      it('should invalidate when tasks parameter is incorrect', function() {
        let request = instanciateCorrectRequest();

        delete request.body.tasks;
        assertValidation(request, false, ['"tasks" is required']);

        request.body.tasks = null;
        assertValidation(request, false, ['"tasks" must be an array']);

        request.body.tasks = 'invalid tasks';
        assertValidation(request, false, ['"tasks" must be an array']);

        request.body.tasks = [];
        assertValidation(
          request,
          false,
          ['"tasks" must contain at least 1 items']
        );

        request = instanciateCorrectRequest();
        delete request.body.tasks[1].id;
        assertValidation(request, false, ['"id" is required']);
      });

      it('should validate when tasks parameter is correct', function() {
        let request = instanciateCorrectRequest();

        assertValidation(request, true);

        request = instanciateCorrectRequest();
        request.body.tasks.shift();
        assertValidation(request, true);
      });

      describe('task validation', function() {
        it('should invalidate when task is incorrect', function() {
          let request = instanciateCorrectRequest();

          request.body.tasks[0] = null;
          assertValidation(request, false, ['"0" must be an object']);

          request.body.tasks[0] = 12;
          assertValidation(request, false, ['"0" must be an object']);

          request.body.tasks[0] = 'a';
          assertValidation(request, false, ['"0" must be an object']);
        });


        it('should invalidate when task.id is incorrect', function() {
          let request = instanciateCorrectRequest();

          delete request.body.tasks[0].id;
          assertValidation(request, false, ['"id" is required']);

          request.body.tasks[0].id = null;
          assertValidation(request, false, ['"id" must be a number']);

          request.body.tasks[0].id = 'a';
          assertValidation(request, false, ['"id" must be a number']);

          request.body.tasks[0].id = '1a';
          assertValidation(request, false, ['"id" must be a number']);
        });


        it('should invalidate when task.lat or task.lng is incorrect',
          function() {
            let request = instanciateCorrectRequest();

            assertInvalidCoordinatesValidation(request.body.tasks[0], request);
          }
        );


        it('should invalidate when task.duration is incorrect', function() {
          let request = instanciateCorrectRequest();

          delete request.body.tasks[0].duration;
          assertValidation(request, false, ['"duration" is required']);

          request.body.tasks[0].duration = null;
          assertValidation(request, false, ['"duration" must be a number']);

          request.body.tasks[0].duration = 'a';
          assertValidation(request, false, ['"duration" must be a number']);

          request.body.tasks[0].duration = '1a';
          assertValidation(request, false, ['"duration" must be a number']);
        });
      });
    });

    function assertValidation(request, success, messages) {
      let result = Joi.validate(
        request,
        validation.routeOptimizer,
        {abortEarly: false}
      );

      if (success) {
        assert.equal(result.error, null);
      } else {
        assert.equal(result.error.details.length, messages.length);

        result.error.details.forEach(function(detail, index) {
          assert.equal(detail.message, messages[index]);
        });
      }
    }

    function assertValidCoordinatesValidation(coordinatesObject, request) {
      coordinatesObject.lat = '90';
      coordinatesObject.lng = '180';
      assertValidation(request, true);

      coordinatesObject.lat = '-90';
      coordinatesObject.lng = '-180';
      assertValidation(request, true);

      coordinatesObject.lat = 48.83310530000001;
      coordinatesObject.lng = 2.333563799999979;
      assertValidation(request, true);
    }

    function assertInvalidCoordinatesValidation(coordinatesObject, request) {
      delete coordinatesObject.lat;
      delete coordinatesObject.lng;
      assertValidation(
        request,
        false,
        ['"lat" is required', '"lng" is required']
      );

      coordinatesObject.lat = null;
      coordinatesObject.lng = null;
      assertValidation(
        request,
        false,
        ['"lat" must be a number', '"lng" must be a number']
      );

      coordinatesObject.lat = 'invalid';
      coordinatesObject.lng = 'invalid';
      assertValidation(
        request,
        false,
        ['"lat" must be a number', '"lng" must be a number']
      );

      coordinatesObject.lat = '48.Invalid83310530000001';
      coordinatesObject.lng = '2.Invalid333563799999979';
      assertValidation(
        request,
        false,
        ['"lat" must be a number', '"lng" must be a number']
      );

      coordinatesObject.lat = '-90.83310530000001';
      coordinatesObject.lng = '-180.333563799999979';
      assertValidation(
        request,
        false,
        [
          '"lat" must be larger than or equal to -90',
          '"lng" must be larger than or equal to -180',
        ]
      );

      coordinatesObject.lat = '+90.83310530000001';
      coordinatesObject.lng = '+180.333563799999979';
      assertValidation(
        request,
        false,
        [
          '"lat" must be less than or equal to 90',
          '"lng" must be less than or equal to 180',
        ]
      );
    }

  });
});

function getFutureUnixTimestamp() {
  return Math.trunc(Date.now() / 1000 + 100000);
}

function instanciateCorrectRequest() {
  return {
    body: {
      departureTime: getFutureUnixTimestamp(),
      home: {
        lat: 48.83310530000001,
        lng: 2.333563799999979,
      },
      tasks: [
        {
          id: 2,
          lat: 48.879251,
          lng: 2.282264899999973,
          duration: 60,
        },
        {
          id: 3,
          lat: 49.879251,
          lng: 1.282264899999973,
          duration: 15,
        },
      ],
    },
  };
}
