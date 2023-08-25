import React from 'react'
//import dogImage from '../../img/australian.png'
import style from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className={style.landing}>
            <img src="https://img.freepik.com/free-photo/puppy-that-is-walking-snow_1340-37228.jpg" alt='Dog'></img>
            <div className={style.container}>
                <h1>Bienvenidos a la pagina de Perros Lindos</h1>

                <Link to={`/home`} className={style.link}>
                    <button>Ingresar</button>
                </Link>        
            </div>
        </div>
    )
}
