import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './MovieList.module.css';
import posterNotFound from '../../assets/poster-not-found.jpg';
import { imgUrl } from '../../constants/imgUrl';

const getRatingClass = rating => {
  if (rating <= 3.5) return styles.low;
  if (rating < 7) return styles.mid;
  if (rating < 10) return styles.high;
  return styles.high;
};

const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies?.length) {
    return <p className={styles.empty}>Nothing to show yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {movies.map(({ id, poster_path, title, release_date, vote_average }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} state={location} className={styles.card}>
            <img
              src={poster_path ? imgUrl + poster_path : posterNotFound}
              alt={title}
              className={styles.poster}
              loading="lazy"
            />
            <div className={styles.info}>
              <p className={styles.title} title={title}>
                {title}
              </p>
              <div className={styles.metaRow}>
                <p className={styles.releaseDate}>{release_date || '—'}</p>
                <p
                  className={`${styles.rating} ${getRatingClass(vote_average)}`}
                >
                  {Number(vote_average || 0).toFixed(1)}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
