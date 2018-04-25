'use strict';

class OptimizedRoute {

  constructor(googleMapDirectionsResult, routeOptimizerQuery) {
    let startsAt;
    let endsAt = routeOptimizerQuery.departureTime;
    const schedule = [];
    const taskCount = routeOptimizerQuery.tasks.length;
    const waypointOrder = googleMapDirectionsResult.routes[0].waypoint_order;

    for (var i = 0; i < taskCount; i++) {
      const leg = googleMapDirectionsResult.routes[0].legs[i];
      const task = routeOptimizerQuery.tasks[waypointOrder[i]];

      startsAt = endsAt + leg.duration.value;
      endsAt += leg.duration.value + task.duration * 60;

      schedule.push({
        id: task.id,
        startsAt: startsAt,
        endsAt: endsAt,
        lat: task.lat,
        lng: task.lng,
      });
    }

    const legToHome = googleMapDirectionsResult.routes[0].legs[taskCount];
    const totalTimeSeconds =
      endsAt + legToHome.duration.value - routeOptimizerQuery.departureTime;

    this.totalTime = Math.round(totalTimeSeconds / 60);
    this.schedule = schedule;
  }
}

module.exports = OptimizedRoute;
