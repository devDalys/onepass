import styles from './Button.module.scss';
import classNames from 'classnames';

export const BUTTON_THEME = {
  DEFAULT: 'default',
  OUTLINE: 'outline',
} as const;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: (typeof BUTTON_THEME)[keyof typeof BUTTON_THEME];
}

export const Button = (props: Props) => {
  const {theme, ...anyprops} = props;

  return <button className={classNames(styles.button, styles[theme])} {...anyprops}></button>;
};
