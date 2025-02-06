import Car from '../models/Car.model.js';

const createService = (body) => Car.create(body);
const findAllService = () => Car.find();
const findByIdService = (id) => Car.findById(id);

export default {createService, findAllService, findByIdService};
