import { useToast } from "@/hooks/use-toast";

const CallToAction = () => {
  const { toast } = useToast();
  return (
    <div className="min-h-80 h-fit bg-white flex text-gray-700 lg:px-48 py-12 w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl lg:mx-24 h-32 bg-blue-500 rounded-lg text-white flex items-center px-12 justify-around flex-col lg:flex-row">
          <div>
            <div>Call to action! It&apos;s time!</div>
            <span>
              Sign up for our product by clicking that button right over there!
            </span>
          </div>
          <div>
            <button
              onClick={() => {
                // toast.success("Thanks for Signing Up!");
                toast({
                  title: "Signed up!",
                  description:
                    "This would sign you up for product info in a real app",
                });
              }}
              className="text-white bg-transparent border border-white py-2 px-8 rounded-lg text-nowrap"
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
