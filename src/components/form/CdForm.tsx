import React, { ReactNode } from 'react';
import { useForm, UseFormRegister, FieldValues, FieldErrors, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

interface CdFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const CdForm = <T extends FieldValues>({ onSubmit, children }: CdFormProps<T>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        React.Children.map(children, child => {
          if (React.isValidElement(child) && typeof child.type === 'function') {
            return React.cloneElement(child, { register, errors });
          }
          return child;
        })
      }
    </form>
  );
};

export default CdForm;
