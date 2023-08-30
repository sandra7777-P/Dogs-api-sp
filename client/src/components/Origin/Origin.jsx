import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByOrigin } from '../../redux/actions';

export default function Origin() {
    const dispatch = useDispatch();
    const clean = useSelector((state) => state.isClean);

    const [selectedOrigin, setSelectedOrigin] = useState('all');

    useEffect(() => {
        if (clean) {
            setSelectedOrigin('all');
        }
    }, [clean]);

    const handleOptionSelect = (e) => {
        const option = e.target.value;
        setSelectedOrigin(option); // Actualizar el estado con la opción seleccionada
        dispatch(filterByOrigin(option)); // Enviar la opción seleccionada a la acción
    };

    return (
        <div>
            Origin: <select
                value={selectedOrigin}
                onChange={handleOptionSelect}>
                <option value="all">All</option>
                <option value="api">Api</option>
                <option value="db">DB</option>
            </select>
        </div>
    )
}