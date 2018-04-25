'use strict';

const request = require('supertest');
const assert = require('assert');
const app = require('../../app');

describe('Route optimizer controller', function() {
  it('should return a 400 response when body is invalid', function(done){
    const body = instanciateCorrectBody();
    delete body.departureTime;

    request(app)
      .post('/api/v1/routeOptimizer')
      .send(body)
      .expect(400)
      .end(function(err, res) {
        const response = JSON.parse(res.text);

        assert.equal(response.status, 'INVALID_REQUEST');
        assert.equal(
          response.statusText,
          'At least one parameters of the request is invalid'
        );
        assert.equal(response.result, null);
        assert.equal(response.errors.length, 1);
        assert.equal(
          response.errors[0].messages[0],
          '"departureTime" is required'
        );

        done();
      });

  });

  it('should return a 200 response when body is valid', function(done){
    const body = instanciateCorrectBody();

    request(app)
      .post('/api/v1/routeOptimizer')
      .send(body)
      .expect(200)
      .end(function(err, res) {
        const response = JSON.parse(res.text);

        assert.equal(response.status, 'OK');
        assert.equal(response.statusText, 'Valid request');
        assert.ok(response.result);
        assert.equal(response.errors, null);

        assert.ok(response.result.totalTime);
        assert.equal(response.result.schedule.length, 2);

        done();
      });
  });
});

function getFutureUnixTimestamp() {
  return Math.trunc(Date.now() / 1000 + 100000);
}

function instanciateCorrectBody() {
  return {
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
  };
}
