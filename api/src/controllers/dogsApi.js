const axios = require('axios')
const URL = "https://api.thedogapi.com/v1/breeds"
require ('dotenv').config();// adicionar para recuperar valores del archivo .env
const {API_KEY} = process.env; //recuperar los valores del archivo .env

// Función para obtener listado de perros de la api externa
const dogsApi = async () => {
    const options = {
        headers: { "x-api-key": API_KEY}, 
    }
    try {
        const service = await axios(URL, (options));
        const result = service.data.map((d) => ({
                id: d.id,
                image: d.image.url,
                name: d.name,
                height: d.height.metric,
                weight: d.weight.metric,
                life_span: d.life_span,
                created: false,
                temperament: d.temperament

        }))
        return result;
    } catch (error) {
        return {error};
    }
};

module.exports = dogsApi;