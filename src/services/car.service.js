import Car from '../models/Car.model.js';

const createService = (body) => Car.create(body);

export default {createService};
