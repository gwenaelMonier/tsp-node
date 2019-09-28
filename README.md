# TSP-node
A node.js API to solve [Traveling Salesman Problem](https://developers.google.com/optimization/routing/tsp).

## Configuration
Add your google map api key (with directions enabled) to file tsp-node/.env ([Create google maps directions API key](https://developers.google.com/maps/documentation/directions/start#get-a-key))
```
GOOGLE_MAP_API_KEY=<API key>
```

## Commands

**Install dependencies**
```bash
npm install
```

**Run unit tests and linter**
```bash
npm test
```

**Run app**
```bash
npm start
```

## Documentation

When app is running you can check API documentation here : http://localhost:3000/api-docs/

## Endpoints
### POST /routeOptimizer

- This method consume the list of tasks, with their durations and coordinates, and return a **schedule**, that takes into account both the travel time between those points and the duration of the task at each point.
- The method return the most efficient route, that accounts for **driving time**
- The task schedule returned take the **home coordinates** into account. *Example : If the first task is 30minutes away, and the departureTime is set to 09:00am, the first task is scheduled at 09:30*

**Input :**

```javascript
{
   // Time at which we're leaving home
   "departureTime": "1508756400",
   "home": {
      "lat": 48.83310530000001,
      "lng": 2.333563799999979
   },
   "tasks":[
      {
         "id":1,
         "lat":48.8623348,
         "lng":2.3447356000000354,
         "duration":45 // Duration of the task, in minutes
      },
      {
        "id":2,
        "lat":48.879251,
        "lng":2.282264899999973,
        "duration": 60
      },
      {
        "id": 3,
        "lat": 48.7251521,
        "lng": 2.259899799999971,
        "duration": 30
      },
      {
        "id": 4,
        "lat": 48.83477,
        "lng": 2.370769999999993,
        "duration": 90
      }
   ]
}
```

**Output :**
```javascript
{
  "totalTime": 425, // Total time from leaving home to returning home

  // Array of tasks
  "schedule": [
    {
      "id": 1, // id of the task
      "startsAt": 1508756400, // UNIX timestamp of the starting time
      "endsAt": 1508756400, // UNIX timestamp of the ending time
      "lat":48.8623348,
      "lng":2.3447356000000354,
    },
    // .. etc ..
  ]
}
```
