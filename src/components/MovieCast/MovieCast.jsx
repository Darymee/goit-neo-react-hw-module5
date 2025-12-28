import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import styles from './MovieCast.module.css';
import { getMovieCredits } from '../../api/themoviedb-api';
import { imgUrl } from '../../constants/imgUrl';
import placeholderImg from '../../assets/photo-placeholder.png';

const MovieCast = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCredits = async () => {
      try {
        setIsLoading(true);
        setError('');
        setIsError(false);

        const movieCredits = await getMovieCredits(movieId);
        setCredits(movieCredits);
      } catch (error) {
        setIsError(true);
        setError(
          `Sorry, we have some problems with loading cast information. Error: ${error.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    getCredits();
  }, [movieId]);

  if (isError) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) return <Loader />;

  if (!credits.length) {
    return <p className={styles.empty}>No cast information available.</p>;
  }

  return (
    <ul className={styles.castList}>
      {credits.map(({ id, name, character, profile_path }) => (
        <li key={id} className={styles.castItem}>
          <img
            src={profile_path ? imgUrl + profile_path : placeholderImg}
            alt={name}
            className={styles.castImage}
            loading="lazy"
          />
          <p className={styles.castText}>
            Name: <span>{name}</span>
          </p>
          <p className={styles.castText}>
            Character: <span>{character || '—'}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
