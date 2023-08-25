const axios = require('axios')
const URL = "https://api.thedogapi.com/v1/breeds"

// Función para obtener listado de perros de la api externa
const dogsApi = async () => {
    try {
        const service = await axios(URL);
        const result = service.data.map((d) => ({
            id: d.id,
            image: d.image.url,
            name: d.name,
            height: d.height.metric,
            weight: d.weight.metric,
            life_span: d.life_span,
            created: false,
            temperament: d.temperament
        }));
        return result
    } catch (error) {
        return { error }
    }
}


module.exports = dogsApi;