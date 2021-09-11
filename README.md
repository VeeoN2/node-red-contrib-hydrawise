![Platform Node-RED](http://b.repl.ca/v1/Platform-Node--RED-red.png)
![Node-RED hydrawise](http://b.repl.ca/v1/Contribution-hydrawise-blue.png)
[![Repository GitHub](http://b.repl.ca/v1/Repository-GitHub-orange.png)](https://github.com/RonB/node-red-contrib-hydrawise)
[![NPM download](https://img.shields.io/npm/dm/node-red-contrib-hydrawise.svg)](http://www.npm-stats.com/~packages/node-red-contrib-hydrawise)
[![Quality Travis CI](http://b.repl.ca/v1/Quality-Travis_CI-green.png)](https://travis-ci.org/RonB/node-red-contrib-hydrawise)
[![Build Status](https://travis-ci.org/RonB/node-red-contrib-hydrawise.svg?branch=master)](https://travis-ci.org/RonB/node-red-contrib-hydrawise)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/RonB/node-red-contrib-hydrawise)

# node-red-contrib-hydrawise

WARNING - IN DEVELOPMENT - NOT READY FOR PRODUCTION

Hydrawise Irrigation toolbox for Node-RED.

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
    
![Flow Example](images/hydrawiseFlowExamples.png)

## Usage

After installation there will be a node 'hydrawise command' in your pallette. Drag a command node onto your flow and configure the hydrawise controller configuration node.

choose one of the 4 commands:

'run' to start watering the zone, also choose set the duration
'stop' to stop watering
'suspend' to suspend the watering
'info' to list the zones of the configured controller 

## License

The MIT License

## Important

This is **not** an official product of the Hunter Company.
It is just to provide nodes to wrap the Hydrawise API to Node-RED.. 

### Contribution NodeJS hydrawise® Library

I'd like to give special thanks to [biancode][1] and [Martijn Dierckx][2]. 


[1]:https://github.com/sponsors/biancode
[2]:https://github.com/martijndierckx/