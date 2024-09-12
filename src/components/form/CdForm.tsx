import React, { ReactNode } from 'react';
import { useForm, UseFormRegister, FieldValues, FieldErrors, SubmitHandler } from 'react-hook-form';

interface CdFormProps<T extends FieldValues> {
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
            // Casting child as React element to pass register and errors props
            return React.cloneElement(child as React.ReactElement<any>, { register, errors });
          }
          return child;
        })
      }
    </form>
  );
};

export default CdForm;
