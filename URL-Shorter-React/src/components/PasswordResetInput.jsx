import { useState } from 'react';
import { useForm } from 'react-hook-form';

const PasswordResetInput = ({ label, id, type, placeholder, register, error, validationRules }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-semibold text-md">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${error ? "border-red-500" : "border-slate-600"}`}
        {...register(id, validationRules)}
      />
      {error && <p className="text-sm font-semibold text-red-600 mt-0">{error.message}</p>}
    </div>
  );
};

export default PasswordResetInput;
