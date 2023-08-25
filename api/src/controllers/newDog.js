const { getAllDogs } = require('./searchDogs')
const { Temperament, Dog } = require('../db');

// Función para crear perros en la base de datos
const createDog = async (req, res) => {
    try {
        const { image, name, height, weight, life_span, temperaments } = req.body 
        // Validación de los campos requeridos en el body
        if (!image ||
            !name ||
            !height ||
            !weight ||
            !life_span ||
            !temperaments) 
            return res.status(404).json({ error: "Incomplete data" });

        const dogs = await getAllDogs(); // Invoco la función que consulta todos los perros
        const dogExist = dogs.find(d => d.name === name); // Comparo si ya existe la raza

        if (dogExist)
            return res.status(400).json({ error: "Dog breeds name already exists" });

        const tempExist = await Promise.all(
            temperaments.map((temperamentId) =>
                Temperament.findByPk(temperamentId)));

        // Valida que el temperamento exista
        if (tempExist.some((t) => !t))
            return res.status(404).json({ error: "Temperament does not exist" });
        
        // Crea el perro en la base de datos
        const newDog = await Dog.create(
            {
                image,
                name,
                height,
                weight,
                life_span
            }
        );

        // Asocia el temperamento al perro creado
        await newDog.setTemperaments(tempExist)
        return res.status(201).json(newDog)
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = createDog