import Image from "next/image";
import Link from "next/link";

import { PropertyInquiryForm } from "@/components/forms/PropertyInquiryForm";
import { PasskeyModal } from "@/components/PasskeyModal";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/7apartamentov-logo.svg"
            height={1000}
            width={1000}
            alt="7Apartamentov"
            className="mb-12 h-10 w-fit"
          />

          <PropertyInquiryForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 7Apartamentov
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Админ
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/moscow-realestate.jpg"
        height={1000}
        width={1000}
        alt="Moscow Real Estate"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
