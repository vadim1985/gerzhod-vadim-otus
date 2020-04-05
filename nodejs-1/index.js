const VisualJSON = require('./VisualJSON.js')

const obj = {
  "name": 1,
  "items": [
    {
      "name": 2,
      "items": [{ "name": 3 }, { "name": 5 }, { "name": 6 }, { "name": 7 }]
    },
    {
      "name": 8,
      "items": [{ "name": 9 }, { "name": 10 }]
    },
    {
      "name": 11,
      "items": [{ "name": 12 }]
    },
    {
      "name": 13,
      "items": [{ "name": 14 }]
    }]
}

const visualJSON = new VisualJSON(obj)
visualJSON.show()