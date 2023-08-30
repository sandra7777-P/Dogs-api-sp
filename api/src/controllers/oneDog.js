const { getAllDogs } = require('./searchDogs')

// Función para buscar por id
const getOneDog = async (req, res) => {
    try {
        const { id } = req.params;
        const dogs = await getAllDogs(); // Invoco la función que consulta todos los perros

        const dog = await dogs.find(d => d.id === id || d.id === Number(id));

        if (dog) {
            return res.status(200).json(dog);
        } else {
            return res.status(404).json({ error:"Dog not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getOneDog