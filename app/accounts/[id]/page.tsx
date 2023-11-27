'use client';
import {IAccountItem} from '@/components/AccountsList/AccountItem';
import {_api} from '@/api';
import {useAccountsContext} from '@/Providers/ContextProvider';
import {useCallback, useEffect, useState} from 'react';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import styles from './styles.module.scss';
import {Button, Checkbox, Input} from '@/ui-kit';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import classNames from 'classnames';
import {Simulate} from 'react-dom/test-utils';
const getAccounts = async (token: string): Promise<IAccountItem[]> => {
  const data = await _api.get('/accounts');
  return Object.values(data.data.body);
};

interface Form {
  login: string;
  socialName: string;
  password: string;
}

const schema = yup.object().shape({
  login: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
  socialName: yup.string().required().min(2).max(20),
});

export default function AccountPage({params}: {params: {id: string}}) {
  const {accounts} = useAccountsContext();
  const [currentAccount, setCurrentAccount] = useState<IAccountItem>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  const {control, reset, formState} = useForm<Form>({
    defaultValues: {
      login: '',
      password: '',
      socialName: '',
    },
    resolver: yupResolver(schema),
  });

  const ActionButtons = ({type}: {type: 'desktop' | 'mobile'}) => (
    <div className={classNames(styles.actions, styles[type])}>
      <Button
        theme="default"
        className={classNames({[styles.hidden]: !formState.isDirty || !isEditMode})}
      >
        SAVE
      </Button>
      <Button theme="outline">DELETE</Button>
    </div>
  );

  useEffect(() => {
    if (!accounts?.length) {
      _api
        .get('/accounts')
        .then((data) =>
          setCurrentAccount(data.data.body.find((item: IAccountItem) => item._id === params.id)),
        )
        .finally(() => setIsLoading(false));
    } else {
      setCurrentAccount(accounts.find((item) => item._id === params.id));
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    reset({
      login: currentAccount?.login,
      password: currentAccount?.password,
      socialName: currentAccount?.socialName,
    });
  }, [currentAccount, reset]);

  useEffect(() => {
    if (currentAccount) {
      handleReset();
    }
  }, [currentAccount, handleReset, reset]);

  if (isLoading) return <FullScreenLoading />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1 className={styles.h1}>{currentAccount?.socialName}</h1>
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
    </div>
  );
}
