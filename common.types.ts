import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  AdminFormSchema,
  EmailFormSchema,
  ProjectFormSchema,
} from "@/validator/schemaValidation";

// create a type to include relational images props using Prisma built-in utility...
export interface ProjectData
  extends Prisma.ProjectGetPayload<{
    include: {
      images: true;
    };
  }> {}

export type AdminForm = z.infer<typeof AdminFormSchema>;

export type EmailForm = z.infer<typeof EmailFormSchema>;

export type ProjectForm = z.infer<typeof ProjectFormSchema>;

export interface ImageProps {
  public_id: string;
  folder: string;
  secure_url: string;
}

export interface ValidateForm {
  titleName: string;
}

export type ActionProps = {
  error: string | null;
};
