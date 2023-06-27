"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { FormProps } from "./InputForm";
import Image from "next/image";



const ImgUploadForm = ({ label, errorText }: Pick<FormProps, "label" | "errorText">) => {

    const { register, setValue, watch, formState: { errors }} = useFormContext();
    
    const file: FileList | null = watch(label, null)
    const imageFile = file?.[0]
    
    console.log("IMGcheck", imageFile);

    // function handleChangeImage (event: React.ChangeEvent<HTMLInputElement>) {
    //     event.preventDefault();
    //     const file = event.target.files?.[0];
    //     console.log("file check", file);

    //     if(file && file.length !== 0) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             const result = reader.result as string;
    //             setValue(label, result);
    //         }
    //     } else {
    //         setValue(label, null);
    //     }
    // };

    function convertToBase64 (file: File): Promise<string> {
      return new Promise((resolve, reject) => {
          const reader = new FileReader(); 
          reader.readAsDataURL(file);

          reader.onload = () => {
          resolve(reader.result as string)
          }
          reader.onerror = (error) => {
          reject(error)
          }
      })
    }
        


  return (
    <div className="relative inputField h-[175px] lg:h-[250px] mb-3 bg-[#ffffff]">
      <label className="flex justify-center items-center w-full h-full z-10 p-20" htmlFor={label}>
        {(!file || !file.length) && "Image for project presentation"}
      </label>    
      <input
          className="absolute z-30 inset-0 opacity-0 cursor-pointer"
          id={label}
          {...register(label, {
            // onChange: handleChangeImage, 
            required: true 
          })}       
          type="file"
          accept="image/*"
      />
      { imageFile &&
        <Image 
          src={URL.createObjectURL(imageFile)}
          className="object-contain z-20 sm:p-10"
          alt="Project poster"
          fill   
        />
      }
     
     <span className="text-sm text-red-500 dark:text-red-400 mb-2">
      {errors[label] && errorText}
     </span>
   </div>
  )
}

export default ImgUploadForm;