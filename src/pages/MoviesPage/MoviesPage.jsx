import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import { Loader } from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchMoviesByName } from '../../api/themoviedb-api';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = (searchParams.get('query') ?? '').trim();

  const getQuery = newQuery => {
    const normalized = newQuery.trim();

    if (normalized === queryParam) {
      toast('You already see results for this query 🥳');
      return;
    }

    setSearchParams(normalized ? { query: normalized } : {});
  };

  useEffect(() => {
    if (!queryParam) {
      setMovies([]);
      return;
    }

    let isActive = true;

    const getMoviesName = async () => {
      try {
        setIsLoading(true);
        setError('');
        setIsError(false);

        const moviesByName = await fetchMoviesByName(queryParam);
        if (isActive) setMovies(moviesByName);
      } catch (error) {
        if (isActive) {
          setIsError(true);
          setError(
            `Sorry, we have some problems with loading movies. Error: ${error.message}`
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    getMoviesName();

    return () => {
      isActive = false;
    };
  }, [queryParam]);

  let content = null;

  if (isError) content = <ErrorMessage message={error} />;
  else if (isLoading) content = <Loader />;
  else if (movies.length) content = <MovieList movies={movies} />;
  else if (queryParam) {
    content = <p className={styles.empty}>No matches for “{queryParam}”.</p>;
  } else {
    content = (
      <p className={styles.empty}>
        Search for a movie by title, e.g. “Inception”.
      </p>
    );
  }

  return (
    <main className={styles.section}>
      <SearchForm value={queryParam} onSubmit={getQuery} />
      {content}
    </main>
  );
};

export default MoviesPage;
