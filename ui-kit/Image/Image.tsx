'use client';
import {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import notFound from '@/assets/images/not-found.svg?url';

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
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageProps.src) {
      setImageSrc(imageProps.src);
    } else {
      setImageSrc(notFound.src);
    }
    if (ref?.current?.complete) setImageLoading(false);
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
        ref={ref}
        onErrorCapture={() => {
          console.log('test');
        }}
        onError={() => {
          setImageSrc(fallback ?? notFound.src);
          setImageLoading(false);
        }}
        onLoad={() => setImageLoading(false)}
      />
    </>
  );
};

// export const Image = dynamic(() => Promise.resolve(ImageComponent), {ssr: false});
