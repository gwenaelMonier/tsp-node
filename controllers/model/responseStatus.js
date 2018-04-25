'use strict';

const responseStatus = {
  OK: {
    status: 'OK',
    statusText: 'Valid request',
  },
  NOT_FOUND: {
    status: 'NOT_FOUND',
    statusText: 'At least one geographical point is not found',
  },
  ZERO_RESULTS: {
    status: 'ZERO_RESULTS',
    statusText: 'No path found between geographical points',
  },
  MAX_WAYPOINTS_EXCEEDED: {
    status: 'MAX_WAYPOINTS_EXCEEDED',
    statusText: 'Waypoints limit exceeded (at most 23 waypoints authorized)',
  },
  INVALID_REQUEST: {
    status: 'INVALID_REQUEST',
    statusText: 'At least one parameters of the request is invalid',
  },
  OVER_QUERY_LIMIT: {
    status: 'OVER_QUERY_LIMIT',
    statusText: 'Google map directions number of query exceeded',
  },
  REQUEST_DENIED: {
    status: 'REQUEST_DENIED',
    statusText: 'API not authorized to use Google map directions API',
  },
  UNKNOWN_ERROR: {
    status: 'UNKNOWN_ERROR',
    statusText: 'Unknown error',
  },
};

module.exports = responseStatus;
