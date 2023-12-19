import styles from './EditProfile.module.scss';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Input} from '@/ui-kit';
import React from 'react';

interface Form {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().min(3).max(20).required(),
});

interface Props {
  name: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function EditProfile({name, onCancel, onSubmit}: Props) {
  const {control, handleSubmit, formState} = useForm<Form>({
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name,
    },
  });

  const onHandleSubmit = (form: Form) => {
    console.log(form);
  };

  return (
    <form>
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
      <div className={styles.actions}>
          <Button type='submit' theme={'default'} disabled={!formState.isDirty} onClick={onSubmit}>Save</Button>
          <Button theme={'outline'} onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
