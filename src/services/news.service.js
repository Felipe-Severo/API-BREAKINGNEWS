import News from "../models/News.model.js";

const createService = (body) => News.create(body);

const findAllService = () => News.find();

export { createService, findAllService };