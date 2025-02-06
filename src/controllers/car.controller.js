import carService from '../services/car.service.js';

const create = async (req, res) => {
    try {const { brand, model, year, color } = req.body;

    if (!brand || !model || !year || !color) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const car = await carService.createService(req.body);

    if (!car) { 
        return res.status(400).send({ error: "Erro ao criar carro" });
    }

    res.status(201).send({
        message: "Carro criado com sucesso",
        car: {
            id: car._id,
            brand,
            model,
            year,
            color,
            date: car.date
        },
    });

    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

const findAll = async (req, res) => {
    try {
        const cars = await carService.findAllService();

        if (!cars) {
            return res.status(400).send({ error: "Erro ao buscar carros" });
        };

        res.status(200).send({
            message: "Carros encontrados com sucesso",
            cars
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

const findById = async (req, res) => {
    try {
        const car = req.car;

        res.status(200).send({
            message: "Carro encontrado com sucesso",
            car
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    };
}

const update = async (req, res) => {
    try {
        const { brand, model, year, color } = req.body;

        if (!brand && !model && !year && !color) {
            return res.status(400).json({ error: "Preencha algum dos campos de carro" });
        };

        const { id, car } = req;

        await carService.updateService(id, brand, model, year, color);

        res.status(200).send({
            message: "Carro atualizado com sucesso",
            car
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    };
};

export default {create, findAll, findById, update};