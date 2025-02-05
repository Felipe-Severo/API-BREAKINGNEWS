const Car = require('../models/Car');

const createService = (body) => Car.create(body);

module.exports = { createService };
