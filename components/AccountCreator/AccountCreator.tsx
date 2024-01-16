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
import {useStore} from '@/providers/ContextProvider';
import {revalidateCache, revalidateQuery} from '@/api/revalidatePath';
import {revalidateTag} from 'next/cache';

interface Props {
  currentAccount?: Partial<IAccountItem>;
  createMode?: boolean;
  editMode?: boolean;
  createMinifiedMode?: boolean;
  withWrapper?: boolean;
  disableEditDefault?: boolean;
  minifiedTitle?: boolean;
}

const schema = yup.object().shape({
  login: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
  socialName: yup.string().required().min(2).max(20),
});

export const AccountCreator = ({
  currentAccount,
  createMode = false,
  editMode = false,
  createMinifiedMode,
  withWrapper = true,
  disableEditDefault = false,
  minifiedTitle = false,
}: Props) => {
  const {showSnackbar} = useSnackbar();
  const [isEditMode, setIsEditMode] = useState(
    Boolean((createMode || createMinifiedMode) && !disableEditDefault),
  );
  const [currAccount, setCurrentAccount] = useState(currentAccount);
  const {refreshData, accounts} = useStore();
  const countAccounts = useMemo(() => {
    return accounts?.find((item) => item?.socialName === currAccount?.socialName)?.accountEntries
      .length;
  }, [accounts]);
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
  const socialName = watch('socialName') || 'New account';

  const handleSubmitForm = (form: IAccountItem) => {
    _api
      .request<{body: IAccountItem}>({
        data: form,
        url: createMode || createMinifiedMode ? '/api/accounts/add' : '/api/accounts/update',
        method: createMode || createMinifiedMode ? 'POST' : 'PUT',
        // withCredentials: true,
      })
      .then((data) => {
        if (createMode) {
          showSnackbar('Вы успешно добавили аккаунт');
          // revalidateCache();
          // revalidateQuery();
          router.push('/accounts?revalidate=1');
        }
        if (createMinifiedMode) {
          showSnackbar('Вы успешно добавили аккаунт');
          // refreshData?.();
          router.refresh();
          reset();
        }
        if (editMode) {
          showSnackbar('Вы успешно обновили аккаунт');
          reset(form);
          setCurrentAccount(form);
          setIsEditMode(false);
        }
      });
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    _api.delete(`/api/accounts/delete/${currAccount?._id}`).then(() => {
      showSnackbar('Аккаунт успешно удалён');
      if (createMode) {
        revalidateQuery();
        router.push('/accounts?revalidate=1');
      }
      if (editMode) {
        revalidateQuery();
        if (countAccounts === 1) router.push('/accounts?revalidate=1');
      }
    });
  };

  const ActionButtons = ({type}: {type: 'desktop' | 'mobile'}) => (
    <div className={classNames(styles.actions, styles[type])}>
      <Button
        theme="default"
        className={classNames({
          [styles.hidden]: !formState.isDirty || !isEditMode,
        })}
        type="submit"
        disabled={!formState.isValid}
      >
        SAVE
      </Button>
      {editMode && (
        <Button theme="outline" onClick={handleDelete}>
          DELETE
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
                edit mode
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
          <ActionButtons type={'mobile'} />
        </div>
      </form>
    </div>
  );
};
