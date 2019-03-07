<h1><i class="fas fa-asterisk" style="color:#ff1c3f"></i> Textile <small>documentation</small></h1>

# Platforms

## Golang

**[View go-textile docs](go-textile)**.

The reference implementation of Textile is in Go.

### Command-line

**[View CMD docs in go-textile](go-textile#cmd)**.

The command-line client is built with `go-textile`.

### Desktop

**[View Desktop tray docs in go-textile](go-textile#desktop)**.

The desktop tray app is built with `go-textile`.

## Mobile

### React Native

**[View react-native docs](react-native)**.

A mobile SDK that supports both Android and iOS apps built with React Native

### Java

_A native Java library. Expected release: Q2 2019._

### iOS

_A native Objective-c library to support both ObjC and Swift apps. Expected release: Q2 2019._

## Javascript

**[View HTTP-Client docs](js-http-client)**

The HTTP-Client run decentralized apps locally, using Textile APIs over a private localhost interface provided by the [Textile Desktop app](../install#desktop-app).

_A web-based `javascript-textile` library. Expected release: Q4 2019._

# API

_TODO - Define all common APIs_

## Schemas

### Built in: Media

Used for media posting and sharing

```
{
  "name": "media",
  "pin": true,
  "links": {
    "large": {
      "use": ":file",
      "mill": "/image/resize",
      "opts": {
        "width": "800",
        "quality": "80"
      }
    },
    "small": {
      "use": ":file",
      "mill": "/image/resize",
      "opts": {
        "width": "320",
        "quality": "80"
      }
    },
    "thumb": {
      "use": "large",
      "pin": true,
      "mill": "/image/resize",
      "opts": {
        "width": "100",
        "quality": "80"
      }
    }
  }
}
```

### Built in: Camera Roll

Used for backing up a user's mobile phone camera roll

```
{
  "name": "camera_roll",
  "pin": true,
  "links": {
    "raw": {
      "use": ":file",
      "mill": "/blob"
    },
    "exif": {
      "use": "raw",
      "mill": "/image/exif"
    },
    "thumb": {
      "use": "raw",
      "pin": true,
      "mill": "/image/resize",
      "opts": {
        "width": "320",
        "quality": "80"
      }
    }
  }
}
```

### Built-in: Avatars

Used for creating and storing a user's avatar image

```
{
  "name": "avatar",
  "pin": true,
  "links": {
    "large": {
      "use": ":file",
      "pin": true,
      "plaintext": true,
      "mill": "/image/resize",
      "opts": {
        "width": "320",
        "quality": "75"
      }
    },
    "small": {
      "use": ":file",
      "pin": true,
      "plaintext": true,
      "mill": "/image/resize",
      "opts": {
        "width": "100",
        "quality": "75"
      }
    }
  }
}
```

### Custom: JSON-based

It is also possible to create a new Schema that supports JSON data. This is pretty simple to setup, requiring only that we use the pre-existing `/json` Mill, and a few other minor keys for controlling pinning, encryption (we'll keep things in plaintext for now), and the `json_schema` definition. As always, Schemas start with a few basic keys:

```
{
    "pin": true,
    "plaintext": true,
    "mill": "/json",
    "json_schema": ...
}
```

Unlike in the above examples however, notice the (currently empty) `json_schema` entry. This is where/how we define the actual expected JSON structure for our Schema. It is based on the [JSON Schema vocabulary](https://json-schema.org/) for annotating and validating JSON documents. So, our Textile Schema will actually contain the JSON schema that we can use to validate the input JSON data before processing it via Mill(s). This is really nice, because it ensures that Textile's Thread data stays structured, making it easier for application developers to trust that the data added to a Thread conforms to their expected data model.

#### Examples

For example, a very simple 'person' Schema would look something like this:

```
{
  "pin": true,
  "mill": "/json",
  "json_schema": {
    "$id": "https://example.com/person.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "description": "The person's first name."
      },
      "lastName": {
        "type": "string",
        "description": "The person's last name."
      },
      "age": {
        "description": "Age in years which must be equal to or greater than zero.",
        "type": "integer",
        "minimum": 0
      }
    }
  }
}
```

A slightly more advanced example might be for adding basic log data as specified in the [BSD syslog Protocol](https://tools.ietf.org/html/rfc3164) to a Thead, the whole Textile Schema would look something like this:

```
{
  "pin": true,
  "plaintext": false,
  "mill": "/json",
  "json_schema": {
    "$ref": "#/definitions/Log",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
      "Log": {
        "additionalProperties": false,
        "properties": {
          "application": {
            "type": "string"
          },
          "hostname": {
            "type": "string"
          },
          "message": {
            "type": "string"
          },
          "pid": {
            "type": "integer"
          },
          "priority": {
            "type": "integer"
          },
          "timestamp": {
            "type": "string"
          }
        },
        "required": [
          "priority",
          "timestamp",
          "hostname",
          "application",
          "pid",
          "message"
        ],
        "type": "object"
      }
    }
  }
}
```

Alternatively, if a developer wanted to send document updates via a Thread, they'd need a JSON Schema that supports _modifying_ JSON documents. The JSON Patch specification, as outline in [RFC 6902](https://tools.ietf.org/html/rfc6902), is one such specification: "JSON Patch defines a JSON document structure for expressing a sequence of operations to apply to a JavaScript Object Notation (JSON) document..." You can obtain a JSON Schema representation of the JSON Patch spec [from the JSON schema 'store'](http://json.schemastore.org/json-patch). Combining the JSON Patch schema.org spec with a Textile Schema spec gives:

```
{
  "pin": true,
  "plaintext": true,
  "mill": "/json",
  "json_schema": {
    "title": "JSON schema for JSONPatch files",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "array",
    "items": {
      "$ref": "#/definitions/operation"
    },
    "definitions": {
      "operation": {
        "type": "object",
        "required": [
          "op",
          "path"
        ],
        "allOf": [
          {
            "$ref": "#/definitions/path"
          }
        ],
        "oneOf": [
          {
            "required": [
              "value"
            ],
            "properties": {
              "op": {
                "description": "The operation to perform.",
                "type": "string",
                "enum": [
                  "add",
                  "replace",
                  "test"
                ]
              },
              "value": {
                "description": "The value to add, replace or test."
              }
            }
          },
          {
            "properties": {
              "op": {
                "description": "The operation to perform.",
                "type": "string",
                "enum": [
                  "remove"
                ]
              }
            }
          },
          {
            "required": [
              "from"
            ],
            "properties": {
              "op": {
                "description": "The operation to perform.",
                "type": "string",
                "enum": [
                  "move",
                  "copy"
                ]
              },
              "from": {
                "description": "A JSON Pointer path pointing to the location to move/copy from.",
                "type": "string"
              }
            }
          }
        ]
      },
      "path": {
        "properties": {
          "path": {
            "description": "A JSON Pointer path.",
            "type": "string"
          }
        }
      }
    }
  }
}
```

You can imagine even more complex scenarios, including a [stream of forecasts from Dark Sky weather data](https://twitter.com/sanderpick/status/1068279840946585600):

```
{
  "pin": true,
  "mill": "/json",
  "json_schema": {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "$ref": "#/definitions/Forecast",
    "definitions": {
      "Alert": {
        "required": [
          "description",
          "expires",
          "time",
          "title",
          "uri"
        ],
        "properties": {
          "description": {
            "type": "string"
          },
          "expires": {
            "type": "integer"
          },
          "time": {
            "type": "integer"
          },
          "title": {
            "type": "string"
          },
          "uri": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      },
      "Flags": {
        "required": [
          "units"
        ],
        "properties": {
          "units": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      },
      "Forecast": {
        "required": [
          "currently",
          "code",
          "flags",
          "latitude",
          "longitude",
          "offset",
          "timezone"
        ],
        "properties": {
          "alerts": {
            "items": {
              "$schema": "http://json-schema.org/draft-04/schema#",
              "$ref": "#/definitions/Alert"
            },
            "type": "array"
          },
          "code": {
            "type": "integer"
          },
          "currently": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "$ref": "#/definitions/Weather"
          },
          "error": {
            "type": "string"
          },
          "flags": {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "$ref": "#/definitions/Flags"
          },
          "latitude": {
            "type": "number"
          },
          "longitude": {
            "type": "number"
          },
          "offset": {
            "type": "number"
          },
          "timezone": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "type": "object"
      },
      "Weather": {
        "required": [
          "apparentTemperature",
          "apparentTemperatureMax",
          "apparentTemperatureMaxTime",
          "apparentTemperatureMin",
          "apparentTemperatureMinTime",
          "cloudCover",
          "dewPoint",
          "humidity",
          "icon",
          "nearestStormDistance",
          "nearestStormBearing",
          "ozone",
          "precipIntensity",
          "precipIntensityMax",
          "precipIntensityMaxTime",
          "precipProbability",
          "precipType",
          "pressure",
          "summary",
          "sunriseTime",
          "sunsetTime",
          "temperature",
          "temperatureMax",
          "temperatureMaxTime",
          "temperatureMin",
          "temperatureMinTime",
          "time",
          "visibility",
          "windBearing",
          "windSpeed"
        ],
        "properties": {
          "apparentTemperature": {
            "type": "number"
          },
          "apparentTemperatureMax": {
            "type": "number"
          },
          "apparentTemperatureMaxTime": {
            "type": "integer"
          },
          "apparentTemperatureMin": {
            "type": "number"
          },
          "apparentTemperatureMinTime": {
            "type": "integer"
          },
          "cloudCover": {
            "type": "number"
          },
          "dewPoint": {
            "type": "number"
          },
          "humidity": {
            "type": "number"
          },
          "icon": {
            "type": "string"
          },
          "nearestStormBearing": {
            "type": "number"
          },
          "nearestStormDistance": {
            "type": "number"
          },
          "ozone": {
            "type": "number"
          },
          "precipIntensity": {
            "type": "number"
          },
          "precipIntensityMax": {
            "type": "number"
          },
          "precipIntensityMaxTime": {
            "type": "integer"
          },
          "precipProbability": {
            "type": "number"
          },
          "precipType": {
            "type": "string"
          },
          "pressure": {
            "type": "number"
          },
          "summary": {
            "type": "string"
          },
          "sunriseTime": {
            "type": "integer"
          },
          "sunsetTime": {
            "type": "integer"
          },
          "temperature": {
            "type": "number"
          },
          "temperatureMax": {
            "type": "number"
          },
          "temperatureMaxTime": {
            "type": "integer"
          },
          "temperatureMin": {
            "type": "number"
          },
          "temperatureMinTime": {
            "type": "integer"
          },
          "time": {
            "type": "integer"
          },
          "visibility": {
            "type": "number"
          },
          "windBearing": {
            "type": "number"
          },
          "windSpeed": {
            "type": "number"
          }
        },
        "additionalProperties": false,
        "type": "object"
      }
    }
  }
}
```
