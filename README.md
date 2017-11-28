# Features API

![travis build](https://travis-ci.org/wcalderipe/features-api.svg?branch=master)

Heroku https://features-api.herokuapp.com/

## Endpoints

| Path              | HTTP Verb | Description                           |
| ----------------- | --------- | ------------------------------------- |
| /health           | GET       | Only returns status 200               |
| /toggles          | GET       | Fetches application evaluated toggles |
| /applications     | GET       | Fetches all applications              |
| /applications/:id | GET       | Fetches an application by ID          |
| /applications     | POST      | Creates a new application             |
| /applications/:id | PUT/PATCH | Updates an application                |
| /applications/:id | DELETE    | Deletes an application                |
