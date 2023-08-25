import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from './CardDetail.module.css'

export default function CardDetail() {
    const { id } = useParams();
    const [dog, setDog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(dog)

    useEffect(() => {
        const getDog = async (id) => {
            try {
                const response = await axios.get(`http://localhost:3001/dogs/${id}`);
                const data = response.data
                if (data) {
                    setDog(data);
                } else {
                    setError('Internal server error');
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching Dog:', error);
                setError('Internal server error');
                setIsLoading(false);
            }
        };
        getDog(id);
    }, [id]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.detail}>
            <div className={styles.titleDetail}>
                <h1 className={styles.title}>Breed detail</h1>
                <Link to={`/home`}>
                    <button className={styles.back}>✖</button>
                </Link>
            </div>
            <div className={styles.detailContent}>
                <div className={styles.imageDetail}>
                    
                    <img src={dog.image} alt={dog.name} className={styles.imageDog} />
                </div>
                <div className={styles.box}>
                    <h1 className={styles.titleDog}>{dog.name}</h1>
                    <h3>ID: {dog.id}</h3>
                    <h3>Height: {dog.height} cm</h3>
                    <h3>Weight: {dog.weight} kg</h3>
                    <h3>Temperaments: {dog.temperament}</h3>
                    <h3>Life span: {dog.life_span}</h3>
                </div>
            </div>
        </div>
    );
};
