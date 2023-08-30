import React from 'react'
import style from '../Card/Card.module.css'
import { Link } from 'react-router-dom'

    const Card = ({ dog }) => {
    const { id, image, name, temperament, weight } = dog;
    
    return (
        <div className={style.card}>
            <Link to={`/detail/${id}`} className={style.link}>
                <img src={image} alt='A dog' />            
                <h1>{name}</h1>
                <p>{temperament}</p>
                <p>{weight} kg</p>
            </Link>
        </div>
    )
}
export default Card;