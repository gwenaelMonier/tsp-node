'use strict';

class GoogleMapDirectionsQuery {

  constructor(routeOptimizerQuery) {
    const waypoints = routeOptimizerQuery.tasks.map(function(task) {
      return {
        lat: task.lat,
        lng: task.lng,
      };
    });

    this.origin = routeOptimizerQuery.home;
    this.destination = routeOptimizerQuery.home;
    this.waypoints = waypoints;
    this.optimize = true;
    this.mode = 'driving';
  }
}

module.exports = GoogleMapDirectionsQuery;
