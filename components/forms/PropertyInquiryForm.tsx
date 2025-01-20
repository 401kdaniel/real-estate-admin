"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createInquiry } from "@/lib/actions/inquiry.actions";
import { PropertyInquiryValidation } from "@/lib/validations";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PropertyInquiryForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PropertyInquiryValidation>>({
    resolver: zodResolver(PropertyInquiryValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyType: "",
      budget: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PropertyInquiryValidation>) => {
    setIsLoading(true);

    try {
      const inquiry = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        propertyType: values.propertyType,
        budget: values.budget,
        location: values.location,
      };

      const newInquiry = await createInquiry(inquiry);

      if (newInquiry) {
        router.push(`/inquiries/${newInquiry.$id}/confirmation`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Здравствуйте 👋</h1>
          <p className="text-dark-700">Найдите идеальную недвижимость в Москве</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="ФИО"
          placeholder="Иван Иванов"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="ivan@mail.ru"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Номер телефона"
          placeholder="+7 (999) 123-4567"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="propertyType"
          label="Тип недвижимости"
          placeholder="Выберите тип"
          options={[
            { value: "apartment", label: "Квартира" },
            { value: "house", label: "Дом" },
            { value: "commercial", label: "Коммерческая недвижимость" },
          ]}
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="budget"
          label="Бюджет (₽)"
          placeholder="15,000,000"
          iconSrc="/assets/icons/money.svg"
          iconAlt="budget"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="location"
          label="Предпочитаемый район"
          placeholder="Арбат"
          iconSrc="/assets/icons/location.svg"
          iconAlt="location"
        />

        <SubmitButton isLoading={isLoading}>Отправить заявку</SubmitButton>
      </form>
    </Form>
  );
}; 