import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import classNames from 'classnames';
import styles from './AccountCreator.module.scss';
import {Button, Checkbox, Input, PageTitle} from '@/ui-kit';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useCallback, useEffect, useState} from 'react';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {useRouter} from 'next/navigation';
import NotSearchFound from '@/components/NotSearchFound/NotSearchFound';
import {_api} from '@/api';

interface Props {
  currentAccount?: IAccountItem;
  isCreateMode?: boolean;
  isSimpleMode?: boolean;
}

const schema = yup.object().shape({
  login: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
  socialName: yup.string().required().min(2).max(20),
});

export const AccountCreator = ({
  currentAccount,
  isCreateMode = false,
  isSimpleMode = false,
}: Props) => {
  const {showSnackbar} = useSnackbar();
  const [isEditMode, setIsEditMode] = useState(isCreateMode);
  const [currAccount, setCurrentAccount] = useState(currentAccount);
  const notFound = !currentAccount && !isCreateMode;
  const router = useRouter();

  const {control, reset, formState, watch, handleSubmit} = useForm<IAccountItem>({
    defaultValues: {
      login: '',
      password: '',
      socialName: '',
    },
    resolver: yupResolver(schema),
  });

  const socialName = watch('socialName') || 'New account';

  const handleReset = useCallback(() => {
    reset({
      login: currAccount?.login,
      password: currAccount?.password,
      socialName: currAccount?.socialName,
      _id: currAccount?._id,
    });
  }, [currAccount, reset]);
  const handleSubmitForm = (form: IAccountItem) => {
    _api
      .request<{body: IAccountItem}>({
        data: form,
        url: isCreateMode ? '/accounts/add' : '/accounts/update',
        method: isCreateMode ? 'POST' : 'PUT',
      })
      .then((data) => {
        isCreateMode
          ? showSnackbar('Вы успешно добавили аккаунт')
          : showSnackbar('Вы успешно обновили аккаунт');
        if (!isCreateMode) {
          reset(data.data.body);
          setCurrentAccount(form);
          setIsEditMode(false);
        } else {
          router.push('/accounts/?revalidate=1');
        }
      });
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    _api.delete(`/accounts/delete/${currAccount?._id}`).then(() => {
      showSnackbar('Аккаунт успешно удалён');
      router.push('/accounts/?revalidate=1');
    });
  };

  useEffect(() => {
    if (currentAccount && !isCreateMode) {
      handleReset();
    }
  }, [currentAccount, handleReset, isCreateMode, reset]);

  const ActionButtons = ({type}: {type: 'desktop' | 'mobile'}) => (
    <div className={classNames(styles.actions, styles[type])}>
      <Button
        theme="default"
        className={classNames({
          [styles.hidden]: (!formState.isDirty || !isEditMode) && !isCreateMode,
        })}
        type="submit"
        disabled={!formState.isValid}
      >
        SAVE
      </Button>
      {!isCreateMode && (
        <Button theme="outline" onClick={handleDelete}>
          DELETE
        </Button>
      )}
    </div>
  );

  if (notFound) return <NotSearchFound />;

  return (
    <div className={!isSimpleMode ? styles.wrapper : ''}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.header}>
          <div className={styles.title}>
            {!isSimpleMode && <PageTitle>{currAccount?.socialName || socialName}</PageTitle>}
            {!isCreateMode && (
              <div className={styles.checker}>
                edit mode
                <Checkbox
                  value={isEditMode}
                  setValue={() => {
                    setIsEditMode((state) => !state);
                    handleReset();
                  }}
                />
              </div>
            )}
          </div>
          <ActionButtons type="desktop" />
        </div>
        <div className={styles.form}>
          {!isSimpleMode && (
            <Controller
              name="socialName"
              control={control}
              render={({field: {ref, ...field}, fieldState}) => (
                <Input
                  aliasText="Social name"
                  readOnly={!isEditMode}
                  {...field}
                  className={classNames(styles.input, {[styles.editMode]: !isEditMode})}
                  errorText={fieldState.error?.message}
                />
              )}
            />
          )}
          <Controller
            name="login"
            control={control}
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                aliasText="Login"
                readOnly={!isEditMode}
                {...field}
                className={classNames(styles.input, {[styles.editMode]: !isEditMode})}
                errorText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                aliasText="Password"
                readOnly={!isEditMode}
                type={isEditMode ? 'text' : 'password'}
                {...field}
                className={classNames(styles.input, {[styles.editMode]: !isEditMode})}
                errorText={fieldState.error?.message}
              />
            )}
          />
          <ActionButtons type="mobile" />
        </div>
      </form>
    </div>
  );
};
