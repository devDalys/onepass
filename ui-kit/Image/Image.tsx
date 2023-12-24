'use client';
import {useEffect, useState} from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import notFound from '@/assets/images/not-found.svg?url';
import dynamic from 'next/dynamic';

const classes = {
  loader: 'loader',
  img: 'img',
};

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  classes?: Partial<typeof classes>;
  fallback?: string;
}

const ImageComponent = ({classes, fallback, ...imageProps}: Props) => {
  const [isImageLoading, setImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(imageProps.src);
  useEffect(() => {
    setImageSrc(imageProps.src);
  }, [imageProps.src]);

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
          setImageSrc(fallback ?? notFound.src);
          setImageLoading(false);
        }}
        onLoad={() => setImageLoading(false)}
      />
    </>
  );
};

export const Image = dynamic(() => Promise.resolve(ImageComponent), {ssr: false});
