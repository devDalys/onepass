'use client';
import {v4} from 'uuid';
import styles from './Input.module.scss';
import {useEffect, useState} from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  aliasText: string;
  errorText?: string;
}

export const Input: React.FC<Props> = ({aliasText, errorText, ...inputProps}) => {
  const [id, setId] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setId(v4());
    }
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {aliasText}
      </label>
      <input {...inputProps} id={id} className={styles.input} />
      {!!errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  );
};
