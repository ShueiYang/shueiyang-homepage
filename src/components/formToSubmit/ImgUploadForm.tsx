"use client";

import { useFormContext } from "react-hook-form";
import { FormProps } from "./InputForm";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImgUploadProps extends Pick<FormProps, "label"> {
  type: string
  defaultImg: string 
}


const ImgUploadForm = ({ label, type, defaultImg }: ImgUploadProps) => {

    const { register, watch } = useFormContext();
    const [isMounted, setIsMounted] = useState(false);

    const imgFile: FileList | string = watch(label, defaultImg)
  
    const actionMode = type === "create";

    useEffect(() => {
      setIsMounted(true)
    }, []);  


  return isMounted ? (
    <div className="relative inputField h-[175px] lg:h-[250px] mb-3 bg-[#ffffff]">
      <label className="flex justify-center items-center w-full h-full z-10 p-20" htmlFor={label}>
      {(!imgFile || (imgFile instanceof FileList && !imgFile.length && !defaultImg)) && 
        <div className="flex">
          <Image 
            className="invert dark:invert-0 mx-4"
            src="/icons/upload.svg"
            width={25}
            height={25}
            alt="upload"
          />
          <span>Image for project presentation</span>
        </div>  
      }   
      </label>    
      <input
        className="absolute z-30 inset-0 opacity-0 cursor-pointer"
        id={label}
        {...register(label, { required: actionMode })}   
        type="file"
        accept="image/*"
      />
      { ((imgFile && imgFile.length) || defaultImg) &&
        <Image 
          src={ imgFile instanceof FileList && imgFile[0] ?
            URL.createObjectURL(imgFile[0])
          : defaultImg
          }
          className="object-contain z-20 sm:p-10"
          alt="Project poster"
          fill
          sizes="(max-width: 512px) 100vw"   
        />
      }   
    </div>
  ) : <div />
}

export default ImgUploadForm;