import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useParams,
  Link,
} from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { getMovieDetails } from '../../api/themoviedb-api';
import styles from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import posterNotFound from '../../assets/poster-not-found.jpg';

import { imgUrl } from '../../constants/imgUrl';

const getRatingClass = rating => {
  if (rating <= 3.5) return styles.low;
  if (rating < 7) return styles.mid;
  if (rating < 10) return styles.high;
  return styles.high;
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const previousLocationRef = useRef(location.state);

  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true);
        setError('');
        setIsError(false);

        const movieDetailsFromAPI = await getMovieDetails(movieId);
        setMovieDetails(movieDetailsFromAPI);
      } catch (error) {
        setIsError(true);
        setError(
          `Sorry, we have some problems with loading details. Error: ${error.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    getDetails();
  }, [movieId]);

  let content = null;

  if (isError) {
    content = <ErrorMessage message={error} />;
  } else if (isLoading) {
    content = <Loader />;
  } else {
    const {
      poster_path,
      title,
      original_title,
      vote_average,
      release_date,
      overview,
      genres = [],
      runtime,
      spoken_languages = [],
    } = movieDetails;

    content = (
      <>
        <div className={styles.movieDetails}>
          <div className={styles.posterContainer}>
            <img
              src={poster_path ? imgUrl + poster_path : posterNotFound}
              alt={title || original_title}
              className={styles.poster}
            />
          </div>

          <div>
            <h2 className={styles.title}>{original_title}</h2>
            <ul>
              <li className={styles.infoItem}>
                <p className={styles.infoValue}>
                  User Score{' '}
                  <span
                    className={`${styles.infoDescription} ${getRatingClass(vote_average)}`}
                  >
                    {Number(vote_average).toFixed(1)}
                  </span>
                </p>
              </li>
              <li className={styles.infoItem}>
                <p className={styles.infoValue}>
                  Release Date:{' '}
                  <span className={styles.infoDescription}>{release_date}</span>
                </p>
              </li>
              <li className={styles.infoItem}>
                <p className={styles.infoValue}>
                  Overview:{' '}
                  <span className={styles.infoDescription}>{overview}</span>
                </p>
              </li>
              <li className={styles.infoItem}>
                <p className={styles.infoValue}>Genres: </p>
                <ul>
                  {genres.map(({ name }) => (
                    <li key={name}>
                      <span className={styles.infoDescription}>{name}</span>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={styles.infoItem}>
                <p className={styles.infoValue}>
                  Film duration:{' '}
                  <span className={styles.infoDescription}>{runtime} min</span>
                </p>
              </li>
              <li className={styles.infoItem}>
                <p className={styles.infoValue}>Languages: </p>
                <ul>
                  {spoken_languages.map(({ name }) => (
                    <li key={name}>
                      <span className={styles.infoDescription}>{name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <h3 className={styles.infoTitle}>Additional information</h3>
            <ul className={styles.additionalInfoList}>
              <li className={styles.additionalInfoItem}>
                <NavLink
                  to="cast"
                  className={({ isActive }) =>
                    `${styles.additionalInfoLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Cast
                </NavLink>
              </li>

              <li className={styles.additionalInfoItem}>
                <NavLink
                  to="reviews"
                  className={({ isActive }) =>
                    `${styles.additionalInfoLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </>
    );
  }

  return (
    <main>
      <Link
        to={previousLocationRef.current ?? '/movies'}
        className={styles.goBackLink}
      >
        <FiArrowLeftCircle />
        Go Back
      </Link>
      {content}
    </main>
  );
};

export default MovieDetailsPage;
