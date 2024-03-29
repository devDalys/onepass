'use client';
import styles from './Input.module.scss';
import {useId, useState} from 'react';
import classNames from 'classnames';
import Copy from '@/assets/images/Copy.svg';
import EyeOpen from '@/assets/images/eye_open.svg';
import EyeClose from '@/assets/images/eye_close.svg';
import {useSnackbar} from '@/providers/SnackbarProvider';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  aliasText: string;
  errorText?: string;
  className?: string;
  blocked?: boolean;
}

export const Input: React.FC<Props> = ({
  aliasText,
  className,
  blocked,
  errorText,
  ...inputProps
}) => {
  const id = useId();
  const [isViewPassword, setViewPassword] = useState(inputProps.type !== 'password');
  const {showSnackbar} = useSnackbar();
  const onCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showSnackbar('Пароль скопирован');
  };

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label htmlFor={id} className={styles.label}>
        {aliasText}
      </label>
      <div className={classNames(styles.inputWrapper, {[styles.blocked]: blocked})}>
        <input
          {...inputProps}
          disabled={inputProps.disabled || blocked}
          type={isViewPassword ? 'text' : inputProps.type}
          id={id}
          className={styles.input}
        />
        {inputProps.readOnly && inputProps.type === 'password' && (
          <div className={styles.passwordActions}>
            {isViewPassword ? (
              <EyeOpen onClick={() => setViewPassword((state) => !state)} className={styles.icon} />
            ) : (
              <EyeClose
                onClick={() => setViewPassword((state) => !state)}
                className={styles.icon}
              />
            )}
            <Copy
              className={styles.icon}
              onClick={() => {
                onCopy(inputProps.value as string);
              }}
            />
          </div>
        )}
      </div>
      {!!errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  );
};
