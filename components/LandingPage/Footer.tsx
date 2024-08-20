import { Disclosure } from "@headlessui/react";

export default function Footer() {
  return (
    <Disclosure as="nav" className="bg-[#1F2937]  text-white w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-16 justify-between w-full">
          <div className="flex w-full text-center items-center justify-center">
            Copyright @ Rob Shirley 2024
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
