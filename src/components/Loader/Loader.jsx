import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <ClipLoader size={80} width={50} height={50} color="#7c5cff" />
    </div>
  );
};
