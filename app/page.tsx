import Image from "next/image";
import Link from "next/link";

import { PropertyInquiryForm } from "@/components/forms/PropertyInquiryForm";

const Home = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/7apartamentov-logo.svg"
            height={32}
            width={162}
            alt="7Apartamentov"
            className="mb-12 h-10 w-fit"
          />

          <PropertyInquiryForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 7Apartamentov
            </p>
            <Link href="/admin" className="text-green-500">
              Админ
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="https://images.unsplash.com/photo-1513326738677-b964603b136d"
        height={1000}
        width={1000}
        alt="Moscow Real Estate"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
