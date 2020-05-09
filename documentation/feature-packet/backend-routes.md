# Backend Endpoints

## Skaters

- POST /skaters - sign up
- POST /skaters/token - login user

## Skate Spot

- GET /skatespot - get a list of all skate spots
- GET /skatespot/search - get a list of skate spots by city
- POST /skatespot - create a new skate spot

## Skate Clips

- GET /clips - get a feed of all skate clips // probably do not need
- GET /skatespot/:id/clips - get a feed of all skate clips of a spot
- POST /skatespot/:id/clips - post a new clip of a trick at the skate spot

## Bonus

- GET /skatespot/:id/review - review a skatespot
- POST /skatecrew - create a skatecrew
- GET /skatecrew/:id - get a clip feed of a skate crew
- DELETE /skatespot/:id/clips/:id - delete a skate clip
