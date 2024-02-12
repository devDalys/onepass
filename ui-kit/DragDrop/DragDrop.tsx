import {useId, useState} from 'react';
import {Button, Image} from '@/ui-kit';
import classNames from 'classnames';
import FormData from 'form-data';
import {_api} from '@/api';
import styles from './DragDrop.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {revalidateCache} from '@/api/revalidatePath';
import Upload from '@/assets/images/Upload.svg';
import Accept from '@/assets/images/Accept.svg';
import Cancel from '@/assets/images/Cancel.svg';

const maxSize = 5 * 1024 * 1024;
export const DragDrop = () => {
  const [value, setValue] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isDrag, setIsDrag] = useState(false);
  const {showSnackbar} = useSnackbar();
  const id = useId();
  const handleDeleteImage = () => {
    setValue('');
    setFile(undefined);
  };
  const onDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
  };

  const onDrop = (e: React.DragEvent) => {
    setIsDrag(false);
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || file?.size > maxSize || file?.name) {
      handleDeleteImage();
      return showSnackbar('Загрузите изображение весом до 5mb и расширением .jpeg');
    }
    setFile(file);
    setValue(file.name);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', file);
    _api
      .post('/profile/upload', formData)
      .then(() => {
        handleDeleteImage();
        showSnackbar('Фото профиля обновлено');
        revalidateCache();
      })
      .catch(() => {
        showSnackbar('Не удалось обновить фото');
      });
  };

  return (
    <>
      {file ? (
        <div className={styles.previewWrapper}>
          <Image
            classes={{img: styles.image, loader: styles.image}}
            src={URL.createObjectURL(file)}
          />
          <div className={styles.actions}>
            <button className={styles.button} onClick={handleDeleteImage}>
              <Cancel />
            </button>
            <button className={styles.button} onClick={handleSubmit}>
              <Accept />
            </button>
          </div>
        </div>
      ) : (
        <label className={styles.label} htmlFor={id}>
          <div
            className={classNames(styles.uploadText, {[styles.disableEvents]: isDrag})}
            onDragEnter={onDragStart}
            onDragLeave={onDragLeave}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            {isDrag ? (
              <div className={styles.draggable}>
                <span className={styles.topSpan}>Отпустите файл</span>
                <Upload />
              </div>
            ) : (
              <>
                <span className={styles.topSpan}>Перетащите фото</span>
                <span className={styles.middleSpan}>или</span>
                <Button theme="default" className={styles.bottomButton}>
                  Нажмите сюда
                </Button>
              </>
            )}
          </div>
          <input
            id={id}
            type="file"
            className={styles.input}
            value={value}
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
