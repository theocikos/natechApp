import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;


const phoneRegex = /^\+[1-9][0-9]{1,14}$/;

export const recipientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  iban: z.string().regex(ibanRegex, 'Invalid IBAN format').optional(),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number format').optional(),
}).refine(
  data => data.iban || data.phoneNumber, 
  { message: 'Either IBAN or phone number is required', path: ['iban'] }
);

export const moneyTransferSchema = (userBalance: number) => z.object({
  amount: z.number()
    .positive('Amount must be greater than 0')
    .max(userBalance, `Amount cannot exceed available balance (${userBalance})`),
  recipient: recipientSchema,
  reference: z.string().max(50, 'Reference cannot exceed 50 characters').optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type MoneyTransferFormValues = z.infer<ReturnType<typeof moneyTransferSchema>>;