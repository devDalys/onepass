import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import classNames from 'classnames';
import styles from './AccountCreator.module.scss';
import {Button, Checkbox, Input} from '@/ui-kit';
import {useSnackbar} from '@/Providers/SnackbarProvider';
import {useCallback, useEffect, useState} from 'react';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {notFound} from 'next/navigation';
import NotSearchFound from '@/components/NotSearchFound/NotSearchFound';
import {_api} from '@/api';

interface Form {
  login: string;
  socialName: string;
  password: string;
}

interface Props {
  currentAccount?: IAccountItem;
  isCreateMode?: boolean;
}

const schema = yup.object().shape({
  login: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
  socialName: yup.string().required().min(2).max(20),
});

export const AccountCreator = ({currentAccount, isCreateMode = false}: Props) => {
  const {showSnackbar} = useSnackbar();
  const [isEditMode, setIsEditMode] = useState(isCreateMode);
  const notFound = !currentAccount && !isCreateMode;

  const {control, reset, formState, watch, handleSubmit} = useForm<Form>({
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
      login: currentAccount?.login,
      password: currentAccount?.password,
      socialName: currentAccount?.socialName,
    });
  }, [currentAccount, reset]);
  const handleSubmitForm = (form: Form) => {
    isCreateMode &&
      _api.post('/accounts/add', form).then(() => {
        showSnackbar('Вы успешно добавили аккаунт');
        reset();
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
        <Button theme="outline" onClick={() => showSnackbar('Аккаунт удалён')}>
          DELETE
        </Button>
      )}
    </div>
  );

  if (notFound) return <NotSearchFound />;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h1 className={styles.h1}>{currentAccount?.socialName || socialName}</h1>
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
