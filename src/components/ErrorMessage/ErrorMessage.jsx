import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.error}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
