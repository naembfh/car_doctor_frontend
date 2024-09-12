import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface CdInputProps {
  type: string;
  label: string;
  name: string;
  placeHolder: string;
  validation?: object;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
}

const CdInput: React.FC<CdInputProps> = ({ type, label, name, placeHolder, validation, register, errors }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeHolder}
        {...register?.(name, validation)}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors?.[name] ? 'border-red-500' : ''}`}
      />
      {errors?.[name] && <p className="text-red-500 text-xs italic">{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default CdInput;
