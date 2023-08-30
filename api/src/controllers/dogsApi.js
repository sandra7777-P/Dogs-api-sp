const axios = require('axios')
const URL = "https://api.thedogapi.com/v1/breeds"
const URLIMAGE = "https://api.thedogapi.com/v1/images/"

// Función para obtener listado de perros de la api externa
const dogsImageApi = async (imageId) => {
    try {
        const imageService = await axios(`${URLIMAGE}${imageId}`);
        return imageService.data.url;
    } catch (error) {
        return null;
    }
};

const dogsApi = async () => {
    try {
        const service = await axios(URL);
        const result = await Promise.all(service.data.map(async (d) => {
            const image = await dogsImageApi(d.reference_image_id);
            return {
                id: d.id,
                image: image,
                name: d.name,
                height: d.height.metric,
                weight: d.weight.metric,
                life_span: d.life_span,
                created: false,
                temperament: d.temperament
            };
        }));
        return result;
    } catch (error) {
        return error;
    }
};

module.exports = dogsApi;
