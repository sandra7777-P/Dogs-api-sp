import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { allDogs } from '../../redux/actions.js';
import Cards from '../Cards/Cards'
import Nav from '../Nav/Nav';
import Paginator from '../Paginator/Paginator';



// Hace la petición al estado global 
export default function Home() {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.filteredData);

    //Escucha los cambios y los despacha
    useEffect(() => {
        dispatch(allDogs());
    }, [dispatch])

    return (
        <div>
            <Nav />
            <Cards dogs={dogs} />
            {dogs.length > 0 ? (
                <Paginator />
            ) : (<h1>Dogs not found</h1>)}
        </div>
    )
}