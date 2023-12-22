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
  fallback?: string;
}

export const Image = ({classes, fallback, ...imageProps}: Props) => {
  const [isImageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(imageProps.src);
  console.log(fallback);

  return (
    <>
      {isImageLoading && (
        <div className={classNames(styles.avatar, styles.loader, classes?.loader)} />
      )}
      <img
        {...imageProps}
        className={classNames(styles.avatar, classes?.img, {
          [styles.hideAvatar]: isImageLoading,
        })}
        src={imageSrc}
        onError={() => {
          setImageSrc(fallback);
          setImageLoading(false);
        }}
        onLoad={() => setImageLoading(false)}
      />
    </>
  );
};
