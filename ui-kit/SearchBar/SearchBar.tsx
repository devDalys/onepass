import React from 'react';
import styles from './SearchBar.module.scss';
import Search from '@/assets/images/Search.svg';
import Cancel from '@/assets/images/Cancel.svg';
import classNames from 'classnames';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClearIconClick: () => void;
}

export const SearchBar = ({onClearIconClick, ...props}: SearchBarProps) => {
  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <Search className={styles.searchIcon} />
      <input {...props} className={styles.input} />
      <span
        onClick={onClearIconClick}
        className={classNames(styles.clearIcon, {[styles.hideClearIcon]: !props.value})}
      >
        <Cancel />
      </span>
    </form>
  );
};
