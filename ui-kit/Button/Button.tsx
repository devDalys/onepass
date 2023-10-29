import styles from './Button.module.scss';
import classNames from 'classnames';

export const BUTTON_THEME = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
} as const;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: (typeof BUTTON_THEME)[keyof typeof BUTTON_THEME];
  className?: string;
  isLoading?: boolean;
}

export const Button = (props: Props) => {
  const {theme, className = '', isLoading, ...buttonProps} = props;

  return (
    <button
      className={classNames(styles.button, styles[theme], {[styles.loading]: isLoading}, className)}
      {...buttonProps}
    ></button>
  );
};
