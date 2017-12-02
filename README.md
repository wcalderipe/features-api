# Features API

![travis build](https://travis-ci.org/wcalderipe/features-api.svg?branch=master)

Trello https://trello.com/b/lge9WAfk/features-toggle

Heroku https://features-api.herokuapp.com/

## Endpoints

| Path                       | HTTP Verb | Description                           |
| -------------------------- | --------- | ------------------------------------- |
| /health                    | GET       | Only returns status 200               |
| /toggles                   | GET       | Fetches application evaluated toggles |
| /applications              | GET       | Fetches all applications              |
| /applications/:id          | GET       | Fetches an application by ID          |
| /applications/:id/features | GET       | Fetches an application's features     |
| /applications              | POST      | Creates a new application             |
| /applications/:id          | PUT/PATCH | Updates an application                |
| /applications/:id          | DELETE    | Deletes an application                |
| /features/:id              | GET       | Fetches an feature by ID              |
| /features                  | POST      | Creates a new feature                 |
| /features/:id              | PUT/PATCH | Updates an feature                    |
| /features/:id              | DELETE    | Deletes an feature                    |
| /parameters                | GET       | Fetches all parameters                |
| /parameters/:id            | GET       | Fetches an parameter by ID            |
| /parameters                | POST      | Creates a new parameter               |
| /parameters/:id            | PUT/PATCH | Updates an parameter                  |
| /parameters/:id            | DELETE    | Deletes an parameter                  |

## Application document sample

```json
[
  {
    "name": "SampleApp",
    "features": [
      {
        "name": "newHeader",
        "parameters": [
          {
            "type": "list",
            "name": "tripType",
            "presentIn": ["roundtrip", "oneway"]
          }
        ]
      },
      {
        "name": "callNewAPI",
        "parameters": [
          {
            "type": "string",
            "name": "tripType",
            "given": "oneway"
          }
        ]
      },
      {
        "name": "appEnable",
        "parameters": [
          {
            "type": "always",
            "returns": true
          }
        ]
      }
    ]
  },
  {
    "name": "OtherApp",
    "features": [
      {
        "name": "appEnable",
        "parameters": [
          {
            "type": "always",
            "returns": false
          }
        ]
      }
    ]
  }
]
```
