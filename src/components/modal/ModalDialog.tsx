"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiFacebookCircleFill, RiTwitterXFill } from "react-icons/ri";
import { ValidateForm } from "@root/common.types";

interface ModalProps {
  title: string;
  type?: string;
  projectId?: string;
  isPending?: boolean;
  handleDeleteAction?: (projectId: string) => void;
}

export default function ModalDialog({
  title,
  type,
  projectId,
  isPending,
  handleDeleteAction,
}: Readonly<ModalProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<ValidateForm>({ defaultValues: { titleName: "" } });

  function closeModal() {
    reset();
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  let Icon = null;
  let socialNetworkName: string | null = null;

  if (title === "@Yang") {
    Icon = RiTwitterXFill;
    socialNetworkName = "X";
  } else if (title === "#Yang") {
    Icon = RiFacebookCircleFill;
    socialNetworkName = "Facebook";
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`${
          type === "edit"
            ? "btn-secondary mt-6 flex items-center"
            : `rounded-lg px-5 py-2 font-semibold text-teal-700 decoration-blue-600 
          underline-offset-4 hover:bg-[#fce6cc] hover:underline dark:text-teal-400 dark:decoration-orange-200 
          dark:hover:bg-sea-d sm:ml-[10%]`
        }
        `}
      >
        <div className="flex items-center">
          {Icon && <Icon className="mr-3 text-xl" />}
          {type === "edit" ? "Delete" : title}
        </div>
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {type === "edit" ? "Delete Confirmation" : "Pas de lien..."}
              </DialogTitle>

              {type === "edit" ? (
                <>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete{" "}
                      <b className="text-gray-900">{`${title}`}</b> ? <br />
                      Confirme by writing the name project below.
                    </p>
                  </div>
                  <input
                    className="mt-3 w-full rounded-md border-2 border-neutral-200 py-1 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:border-slate-300"
                    type="text"
                    {...register("titleName", {
                      validate: (value) => {
                        // use react hook form validation to check the title
                        return value === title;
                      },
                    })}
                    autoComplete="off"
                  />
                </>
              ) : (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {`Oops compte ${socialNetworkName}? Juste un mirage numérique pour la décoration.`}
                  </p>
                </div>
              )}

              <div className="mt-4 flex justify-around">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  {type === "edit" ? "Cancel" : "Ok je vois..."}
                </button>
                {type === "edit" && handleDeleteAction && projectId && (
                  <button
                    type="button"
                    className={`btn-secondary flex items-center text-base ${
                      isValid && !isPending ? "" : "inactive"
                    }`}
                    onClick={handleSubmit(() => handleDeleteAction(projectId))}
                  >
                    {isPending ? "deleting..." : "Delete now"}
                  </button>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
