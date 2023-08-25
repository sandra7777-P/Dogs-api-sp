import axios from "axios";
import { GET_DOGS, 
    SET_PAGE, 
    SET_TOTAL_PAGE, 
    SEARCH_DOGS, 
    SET_LOADING, 
    GET_TEMPERAMENTS, 
    CREATE_DOG, 
    FILTER_BY_TEMPERAMENT, 
    FILTER_BY_ORIGIN, 
    SORT_ORDER, 
    UPDATE_ORDER, 
    CLEAN_FILTER, 
    SET_CLEAN } from "./actionType";

const URL = "https://api.thedogapi.com/v1/breeds"

// Acción para consultar todos los perros
export function allDogs() {
    return async function (dispatch) {
        try {
            const service = await axios(URL);
            const allDogsData = service.data;

            console.log(allDogsData); // Verifica los datos obtenidos

            dispatch({
                type: GET_DOGS,
                payload: allDogsData
            });

            dispatch(setTotalPage());
        } catch (error) {
            alert('Error Fetching dogs:', error);;
        }
    };
}

// Acción para traer definir el total de páginas
export function setTotalPage() {
    return {
        type: SET_TOTAL_PAGE
    };
}

// Acción para traer definir página actual
export const setPage = (pageNumber) => ({
    type: SET_PAGE,
    payload: pageNumber,
});

// Acción para buscar por nombre
export function onSearch(name) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))

            const service = await axios(URL + `?name=${name}`)
            const allDogsData = service.data

            dispatch({
                type: SEARCH_DOGS,
                payload: allDogsData
            })

            dispatch(setTotalPage())
        } catch (error) {
            if (error.response.status === 404) {
                return alert('No dog breeds found with that name')
            }
        } finally {
            dispatch(setLoading(false))
        }
    }
}

// Acción para actualizar estado de carga
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

// Acción para consultar temperamentos
export function allTemperaments() {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))

            const serviceTemp = await axios("http://localhost:3001/temperaments")
            const allTempData = serviceTemp.data

            dispatch({
                type: GET_TEMPERAMENTS,
                payload: allTempData
            })

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setLoading(false))
        }
    }
}

// Acción para crear nuevo perro
export function createNewDog(payload) {
    return async function (dispatch) {
        try {
            const service = await axios.post(URL, payload)

            dispatch({
                type: CREATE_DOG,
                payload,
            });

            if (service.status === 201) {
                return alert('Succesfully created')
            }
        } catch (error) {
            if (error.response.status === 400) {
                return alert('Dog breeds name already exists')
            }
            if (error.response.status === 404) {
                return alert('Internal server error')
            }
        }
    }
}

// Acción para filtrar por origen
export function filterByOrigin(option) {
    return (dispatch) => {
        dispatch({
            type: FILTER_BY_ORIGIN,
            payload: option,
        });

        dispatch(setTotalPage())
    }
};

// Acción para filtrar por temperamento
export function filterByTemperament(option) {
    return (dispatch) => {
        dispatch({
            type: FILTER_BY_TEMPERAMENT,
            payload: option
        });

        dispatch(setTotalPage())
    }
}

// Acción para definir ordenamiento
export const toggleSortOrder = () => ({
    type: SORT_ORDER,
})

// Acción para actualizar ordenamiento
export const updateSortedList = (sortedList) => ({
    type: UPDATE_ORDER,
    payload: sortedList,
})

// Acción para actualizar estado de limpieza
export function setClean(isClean) {
    return {
        type: SET_CLEAN,
        payload: isClean
    }
}

// Acción para limpiar filtros
export function cleanFilter() {
    return async function (dispatch) {
        try {            
            dispatch(setClean(true));

            dispatch({
                type: CLEAN_FILTER,
            });

            dispatch(setTotalPage());

            await new Promise(resolve => setTimeout(resolve, 1000))

            dispatch(setClean(false));
        } catch (error) {
            console.log(error)
        }
    }
}