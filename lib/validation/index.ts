import * as z from "zod";

export const PropertyInquiryValidation = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  phone: z.string().min(10, {
    message: "Пожалуйста, введите корректный номер телефона",
  }),
  propertyType: z.string().min(1, {
    message: "Пожалуйста, выберите тип недвижимости",
  }),
  budget: z.string().min(1, {
    message: "Пожалуйста, укажите ваш бюджет",
  }),
  location: z.string().min(1, {
    message: "Пожалуйста, укажите предпочитаемый район",
  }),
});

export type PropertyInquiry = z.infer<typeof PropertyInquiryValidation>; 