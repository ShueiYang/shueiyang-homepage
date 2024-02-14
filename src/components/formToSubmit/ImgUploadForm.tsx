"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { FormContextValue, FormProps } from "./InputForm";
import { useEffect, useState } from "react";

interface ImgUploadProps extends Pick<FormProps, "label"> {
  defaultImg: string;
}

const ImgUploadForm = ({ label, defaultImg }: ImgUploadProps) => {
  const { register, watch, formState } = useFormContext<FormContextValue>();
  const [isMounted, setIsMounted] = useState(false);

  const imgFile = watch(label, defaultImg);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <>
      <div className="inputField relative mb-3 h-[175px] bg-[#ffffff] lg:h-[250px]">
        <label
          className="z-10 flex h-full w-full items-center justify-center p-20"
          htmlFor={label}
        >
          {(!imgFile ||
            (imgFile instanceof FileList &&
              !imgFile.length &&
              !defaultImg)) && (
            <div className="flex">
              <Image
                className="mx-4 invert dark:invert-0"
                src="/icons/upload.svg"
                width={25}
                height={25}
                alt="upload"
              />
              <span>Image for project presentation</span>
            </div>
          )}
        </label>
        <input
          className="absolute inset-0 z-30 cursor-pointer opacity-0"
          id={label}
          {...register(label)}
          type="file"
          accept="image/*"
        />
        {(imgFile?.length || defaultImg) && (
          <Image
            src={
              imgFile instanceof FileList && imgFile[0]
                ? URL.createObjectURL(imgFile[0])
                : defaultImg ?? ""
            }
            className="z-20 object-contain sm:p-10"
            alt="Project poster"
            fill
            sizes="(max-width: 512px) 100vw"
          />
        )}
      </div>
      <span className="mb-2 text-sm text-red-500 dark:text-red-400">
        {formState.errors[label]?.message}
      </span>
    </>
  ) : (
    <div />
  );
};

export default ImgUploadForm;
