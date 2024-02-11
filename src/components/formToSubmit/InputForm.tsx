"use client";

import { EmailForm, AdminForm, ProjectForm } from "@root/common.types";
import { useFormContext } from "react-hook-form";

type FormKeys = keyof EmailForm | keyof AdminForm | keyof ProjectForm;

export interface FormProps {
  label: FormKeys;
  text: string;
  errorText: string;
}

const InputForm = ({ label, text, errorText }: FormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function getInputType(label: FormKeys) {
    if (label === "password") {
      return "password";
    } else {
      return undefined;
    }
  }

  return (
    <>
      <label className="customField relative mt-5 w-full" htmlFor={label}>
        <input
          className="inputField"
          id={label}
          {...register(label, { required: true })}
          type={getInputType(label)}
          aria-label={text}
          required
        />
        <span className="placeholder absolute">{text}</span>
      </label>
      <span className="mb-2 text-sm text-red-500 dark:text-red-400">
        {errors[label] && errorText}
      </span>
    </>
  );
};

export default InputForm;
