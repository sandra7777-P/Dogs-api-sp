import { GET_DOGS, 
    GET_TEMPERAMENTS, 
    SEARCH_DOGS, 
    SET_LOADING, 
    SET_PAGE, 
    SET_TOTAL_PAGE, 
    FILTER_BY_ORIGIN, 
    FILTER_BY_TEMPERAMENT, 
    SORT_ORDER, 
    UPDATE_ORDER, 
    CLEAN_FILTER, 
    SET_CLEAN } from "./actionType";

const initialState = {
    allDogs: [],
    allTemperaments: [],
    filteredData: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    isClean: false,
    sortOrder: "asc"
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DOGS: //Reducer para actualizar todos los perros
            return {
                ...state,
                allDogs: payload,
                filteredData: payload,
                sortOrder: "asc"
            };
        case SET_TOTAL_PAGE: //Reducer para actualizar total de páginas
            return {
                ...state,
                totalPages: Math.ceil(state.filteredData.length / 8)
            };
        case SET_PAGE: //Reducer para actualizar página actual
            return {
                ...state,
                currentPage: payload
            };
        case SEARCH_DOGS: //Reducer para actualizar resultados de la busqueda
            return {
                ...state,
                filteredData: payload
            };
        case SET_LOADING: //Reducer para actualizar estado de carga
            return {
                ...state,
                isLoading: payload
            };
        case GET_TEMPERAMENTS: //Reducer para actualizar todos los temperamentos
            return {
                ...state,
                allTemperaments: payload
            };
        case FILTER_BY_ORIGIN: { //Reducer para filtrar por origen
            const filterOrigin = payload;
            let filteredDogsData;

            if (filterOrigin === 'all') {
                return {
                    ...state,
                    currentPage: 1,
                    filteredData: state.allDogs,
                };
            }
            if (filterOrigin === 'api') {
                filteredDogsData = state.allDogs.filter((dog) => !dog.created);
            } else if (filterOrigin === 'db') {
                filteredDogsData = state.allDogs.filter((dog) => dog.created);
            } else {
                filteredDogsData = [];
            }

            return {
                ...state,
                currentPage: 1,
                filteredData: filteredDogsData,
                sortOrder: "asc"
            };
        };
        case FILTER_BY_TEMPERAMENT: { //Reducer para filtrar por temperamento
            const filterTemperament = payload;
            let filteredDogsData;

            if (filterTemperament === 'all') {
                return {
                    ...state,
                    currentPage: 1,
                    filteredData: state.allDogs,
                };
            }

            filteredDogsData = state.allDogs.filter((dog) =>
                dog.temperament && dog.temperament.includes(filterTemperament)
            );

            return {
                ...state,
                currentPage: 1,
                filteredData: filteredDogsData,
                sortOrder: "asc"
            };
        };
        case SORT_ORDER: { //Reducer para definir orden
            const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
            const sortedList = [...state.filteredData];
            sortedList.sort((a, b) => {
                if (newSortOrder === "asc") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });

            return {
                ...state,
                sortOrder: newSortOrder,
                filteredData: sortedList,
            };
        };
        case UPDATE_ORDER: //Reducer para actualizar orden
            return {
                ...state,
                sortedList: payload,
            };
        case SET_CLEAN: //Reducer para actualizar estado de limpieza
            return {
                ...state,
                isClean: payload
            };
        case CLEAN_FILTER: //Reducer para limpiar filtros
            return {
                ...state,
                filteredData: state.allDogs,
                sortOrder: "asc",
            };
        default:
            return state;
    }
}