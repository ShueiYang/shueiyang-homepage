"use client"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebook, FaTwitter } from "react-icons/fa"
import { validateForm } from '@root/common.types'

interface ModalProps {
  type?: string
  title: string
  projectId?: string
  deleteAction?: (projectId: string) => Promise<void>
}

export default function ModalDialog({
  type, 
  title,
  projectId, 
  deleteAction 
}: ModalProps 
) { 
  const [isOpen, setIsOpen] = useState(false)
  const { 
    register,
    reset,
    handleSubmit, 
    formState: { 
      isValid,
      isSubmitting
    } 
  } = useForm<validateForm>({defaultValues: { titleName: "" }});

  function closeModal() {
    reset()
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  const Icon = 
    title === "@Yang" ? FaTwitter
  : title === "#Yang" ? FaFacebook
  : null;

  return (
    <>  
      <button
        type="button"
        onClick={openModal}
        className={`${type === "edit" ? "btn-secondary flex items-center mt-6"
          : `text-teal-700 dark:text-teal-400 py-2 px-5 hover:bg-[#fce6cc] dark:hover:bg-sea-d 
          font-semibold rounded-lg hover:underline underline-offset-4 decoration-blue-600 
          dark:decoration-orange-200 sm:ml-[10%]`}
        `}
      >
        <div className="flex items-center">
          {Icon && <Icon className="mr-3 text-xl"/>}
          {type === "edit" ? "Delete" : title}
        </div>
      </button>
   
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all z-50">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {type === "edit" ? "Delete Confirmation" : "Pas de lien..."}
                  </Dialog.Title>
                  
                  { type === "edit" ?
                    <>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete <b className="text-gray-900">{`${title}`}</b> ? <br/>
                          Confirme by writing the name project below.
                        </p>
                      </div>
                      <input
                        className="w-full rounded-md border-2 border-neutral-200 py-1 pl-3 pr-10 mt-3 text-sm leading-5 text-gray-900 outline-none focus:border-slate-300" 
                        type="text"
                        {...register("titleName", {
                          validate: (value) => {    // use react hook form validation to check the title
                            return value === title
                          }
                        })}
                        autoComplete="off" 
                      />
                    </>
                  : <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        { `Désolé pas de compte ${title === "@Yang" ? "Twitter" : title === "#Yang" ? 
                          "Facebook" : null}, c'etait juste pour faire style...`  
                        }
                      </p>
                    </div>            
                  }

                  <div className="flex justify-around mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {type === "edit" ? "Cancel" : "Ok je vois..."}
                    </button>
                    { type === "edit" && deleteAction && projectId &&
                      <button
                        type="button"
                        className={`btn-secondary flex items-center text-base ${isValid && !isSubmitting ? "" : "inactive"}`}
                        onClick={
                          handleSubmit(()=> deleteAction(projectId))
                        }
                      >
                        { isSubmitting ? "deleting..." : "Delete now" }
                      </button>
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
