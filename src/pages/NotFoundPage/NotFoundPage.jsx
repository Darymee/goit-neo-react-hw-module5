import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>
          The link you followed doesn’t exist. Let’s get you back to the home
          page.
        </p>
        <Link to="/" className={styles.link}>
          Go to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
