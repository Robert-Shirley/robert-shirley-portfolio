import Image from "next/image";
import toast from "react-hot-toast";

const LandingHero = () => {
  return (
    <div className="min-h-96 h-fit bg-[#1F2937] flex text-white lg:px-48 py-12 w-full">
      <div className="flex w-full flex-col xl:flex-row">
        <div className="xl:w-1/2 p-24 flex flex-col gap-4 justify-center">
          <h1 className="text-4xl">This website is awesome</h1>
          <p className="text-gray-300 text-sm">
            This website has some subtext that goes here under the main title.
            It&apos;s a smaller font and the color is lower contrast
          </p>
          <button
            onClick={() => {
              toast.success("Thanks for Signing Up!");
            }}
            className="text-white bg-blue-500 py-2 px-8 rounded-lg mt-4 w-fit"
          >
            Sign Up
          </button>
        </div>
        <div className="xl:w-1/2 p-24 flex flex-col gap-4 justify-center xl:items-center">
          <div>
            <Image
              alt="Generic Logo"
              src="/images/landingPage/generic-logo.jpg"
              width={400}
              height={400}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
