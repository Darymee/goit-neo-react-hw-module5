import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendyMovies } from '../../api/themoviedb-api';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        setIsError(false);
        const trendyMovies = await fetchTrendyMovies();
        setMovies(trendyMovies);
      } catch (error) {
        setIsError(true);
        setError(
          `Sorry, we have some problems with loading trendy movies. Error: ${error.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  let content = null;

  if (isError) {
    content = <ErrorMessage message={error} />;
  } else if (isLoading) {
    content = <Loader />;
  } else if (movies.length) {
    content = <MovieList movies={movies} />;
  } else {
    content = <p className={styles.empty}>No trending movies found.</p>;
  }

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>Trending today</h2>
      {content}
    </main>
  );
};

export default HomePage;
