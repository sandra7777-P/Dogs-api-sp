const { Temperament } = require('../db');
const axios = require("axios");

const URL = 'https://api.thedogapi.com/v1/breeds';

// Función para setear temperamentos en la base de datos
const getTemperaments = async (req, res) => {
    try {
        const response = await axios.get(URL); // Realizar una solicitud GET a la URL
        const dogsFromApi = response.data
            .filter((dog) => dog.temperament) // Filtrar los perros que tienen un temperamento definido
            .map((dog) => dog.temperament) // Obtener los temperamentos de los perros
            .join(',') // Convertir los temperamentos en una cadena separada por comas
            .split(',') // Dividir la cadena en una lista de temperamentos
            .map((t) => t.trim()) // Eliminar espacios en blanco
            .filter((t) => t.length > 1); // Filtrar temperamentos con longitud mayor a uno

        const uniqueTemperaments = [...new Set(dogsFromApi)]; // Eliminar duplicados

        for (const t of uniqueTemperaments) {
            await Temperament.findOrCreate({
                where: { name: t }
            });
        }

        const totalTemp = await Temperament.findAll();
        const sortTemp = totalTemp.sort((a, b) => a.name.localeCompare(b.name));

        res.status(200).json(uniqueTemperaments);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getTemperaments;
