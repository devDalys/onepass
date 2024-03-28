import {useId, useState} from 'react';
import {Button, Image} from '@/ui-kit';
import classNames from 'classnames';
import FormData from 'form-data';
import {_api} from '@/api';
import styles from './DragDrop.module.scss';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {revalidateQuery} from '@/api/revalidatePath';
import Upload from '@/assets/images/Upload.svg';
import Accept from '@/assets/images/Accept.svg';
import Cancel from '@/assets/images/Cancel.svg';
import {AxiosProgressEvent} from 'axios';

const maxSize = 5 * 1024 * 1024;
export const DragDrop = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isDrag, setIsDrag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const {showSnackbar} = useSnackbar();
  const id = useId();

  const validateFile = (file: File | undefined) => {
    if (!file) {
      return showSnackbar('Произошла ошибка при загрузке файла, попробуйте другой');
    }
    if (file?.size > maxSize) {
      return showSnackbar('Максимальный вес файла не должен превышать 5 мб');
    }

    if (!['.jpeg', '.jpg', '.heif'].some((ext) => file.name.endsWith(ext))) {
      return showSnackbar('Расширение файла должно быть .jpeg, .jpg или .heif');
    }
    return setFile(file);
  };

  const handleDeleteImage = () => {
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
    validateFile(file);
  };

  const config = {
    onUploadProgress: function (progressEvent: AxiosProgressEvent) {
      if (progressEvent.total) {
        setLoadingProgress(Math.round((progressEvent.loaded * 100) / progressEvent?.total));
      }
    },
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('image', file);
    setIsLoading(true);
    _api
      .post('/image/upload', formData, config)
      .then(() => {
        showSnackbar('Фото профиля обновлено');
        revalidateQuery();
      })
      .catch(() => {
        showSnackbar('Не удалось обновить фото');
      })
      .finally(() => {
        handleDeleteImage();
        setIsLoading(false);
        setLoadingProgress(0);
      });
  };

  if (file)
    return (
      <div className={styles.previewWrapper}>
        {isLoading && (
          <>
            <div
              className={styles.loadingBackground}
              style={{maxHeight: `${105 - loadingProgress}%`}}
            />
            <div className={styles.loadingText}>Загрузка... {loadingProgress}%</div>
          </>
        )}
        <Image
          classes={{img: styles.image, loader: styles.image}}
          src={URL.createObjectURL(file)}
        />
        <div className={styles.actions}>
          <button className={styles.button} disabled={isLoading} onClick={handleDeleteImage}>
            <Cancel />
          </button>
          <button className={styles.button} disabled={isLoading} onClick={handleSubmit}>
            <Accept />
          </button>
        </div>
      </div>
    );

  return (
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
            <span className={styles.topSpan}>Перетащите новое фото профиля</span>
            <span className={styles.middleSpan}>или</span>
            <Button theme="default" className={styles.bottomButton}>
              Нажмите сюда
            </Button>
            <span className={styles.uploadInfo}>
              Вес файла не должен быть больше 5мб, а расширение .jpeg или .heif
            </span>
          </>
        )}
      </div>
      <input
        id={id}
        type="file"
        className={styles.input}
        value={file}
        accept="image/jpeg, image/heif"
        onChange={(event) => {
          validateFile(event.target.files?.[0]);
        }}
      />
    </label>
  );
};
