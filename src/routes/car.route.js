const route = require('express').Router();
const carController = require('../controllers/car.controller');

route.post('/', carController.create);

module.exports = route;