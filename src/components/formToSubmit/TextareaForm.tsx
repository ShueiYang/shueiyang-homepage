"use client";

import { useFormContext } from "react-hook-form";
import { FormContextValue, FormProps } from "./InputForm";

const TextareaForm: React.FC<FormProps> = ({ label, text }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormContextValue>();

  return (
    <>
      <label className="customField relative mt-4 w-full" htmlFor={label}>
        <span className="pl-2 font-medium tracking-tight">{text}</span>
        <textarea
          className="inputField mt-2 resize-none"
          id={label}
          rows={9}
          {...register(label)}
          placeholder="Redigez votre message ici ..."
        />
      </label>
      <span className="mb-4 text-sm text-red-500 dark:text-red-400">
        {errors[label]?.message}
      </span>
    </>
  );
};

export default TextareaForm;
