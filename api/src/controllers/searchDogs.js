const dogsApi = require("./dogsApi");
const dogsDB = require("./dogsDB");

// Función para combinar o unir datos de la api externa y de la base de datos
const getAllDogs = async () => {
    try {
        // Código para obtener datos desde Api
        const dogsFromApi = await dogsApi();

        // Código para obtener datos desde DB
        const dogsFromDB = await dogsDB();

        // Combinar los resultados de Api y DB
        const allDogs = [...dogsFromApi, ...dogsFromDB];

        // Ordenar alfabéticamente
        allDogs.sort((a, b) => a.name.localeCompare(b.name));

        return allDogs
    } catch (error) {
        return { error }
    }
}

// Función que filtra y retorna los perros
const getDogs = async (req, res) => {
    try {
        const allDogs = await getAllDogs(); // Invocar la función que combina api y DB
        const useQuery = Object.keys(req.query).length > 0; // Reviso si viene una query en el request

        if (!useQuery) {
            return res.status(200).json(allDogs); // Si no viene una query devuelvo todos los perros
        } else {
            const name = req.query.name // Reviso si la query especifica es exactamente "name"       
            if (!name) {
                return res.status(400).json({ error: 'Params is not valid' });
            }

            const search = allDogs.filter((dog) => // Filtro todos los perros
                dog.name.toLowerCase().includes(name.toLowerCase()) // Convertir a minuscula y reviso si incluye ese nombre
            );

            if (search.length === 0) { // Reviso la longitud de la busqueda
                return res.status(404).json({ message: 'No dog breeds found with that name' });
            }
            res.status(200).json(search);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllDogs, getDogs };