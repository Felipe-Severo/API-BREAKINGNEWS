const Car = require('../models/Car.model');

const createService = (body) => Car.create(body);

module.exports = { createService };
