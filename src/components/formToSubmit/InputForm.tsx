"use client";

import { useFormContext } from 'react-hook-form';

export interface FormProps {
    label: keyof InputsProps,
    text: string,
    errorText: string,
}

const InputForm = ({ label, text, errorText }: FormProps) => {

  const { register, formState: { errors }} = useFormContext<InputsProps>();

  function getInputType (label: string ) {
    if(label === "password") {
      return "password"
    } else {
      return undefined;
    }
  }

  return (
    <>
      <label className="customField relative w-full mt-5" htmlFor={label}>
        <input
          className="inputField"
          id={label}
          {...register(label, {required: true}) }
          type={getInputType(label)}
          required
        />
        <span className="placeholder absolute">{text}</span>
      </label>
      <span className="text-sm text-red-500 dark:text-red-400 mb-2">
        {errors[label] && errorText}
      </span>
    </>
  )
}

export default InputForm;