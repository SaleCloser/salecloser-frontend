import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Nepravilno unesen e-mail")
    .min(1, "Unesite vašu e-mail adresu"),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 karaktera"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
