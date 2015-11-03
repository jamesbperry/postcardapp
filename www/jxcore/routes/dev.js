var express = require('express');

function developerRoutes (manager) {
    var routes = express.Router();

    routes.route('/start').get(function(req, res) {
      console.log("---- START! ----");
      console.log(manager);
      manager.start(5000, 'thali');
      res.status(200).end();
    });

    routes.route('/stop').get(function(req, res) {
      console.log("---- STOP! ----");
      console.log(manager);
      manager.stop();
      res.status(200).end();
    });

    return routes;
}

module.exports = developerRoutes;