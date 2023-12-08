'use client';
import {useState} from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';

const classes = {
  loader: 'loader',
  img: 'img',
};

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  classes?: Partial<typeof classes>;
}

export const Image = (props: Props) => {
  const [isImageLoading, setImageLoading] = useState(true);

  return (
    <>
      {isImageLoading && (
        <div className={classNames(styles.avatar, styles.loader, props?.classes?.loader)} />
      )}
      <img
        className={classNames(styles.avatar, props?.classes?.img, {
          [styles.hideAvatar]: isImageLoading,
        })}
        src={props?.src}
        alt={props?.alt}
        onLoad={() => setImageLoading(false)}
      />
    </>
  );
};
