import styles from './Button.module.scss';
import classNames from 'classnames';

export const BUTTON_THEME = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
} as const;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: (typeof BUTTON_THEME)[keyof typeof BUTTON_THEME];
  className: string;
}

export const Button = (props: Props) => {
  const {theme, className, ...buttonProps} = props;

  return (
    <button
      className={classNames(styles.button, styles[theme], className)}
      {...buttonProps}
    ></button>
  );
};
