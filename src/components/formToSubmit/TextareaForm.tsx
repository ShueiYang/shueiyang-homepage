"use client";

import { useFormContext } from "react-hook-form";
import { FormProps } from "./InputForm";

const TextareaForm = ({ label, text, errorText }: FormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label className="customField relative mt-4 w-full" htmlFor={label}>
        <span className="pl-2 font-medium tracking-tight">{text}</span>
        <textarea
          className="inputField mt-2 resize-none"
          id={label}
          rows={9}
          {...register(label, { required: true })}
          placeholder="Redigez votre message ici ..."
        />
      </label>
      <span className="mb-4 text-sm text-red-500 dark:text-red-400">
        {errors[label] && errorText}
      </span>
    </>
  );
};

export default TextareaForm;
