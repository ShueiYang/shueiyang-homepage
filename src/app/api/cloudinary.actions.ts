import { ImageProps } from "@root/common.types";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function uploadImage(
  image: string,
  folderPath: string,
  publicId?: string,
): Promise<ImageProps> {
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
  const result = await cloudinary.uploader.upload(image, {
    folder: folderPath,
    public_id: "preview",
  });
  const { public_id, folder, secure_url } = result;
  return {
    public_id,
    folder,
    secure_url,
  };
}

export async function deleteImage(folderPath: string) {
  // delete image in the specific foler
  await cloudinary.api.delete_resources_by_prefix(folderPath);
  // than delete the empty folder...
  await cloudinary.api.delete_folder(folderPath);
}
