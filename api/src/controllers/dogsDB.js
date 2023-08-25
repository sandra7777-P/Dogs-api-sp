const { Temperament, Dog } = require('../db');

// Función que hace consulta la base de datos y obtiene sus valores
const dogsDB = async () => {
    try {
        const data = await Dog.findAll({
            include: {
                model: Temperament,
            },
        });

        const dogsData = data.map((dog) => {
            const temperaments = dog.temperaments.map((temperament) => temperament.name);
            dog.dataValues.temperament = temperaments.join(', ');
            delete dog.dataValues.temperaments;
            return dog;
        });
        return dogsData
    } catch (error){
        return { error }
    }
}

module.exports = dogsDB