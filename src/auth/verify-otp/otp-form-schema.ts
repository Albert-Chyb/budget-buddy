import { z } from 'zod';

export const OTPFormSchema = z.object({
  otp: z.string().length(6, { message: 'Musisz wpisać wszystkie 6 cyfr' }),
});

export type OTPFormValue = z.infer<typeof OTPFormSchema>;
