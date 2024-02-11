import { ProjectForm } from "@root/common.types";
import { FieldsProps } from "@/components/ProjectForm";
import { processImage } from "./imageTool";

export async function convertRawDataToFormData(
  data: ProjectForm,
  dirtyFields: FieldsProps,
): Promise<FormData> {
  const formData = new FormData();
  const formField = Object.entries(data);

  await Promise.all(
    formField.map(async ([key, value]) => {
      // check if the value is a FileList instance and if there is a file in FileList.
      if (key === "imageFile") {
        if (value instanceof FileList && value.length) {
          const result = await processImage(value[0] as File);
          formData.append(key, result);
        }
        // only append data if is modified in the input value
      } else if (dirtyFields[key as keyof ProjectForm]) {
        formData.append(key, value);
      }
      return null;
    }),
  );
  return formData;
}
