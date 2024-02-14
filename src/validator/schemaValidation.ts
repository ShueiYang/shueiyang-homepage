import { z } from "zod";

const MAX_IMAGE_SIZE = 2;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

function sizeInMB(sizeInBytes: number, decimalsNum = 2) {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
}

const imageFileValidation = z
  .custom<FileList | string>()
  .refine(
    (files) => {
      if (files instanceof FileList) {
        return Array.from(files ?? []).length !== 0;
      }
      return true;
    },
    { message: "Image is required" },
  )
  .refine(
    (files) => {
      if (files instanceof FileList) {
        return Array.from(files ?? []).every(
          (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE,
        );
      }
      return true;
    },
    { message: `The maximum image size is ${MAX_IMAGE_SIZE}MB` },
  )
  .refine(
    (files) => {
      if (files instanceof FileList) {
        return Array.from(files ?? []).every(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        );
      }
      return true;
    },
    { message: "File type is not supported" },
  );

export const AdminFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string(),
});

export const EmailFormSchema = z.object({
  name: z.string().min(1, { message: "Un nom est requis" }),
  email: z.string().email({ message: "Adresse email manquante ou invalid" }),
  subject: z.string().min(1, { message: "Un sujet est requis" }),
  message: z.string().min(1, { message: "Veuillez écrire un message avant l'envoi" }),
});

export const ProjectFormSchema = z.object({
  id: z.string().optional(),
  title: z
    .string().min(1, { message: "Un titre est requis" }),
  imageFile: 
    typeof window === "undefined"
      ? z.string().min(1, { message: "Image is required" })
      : imageFileValidation,
  description: z
    .string().min(8, { message: "Une description doit comporter au moins 8 caractères" }),
  siteUrl: z
    .string().url({ message: "SiteUrl manquant ou invalid" }),
  githubUrl: z
    .string().url({ message: "Source code url manquant ou invalid" }),
  stack: z
    .string().min(3, { message: "Le stack doit comporter au moins 3 caractères" }),
  content: z
    .string().min(1, { message: "Le contenu est requis" }),
});

export const EditFormSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  imageFile: z.string().optional(),
  description: z
    .string()
    .min(8, { message: "Une description doit comporter au moins 8 caractères" })
    .optional(),
  siteUrl: z
    .string()
    .url({ message: "SiteUrl manquant ou invalid" })
    .optional(),
  githubUrl: z
    .string()
    .url({ message: "Source code url manquant ou invalid" })
    .optional(),
  stack: z
    .string()
    .min(3, { message: "Le stack doit comporter au moins 3 caractères" })
    .optional(),
  content: z.string().optional(),
});
