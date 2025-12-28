import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const getNavLinkClass = ({ isActive }) =>
  `${styles.link} ${isActive ? styles.active : ''}`;

const Navigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.brand} aria-label="Movie Finder">
          <span className={styles.brandMark}>🎬</span>
          <span className={styles.brandText}>Movie Finder</span>
        </div>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getNavLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
