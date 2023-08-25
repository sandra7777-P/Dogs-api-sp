import React from 'react';
import Card from '../Card/Card';
import style from '../Cards/Cards.module.css';
import { useSelector } from 'react-redux';

function Cards({ currentPage, dogsPerPage }) {
    const dogs = useSelector(state => state.allDogs);

     // Asegurarse de que dogs sea un array antes de usar slice
     const dogsArray = Array.isArray(dogs) ? dogs : [];

    // Se calculan los índices de inicio y final para determinar qué perros deben mostrarse en la página
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogsArray.slice(startIndex, endIndex);

    return (
        <div className={style.cards}>
            {dogsToShow.length > 0 ? (
                dogsToShow.map((dog) => (
                    <Card key={dog.id} dog={dog} />
                ))
            ) : (
                <p>No dogs to display.</p>
            )}
        </div>
    );
}

export default Cards;
