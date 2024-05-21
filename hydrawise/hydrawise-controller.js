/*
 The MIT License

 Copyright (c) 2021 Ronald Brinkerink
 All rights reserved.
 node-red-contrib-hydrawise
 */
'use strict'
const Hydrawise = require('hydrawise-api').Hydrawise

module.exports = function (RED) {
  function hydrawiseController(config) {
    RED.nodes.createNode(this, config)

    // getDetails function
    this.getDetails = function () {
      const promise = new Promise((resolve, reject) => {
        this.controller
          .getZones()
          .then((zones) => {
            this.controller.zones = zones
            this.status = {
              status: 'ready',
              //text: 'Zones on' + this.controller.name + ' available.'
              text: 'Succesfully got zones info'
            }
            this.emit('hydrawise_status', this.status)
            resolve(this.controller)
          })
          .catch((err) => {
            this.controller.zones = []
            console.log('hydrawise-controller: Error durring getting controller info (check settings).');
            this.status = {
              status: 'error',
              text:
                'Could not get zones info (check config)'
            }
            this.emit('hydrawise_status', this.status)

            //UNCOMMENTING THIS = NODE RED CRASHING WHEN CONNECTIONS SETTINGS ARE WRONG (WORKAROUND)
/*             reject(
              new Error(
                'Controller available but zones not available. ' + err.stack
              )
            ) */
          })
      })
      return promise
    }

    // the status of the hydrawise api will be emitted to all command nodes
    this.status = {
      status: 'init',
      text: 'Initializing'
    }

    // initial status
    this.emit('hydrawise_status', this.status)

    // instantiate the controller
    // instantiate hydrawise api
    this.hydrawise = new Hydrawise({
      type: 'LOCAL', // local controllers only
      host: config.host,
      password: config.password
    })

    // get the customer details
    this.hydrawise
      .getControllers()
      .then((controllers) => {
        // for now only the first controller will be supported
        this.controller = controllers[0]
        this.status = {
          status: 'ready',
          text: 'Controller ' + this.controller.name + ' available.'
        }
        this.emit('hydrawise_status', this.status)

        // test if we can get zones
        this.getDetails()

        // now get the customer details
        this.hydrawise
          .getCustomerDetails()
          .then((details) => {
            this.name = details.current_controller
            this.details = details
            this.status = {
              status: 'ready',
              text: 'Customer details available.'
            }
            this.emit('hydrawise_status', this.status)
          })
          .catch((err) => {
            this.status = {
              status: this.status,
              text: 'Could not get customer details. ' + err.stack
            }
            this.emit('hydrawise_status', this.status)
          })
      })
      .catch((err) => {
        this.status = {
          status: 'error',
          text: 'Controller not available. Wrong settings? ' + err.stack
        }
        this.emit('hydrawise_status', this.status)
      })
  }

  // endpoints for Nodered configration editor
  RED.httpAdmin.get(
    '/getControllers',
    RED.auth.needsPermission('serial.read'),
    function (req, res) {
      // instantiate hydrawise api
      const hydrawise = new Hydrawise(req.query)
      // get controllers for this hydrawise connection
      hydrawise
        .getControllers()
        .then((controllers) => {
          controllers[0].getZones()
          .then(zones => res.json(zones))
          .catch((err) => {
            res.json({
              error: 'Controller not ready. Check your settings. ' + err.message
            })
          });
          //res.json(controllers);
        })
        .catch((err) => {
          res.json({
            error: 'Controller not ready. Check your settings. ' + err.message
          })
        })
    }
  )

  RED.httpAdmin.get(
    '/getZones',
    RED.auth.needsPermission('serial.read'),
    function (req, res) {
      const node = RED.nodes.getNode(req.query.controllerNode)
      if (node.controller.zones) {
        res.json(
          node.controller.zones.map((zone) => {
            return { zone: zone.zone, name: zone.name }
          })
        )
      } else {
        res.json({
          error: 'Zones not ready.'
        })
      }
    }
  )

  RED.nodes.registerType('hydrawise-controller', hydrawiseController)
}
