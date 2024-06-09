import { ProjectFormData } from "@root/common.types";
import { FieldsProps } from "@/components/ProjectForm";
import { processImage } from "./imageTool";

// Type guard
function isFileList(value: unknown): value is FileList {
  return value instanceof FileList;
}

export async function convertRawDataToFormData(
  data: ProjectFormData,
  dirtyFields: FieldsProps,
): Promise<FormData> {
  const formData = new FormData();
  const formField = Object.entries(data);

  await Promise.all(
    formField.map(async ([key, value]) => {
      // check if the value is a FileList instance and if there is a file in FileList.
      if (key === "imageFile") {
        if (isFileList(value) && value.length) {
          const result = await processImage(value[0] as File);
          formData.append(key, result);
        }
        // only append data if is modified in the input value or the key is ID.
      } else if (
        value &&
        (key === "id" || dirtyFields[key as keyof ProjectFormData])
      ) {
        formData.append(key, value as string);
      }
      return null;
    }),
  );
  return formData;
}
