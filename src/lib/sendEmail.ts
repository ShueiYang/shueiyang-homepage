import emailjs from "@emailjs/browser";
import { EmailForm } from "../../common.types";


export function sendEmail(form: EmailForm) {
  if(
    process.env.NEXT_PUBLIC_SERVICE_ID
    && process.env.NEXT_PUBLIC_TEMPLATE_ID
    && process.env.NEXT_PUBLIC_PUBLIC_KEY
  ) {
    return emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Kim",
        from_email: form.email,
        subject: form.subject,
        message: form.message
      },
      process.env.NEXT_PUBLIC_PUBLIC_KEY,
    )  
  } else {
      throw new Error("Missing environment variables for email service");
  }
};