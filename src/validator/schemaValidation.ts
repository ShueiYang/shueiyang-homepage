import { z } from "zod";

export const AdminFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string(),
});

export const EmailFormSchema = z.object({
  name: 
    z.string().min(1, { message: "Un nom est requis" }),
  email: 
    z.string().email({ message: "Adresse email manquante ou invalid" }),
  subject: 
    z.string().min(1, { message: "Un sujet est requis" }),
  message: 
    z.string().min(1, { message: "Veuillez écrire un message avant l'envoi" }),
});

export const ProjectFormSchema = z.object({
  id: 
    z.string().optional(),
  title: 
    z.string().min(1, { message: "Un titre est requis" }),
  imageFile: 
    z.union([z.instanceof(FileList), z.string()]).nullable(),
  description: 
    z.string().min(8, { message: "Une description doit comporter au moins 8 caractères" }),
  siteUrl: 
    z.string().url({ message: "SiteUrl manquant ou invalid" }),
  githubUrl: 
    z.string().url({ message: "Source code url manquant ou invalid" }),
  stack: 
    z.string().min(3, { message: "Le stack doit comporter au moins 3 caractères" }),
  content: 
    z.string().min(1, { message: "Le contenu est requis" }),
});
