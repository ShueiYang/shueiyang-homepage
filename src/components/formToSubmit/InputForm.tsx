"use client";

import { EmailForm, AdminForm, ProjectForm } from "@root/common.types";
import { useFormContext } from "react-hook-form";

export type FormContextValue = EmailForm & AdminForm & ProjectForm;

export interface FormProps {
  label: FormKeys;
  text: string;
  value?: string;
}
type FormKeys = keyof FormContextValue;

const InputForm: React.FC<FormProps> = ({ label, text, value }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormContextValue>();

  function getInputType(label: FormKeys) {
    if (label === "id") {
      return "hidden";
    } else if (label === "password") {
      return "password";
    }
    return undefined;
  }

  return (
    <>
      <label className="customField relative mt-5 w-full" htmlFor={label}>
        <input
          className="inputField"
          id={label}
          {...register(label)}
          type={getInputType(label)}
          aria-label={text}
          value={value}
          required={label !== "id"}
        />
        <span className="placeholder absolute">{text}</span>
      </label>
      <span className="mb-2 text-sm text-red-500 dark:text-red-400">
        {errors[label]?.message}
      </span>
    </>
  );
};

export default InputForm;
