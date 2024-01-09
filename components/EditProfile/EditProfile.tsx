import styles from './EditProfile.module.scss';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Input} from '@/ui-kit';
import React from 'react';
import {_api} from '@/api';
import {Profile} from '@/components/HeaderBlock/HeaderBlock';

interface Form {
  name?: string;
  currentPassword?: string;
  password?: string;
}

type EditType = 'name' | 'password';

interface Props {
  name: string;
  onSubmit: (data: Profile) => void;
  onCancel: () => void;
  type: EditType;
}

const nameSchema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().min(5).max(20).required(),
  password: yup.string().min(5).max(20).required(),
});

export default function EditProfile({name, onCancel, onSubmit, type}: Props) {
  const schema: any = type === 'name' ? nameSchema : nameSchema.concat(passwordSchema);
  const {control, handleSubmit, formState} = useForm({
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name,
      password: '',
      currentPassword: '',
    },
  });

  const onHandleSubmit = (form: Form) => {
    if (formState.isDirty) {
      _api
        .put('/auth/me', form)
        .then((data) => {
          onSubmit(data.data);
        })
        .finally(() => onCancel());
    } else {
      onCancel();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onHandleSubmit)}>
      {type === 'name' && (
        <Controller
          control={control}
          name="name"
          render={({field: {ref, ...field}, fieldState}) => (
            <Input
              aliasText="Name"
              placeholder="Jhon Doe"
              autoComplete="name"
              {...field}
              errorText={fieldState.error?.message}
            />
          )}
        />
      )}
      {type === 'password' && (
        <>
          <Controller
            control={control}
            name="currentPassword"
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                aliasText="Current password"
                placeholder="Current password"
                type="password"
                autoComplete="current-password"
                {...field}
                errorText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {ref, ...field}, fieldState}) => (
              <Input
                aliasText="New password"
                placeholder="New password"
                type="password"
                autoComplete="new-password"
                {...field}
                errorText={fieldState.error?.message}
              />
            )}
          />
        </>
      )}
      <div className={styles.actions}>
        <Button type="submit" theme="default" disabled={!formState.isValid}>
          Save
        </Button>
        <Button theme="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
