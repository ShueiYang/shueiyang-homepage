"use client";

import { useFormContext } from 'react-hook-form';
import { FormProps } from './InputForm';


const TextareaForm = ({ label, text, errorText }: FormProps) => {

  const { register, formState: { errors }} = useFormContext<InputsProps>();

  return (
    <>
      <label className="customField relative w-full mt-4" htmlFor={label} >
        <span className="font-medium tracking-tight pl-2">{text}</span>
        <textarea
            className="inputField mt-2 resize-none"
            rows={9}
            {...register(label, {required: true}) }
            placeholder="Redigez votre message ici ..."
        />
      </label>
      <span className="text-sm text-red-500 dark:text-red-400 mb-4">
        {errors.message && errorText}
      </span>
    </>
  )
}

export default TextareaForm;