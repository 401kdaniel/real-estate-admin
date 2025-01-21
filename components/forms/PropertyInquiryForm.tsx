"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from '@emailjs/browser';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

      const response = await createInquiry(inquiry);

      if (response) {
        setIsSuccess(true);
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold">Спасибо за вашу заявку!</h2>
        <p className="text-gray-600">Мы свяжемся с вами в ближайшее время.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Отправить еще одну заявку
        </button>
      </div>
    );
  }

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