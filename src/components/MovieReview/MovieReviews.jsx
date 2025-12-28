import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api/themoviedb-api';
import styles from './MovieReviews.module.css';
import { Loader } from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setError('');
        setIsError(false);

        const movieReviews = await getMovieReviews(movieId);
        setMovieReviews(movieReviews);
      } catch (error) {
        setIsError(true);
        setError(
          `Sorry, we have some problems with loading reviews. Error: ${error.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (isError) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) return <Loader />;

  if (!movieReviews.length) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {movieReviews.map(({ id, author, created_at, content }) => (
        <li key={id ?? `${author}-${created_at}`} className={styles.reviewItem}>
          <div className={styles.header}>
            <p className={styles.author}>{author}</p>
            <p className={styles.date}>
              {new Date(created_at).toLocaleString()}
            </p>
          </div>
          <p className={styles.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
