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

export default {create};