"use client";

import { useFormContext } from "react-hook-form";
import { FormProps } from "./InputForm";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImgUploadProps extends Pick<FormProps, "label"> {
  type: string;
  defaultImg: string;
}

const ImgUploadForm = ({ label, type, defaultImg }: ImgUploadProps) => {
  const { register, watch } = useFormContext();
  const [isMounted, setIsMounted] = useState(false);

  const imgFile: FileList | string = watch(label, defaultImg);

  const actionMode = type === "create";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <div className="inputField relative mb-3 h-[175px] bg-[#ffffff] lg:h-[250px]">
      <label
        className="z-10 flex h-full w-full items-center justify-center p-20"
        htmlFor={label}
      >
        {(!imgFile ||
          (imgFile instanceof FileList && !imgFile.length && !defaultImg)) && (
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
        {...register(label, { required: actionMode })}
        type="file"
        accept="image/*"
      />
      {((imgFile && imgFile.length) || defaultImg) && (
        <Image
          src={
            imgFile instanceof FileList && imgFile[0]
              ? URL.createObjectURL(imgFile[0])
              : defaultImg
          }
          className="z-20 object-contain sm:p-10"
          alt="Project poster"
          fill
          sizes="(max-width: 512px) 100vw"
        />
      )}
    </div>
  ) : (
    <div />
  );
};

export default ImgUploadForm;
