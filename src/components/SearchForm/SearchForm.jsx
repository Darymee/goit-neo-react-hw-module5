import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import styles from './SearchForm.module.css';

const SearchForm = ({ value = '', onSubmit }) => {
  const [query, setQuery] = useState(value);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      toast('Please write something! 🥺');
      return;
    }

    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <button type="submit" className={styles.searchFormButton}>
        <FiSearch />
      </button>

      <input
        type="text"
        autoFocus
        autoComplete="off"
        name="search"
        onChange={handleChange}
        placeholder="Search movies"
        value={query}
        className={styles.searchFormInput}
      />
    </form>
  );
};

export default SearchForm;
