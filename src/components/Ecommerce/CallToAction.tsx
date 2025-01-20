"use client";

import { useToast } from "@/hooks/use-toast";

const CallToAction = () => {
  const { toast } = useToast();
  return (
    <div className="min-h-60 h-fit bg-white flex text-gray-700 px-4 lg:px-48 py-12 w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl lg:mx-24 min-h-[160px] lg:h-32 bg-emerald-500 rounded-lg text-white flex items-center p-6 lg:px-12 justify-center lg:justify-around flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="text-center lg:text-left">
            <div className="text-xl font-medium mb-2 lg:mb-1">
              Our Newsletter
            </div>
            <span className="text-sm lg:text-base">
              Sign up for our newsletter to get the latest sales and updates on
              our products!
            </span>
          </div>
          <div className="w-full lg:w-auto">
            <button
              onClick={() => {
                toast({
                  title: "Signed up!",
                  description:
                    "This would sign you up for the newsletter in a real app",
                });
              }}
              className="w-full lg:w-auto text-white bg-transparent hover:bg-white/10 transition-colors border border-white py-2 px-8 rounded-lg text-nowrap"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
