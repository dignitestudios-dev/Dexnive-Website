import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(16, "Phone number must not exceed 15 digits"),
  services: z.string().min(1, "Please specify services"),
  details: z.string().min(10, "Please describe your idea"),
   terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
