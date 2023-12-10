import React from 'react';
import styles from './SearchBar.module.scss';
import Search from '@/assets/images/Search.svg';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchBar = (props: SearchBarProps) => {
  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <Search className={styles.searchIcon} />
      <input {...props} className={styles.input} />
    </form>
  );
};
