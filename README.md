![Platform Node-RED](http://b.repl.ca/v1/Platform-Node--RED-red.png)
![Node-RED hydrawise](http://b.repl.ca/v1/Contribution-hydrawise-blue.png)
[![Repository GitHub](http://b.repl.ca/v1/Repository-GitHub-orange.png)](https://github.com/RonB/node-red-contrib-hydrawise)
[![NPM download](https://img.shields.io/npm/dm/node-red-contrib-hydrawise.svg)](http://www.npm-stats.com/~packages/node-red-contrib-hydrawise)
[![Quality Travis CI](http://b.repl.ca/v1/Quality-Travis_CI-green.png)](https://travis-ci.org/RonB/node-red-contrib-hydrawise)
[![Build Status](https://travis-ci.org/RonB/node-red-contrib-hydrawise.svg?branch=master)](https://travis-ci.org/RonB/node-red-contrib-hydrawise)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/RonB/node-red-contrib-hydrawise)

# node-red-contrib-hydrawise

Hydrawise Irrigation toolbox for Node-RED.

=========== FORK INFO ===========
Only local connections - not tested deeply :D
Im not a programmer, i am learning to code by modifying existing code by trial and error, so there is many probably "illegal" workarounds in this fork, but as there is no alternative here you are :D .

## Install

### Directly in Node-RED via palette manager

Start Node-RED

Select 'Manage palette' from menu top-right

Click on the Install tab

Search for hydrawise in the searchbar and find node-red-contrib-hydrawise

### Manual install

Run command on Node-RED installation directory.

    npm install node-red-contrib-hydrawise

or run command for global installation.

    npm install -g node-red-contrib-hydrawise

try these options on npm install to build, if you have problems to install

    --unsafe-perm --build-from-source

## Usage

After installation there will be a node 'hydrawise command' in your pallette. Drag a command node onto your flow and configure the hydrawise controller configuration node.

choose one of the following commands:

'run' to start watering the zone, also choose set the duration in seconds

'runAllZones' to start watering all zones

'stop' to stop watering

'stopAllZones' to stop watering any running zones

'suspend' to suspend the watering for the duration specified

'suspendAllZones' to stop watering any running zones for the duration specified

'info' to list the zones of the configured controller

You can also pass a message payload with the command, zone and duration properties.

![Simple Example](images/hydrawiseFlowExamples.png)

## Example dashboard

![Dashboard Example](images/hydrawise-example-dashboard.png)

```json
[
  {
    "id": "0baac006d74f782e",
    "type": "tab",
    "label": "My Garden Watering",
    "disabled": false,
    "info": "",
    "env": []
  },
  {
    "id": "68ed61e5cc7b5912",
    "type": "ui_template",
    "z": "0baac006d74f782e",
    "group": "37f775c5e76b552d",
    "name": "Zones",
    "order": 1,
    "width": "24",
    "height": "18",
    "format": "<div flex layout=\"row\" layout-wrap layout-margin>\n    <div class=\"md-whiteframe-2dp\" ng-repeat=\"zone in msg.payload\" flex=\"25\" layout-padding layout=\"column\">\n        <md-toolbar style=\"margin:0\" ng-class=\"{'md-warn': zone.isRunning}\">\n            <span class=\"md-headline\">{{zone.name}}</span>\n            <span class=\"md-subhead\">Zone {{zone.zone}}</span>       \n        </md-toolbar>\n        <div layout=\"row\" layout-align=\"center center\">\n            <img width=\"100px\" ng-show=\"{{zone.isRunning}}\" flex=\"30\"  ng-src=\"/icons/node-red-contrib-hydrawise/spray_on.gif\">\n            <img width=\"100px\" ng-show=\"{{!zone.isRunning}}\" flex=\"30\" ng-src=\"/icons/node-red-contrib-hydrawise/spray_off.gif\">\n        </div>\n        <h3>Next run</h3>\n        <p ng-bind=\"zone.nextRunAt | date:'EEEE dd MMMM yyyy hh:mm'\"></p>\n        <p>for {{ (zone.nextRunDuration / 60) | number: '1' }} minutes</p>\n        <div layout-align=\"center center\" layout=\"row\">\n            <md-button class=\"md-fab md-warn md-hue-3\" aria-label=\"Run {{zone.name}}}}\" ng-click=\"send({payload: {'command':'run', 'zone': zone.zone , 'duration': 1800}})\">\n                <md-icon md-font-icon=\"play_arrow\"></md-icon>\n            </md-button>\n            <md-button class=\"md-fab md-warn md-hue-3\" aria-label=\"Stop {{zone.name}}\" ng-click=\"send({payload: {'command':'stop', 'zone': zone.zone }})\">\n                <md-icon md-font-icon=\"stop\"></md-icon>\n            </md-button>\n            <md-button class=\"md-fab md-warn md-hue-3\" aria-label=\"Suspend {{zone.name}}\" ng-click=\"send({payload: {'command':'suspend', 'zone': zone.zone, 'duration': 1800}})\">\n                <md-icon md-font-icon=\"pause\"></md-icon>\n            </md-button>\n        </div>\n    </div>\n</div>",
    "storeOutMessages": false,
    "fwdInMessages": false,
    "resendOnRefresh": false,
    "templateScope": "local",
    "x": 410,
    "y": 120,
    "wires": [["2a141b03f19ef08a"]]
  },
  {
    "id": "07c87de7f8e69cf1",
    "type": "function",
    "z": "0baac006d74f782e",
    "name": "get zones",
    "func": "// remove circular controller reference from zones\nmsg.payload = msg.payload.controller.zones.map(({controller, ...rest})=> {\n    return rest;\n});\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "libs": [],
    "x": 280,
    "y": 120,
    "wires": [["68ed61e5cc7b5912"]]
  },
  {
    "id": "cf304ab23f354268",
    "type": "hydrawise-command",
    "z": "0baac006d74f782e",
    "name": "",
    "controller": "094632001153f89c",
    "zone": "",
    "command": "info",
    "duration": 1800,
    "x": 720,
    "y": 120,
    "wires": [["1bf8402052ba4345"]]
  },
  {
    "id": "1bf8402052ba4345",
    "type": "hydrawise-command",
    "z": "0baac006d74f782e",
    "name": "get info",
    "controller": "094632001153f89c",
    "zone": "1:  Gazon",
    "command": "info",
    "duration": 1800,
    "x": 120,
    "y": 120,
    "wires": [["07c87de7f8e69cf1"]]
  },
  {
    "id": "703eb3f17e792c0c",
    "type": "inject",
    "z": "0baac006d74f782e",
    "name": "",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": true,
    "onceDelay": "2",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 130,
    "y": 60,
    "wires": [["1bf8402052ba4345"]]
  },
  {
    "id": "2a141b03f19ef08a",
    "type": "switch",
    "z": "0baac006d74f782e",
    "name": "",
    "property": "payload.command",
    "propertyType": "msg",
    "rules": [
      {
        "t": "nnull"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 1,
    "x": 550,
    "y": 120,
    "wires": [["cf304ab23f354268"]]
  },
  {
    "id": "37f775c5e76b552d",
    "type": "ui_group",
    "name": "Zones",
    "tab": "d0e9aeb8e316740a",
    "order": 1,
    "disp": true,
    "width": "24",
    "collapse": false
  },
  {
    "id": "094632001153f89c",
    "type": "hydrawise-controller",
    "name": "brains",
    "host": "xxx-xxx-xxx-xxx",
    "password": "local-password"
  },
  {
    "id": "d0e9aeb8e316740a",
    "type": "ui_tab",
    "name": "Garden",
    "icon": "fa-tree",
    "order": 1,
    "disabled": false,
    "hidden": false
  }
]
```

## License

The MIT License

## Important

This is **not** an official product of the Hunter Company.
It is just to provide nodes to wrap the Hydrawise API to Node-RED.

### Contribution NodeJS hydrawise® Library

I'd like to give special thanks to [biancode][1] and [Martijn Dierckx][2].

[1]: https://github.com/sponsors/biancode
[2]: https://github.com/martijndierckx/
