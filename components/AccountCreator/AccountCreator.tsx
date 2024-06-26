import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import classNames from 'classnames';
import styles from './AccountCreator.module.scss';
import {Button, Checkbox, Input, PageTitle} from '@/ui-kit';
import {useSnackbar} from '@/providers/SnackbarProvider';
import {useMemo, useState} from 'react';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {useRouter} from 'next/navigation';
import NotSearchFound from '@/components/NotSearchFound/NotSearchFound';
import {_api} from '@/api';
import {revalidateQuery} from '@/api/revalidatePath';
import {Profile} from '@/components/HeaderBlock/HeaderBlock.types';
import {validationMessages} from '@/utils/consts';

interface Props {
  currentAccount?: Partial<IAccountItem>;
  createMode?: boolean;
  editMode?: boolean;
  createMinifiedMode?: boolean;
  withWrapper?: boolean;
  minifiedTitle?: boolean;
  profile?: Profile;
}

const schema = yup.object().shape({
  login: yup
    .string()
    .required(validationMessages.required())
    .min(1, validationMessages.min(1))
    .max(50, validationMessages.max(50)),
  password: yup
    .string()
    .required(validationMessages.required())
    .min(1, validationMessages.min(1))
    .max(50, validationMessages.max(50)),
  socialName: yup
    .string()
    .required(validationMessages.required())
    .min(2, validationMessages.min(2))
    .max(20, validationMessages.max(20)),
});

export const AccountCreator = ({
  currentAccount,
  createMode = false,
  editMode = false,
  createMinifiedMode,
  withWrapper = true,
  minifiedTitle = false,
  profile,
}: Props) => {
  const {showSnackbar} = useSnackbar();
  const [isEditMode, setIsEditMode] = useState(false);
  const [currAccount, setCurrentAccount] = useState(currentAccount);
  const [isLoading, setLoading] = useState(false);

  const countAccounts = useMemo(() => {
    return profile?.accounts?.find((item) => item?.socialName === currAccount?.socialName)
      ?.accountEntries.length;
  }, [currAccount?.socialName, profile?.accounts]);
  const router = useRouter();

  const {control, reset, formState, watch, handleSubmit} = useForm<IAccountItem>({
    defaultValues: {
      login: currAccount?.login || '',
      password: currAccount?.password || '',
      socialName: currAccount?.socialName || '',
      _id: currAccount?._id,
    },
    resolver: yupResolver(schema),
  });

  const notFound = !currentAccount && !createMode;
  const socialName = watch('socialName') || 'Новый аккаунт';

  const handleSubmitForm = (form: IAccountItem) => {
    setLoading((state) => !state);
    _api
      .request<{body: IAccountItem}>({
        data: form,
        url: !editMode ? '/accounts/add' : '/accounts/update',
        method: !editMode ? 'POST' : 'PUT',
      })
      .then(() => {
        revalidateQuery();

        if (createMode) {
          showSnackbar('Вы успешно добавили аккаунт');
          router.push('/accounts');
        }
        if (createMinifiedMode) {
          showSnackbar('Вы успешно добавили аккаунт');
          reset();
        }
        if (editMode) {
          showSnackbar('Вы успешно обновили аккаунт');
          reset(form);
          setCurrentAccount(form);
          setIsEditMode(false);
        }
      })
      .finally(() => {
        setLoading((state) => !state);
      });
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    _api.delete(`/accounts/delete/${currAccount?._id}`).then(() => {
      showSnackbar('Аккаунт успешно удалён');
      revalidateQuery();

      if (createMode || (editMode && countAccounts === 1)) {
        router.push('/accounts');
      }
    });
  };

  const ActionButtons = ({type}: {type: 'desktop' | 'mobile'}) => (
    <div className={classNames(styles.actions, styles[type])}>
      <Button
        theme="default"
        className={classNames({
          [styles.hidden]: !formState.isDirty,
        })}
        type="submit"
        disabled={!formState.isValid || isLoading}
      >
        Сохранить
      </Button>
      {editMode && (
        <Button disabled={isLoading} theme="outline" onClick={handleDelete}>
          Удалить
        </Button>
      )}
    </div>
  );

  if (notFound) return <NotSearchFound />;

  return (
    <div className={withWrapper ? styles.wrapper : ''}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.header}>
          <div className={styles.title}>
            {(createMode || createMinifiedMode) && (
              <PageTitle className={classNames({[styles.minifiedTitle]: minifiedTitle})}>
                {currAccount?.socialName || socialName}
              </PageTitle>
            )}
            {editMode && (
              <div className={styles.checker}>
                Редактировать
                <Checkbox
                  value={isEditMode}
                  setValue={() => {
                    setIsEditMode((state) => !state);
                    reset();
                  }}
                />
              </div>
            )}
          </div>
          <ActionButtons type="desktop" />
        </div>
        <div className={styles.form}>
          {createMode && (
            <Controller
              name="socialName"
              control={control}
              render={({field: {ref, ...field}, fieldState}) => (
                <Input
                  aliasText="Название"
                  readOnly={editMode && !isEditMode}
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
                aliasText="Логин"
                readOnly={editMode && !isEditMode}
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
                aliasText="Пароль"
                readOnly={editMode && !isEditMode}
                type={isEditMode ? 'text' : 'password'}
                {...field}
                className={classNames(styles.input, {[styles.editMode]: !isEditMode})}
                errorText={fieldState.error?.message}
              />
            )}
          />
          <ActionButtons type={'mobile'} />
        </div>
      </form>
    </div>
  );
};
