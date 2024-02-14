"use client";

// import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  label: string;
  isPending: boolean;
  isDirty: boolean;
}

export default function SubmitButton({
  label,
  isPending,
  isDirty,
}: SubmitButtonProps) {
  // New hook for form pending state but not working now since need to use action on the form.
  // const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={isPending}
      className={`btn-primary mt-6 flex items-center ${
        isPending || !isDirty ? "inactive" : ""
      }`}
    >
      {isPending ? "Uploading..." : label}
    </button>
  );
}
