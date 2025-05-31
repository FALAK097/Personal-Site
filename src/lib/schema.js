import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(10, {
    message: "Subject must be at least 10 characters long.",
  }),
  message: z.string().min(32, {
    message: "Message must be at least 32 characters long.",
  }),
});
