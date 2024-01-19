import {useId, useRef, useState} from 'react';
import styles from './DragDrop.module.scss';
import {Button, Image} from '@/ui-kit';
import Delete from '@/assets/images/Delete.svg';
import classNames from 'classnames';
export const DragDrop = () => {
  const [value, setValue] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isDrag, setIsDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();
  const handleDeleteImage = () => {
    setValue('');
    setFile(undefined);
  };

  const onDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(true);
    console.log('Start');
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
    console.log('Leave');
  };

  const onDrop = (e: React.DragEvent) => {
    setIsDrag(false);
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    setValue(file.name);
  };

  return (
    <>
      {file ? (
        <div className={styles.previewWrapper}>
          <Image
            classes={{img: styles.image, loader: styles.image}}
            src={URL.createObjectURL(file)}
          />
          <button className={styles.deleteButton} onClick={handleDeleteImage}>
            <Delete />
          </button>
        </div>
      ) : (
        <label
          className={styles.label}
          htmlFor={id}
          onDragEnter={onDragStart}
          onDragLeave={onDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <div className={classNames(styles.uploadText, {[styles.disableEvents]: isDrag})}>
            <span className={styles.topSpan}>{isDrag ? 'Отпустите файл' : 'Перетащите фото'}</span>
            <span className={styles.middleSpan}>или</span>
            <Button
              theme="default"
              className={styles.bottomButton}
              onClick={() => ref.current?.click()}
            >
              Нажмите сюда
            </Button>
          </div>
          <input
            id={id}
            type="file"
            className={styles.input}
            value={value}
            ref={ref}
            accept="image/jpeg"
            onChange={(event) => {
              setValue(event.target.value);
              setFile(event.target.files?.[0]);
            }}
          />
        </label>
      )}
    </>
  );
};
