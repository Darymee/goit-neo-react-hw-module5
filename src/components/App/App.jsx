import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import styles from './App.module.css';
import Navigation from '../Navigation/Navigation';
import { Loader } from '../Loader/Loader';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(
  () => import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage')
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReview/MovieReviews'));

const toastOptions = {
  duration: 3500,
  style: {
    background: 'rgba(18, 18, 22, 0.75)',
    color: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '12px 14px',
  },
  iconTheme: {
    primary: 'rgba(255, 255, 255, 0.85)',
    secondary: 'rgba(18, 18, 22, 0.75)',
  },
  success: {
    style: {
      border: '1px solid rgba(46, 204, 113, 0.28)',
    },
  },
  error: {
    style: {
      border: '1px solid rgba(231, 76, 60, 0.28)',
    },
  },
};

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navigation />
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Toaster position="top-right" toastOptions={toastOptions} />
      </Suspense>
    </>
  );
};

export default App;
