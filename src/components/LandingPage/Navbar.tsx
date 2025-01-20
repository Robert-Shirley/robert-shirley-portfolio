import classNames from "@/functions/classNames";
import { useToast } from "@/hooks/use-toast";
import { Disclosure } from "@headlessui/react";

export default function Navbar() {
  const { toast } = useToast();
  return (
    <Disclosure as="nav" className="bg-[#1F2937]  text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex h-16 justify-between w-full">
          <div className="flex w-full">
            <div className="sm:ml-6 sm:flex sm:space-x-8 justify-start w-full mr-24 items-center">
              <h1
                className="text-3xl cursor-pointer"
                onClick={() => {
                  // toast.success("Logo Clicked, but this isn't a real link");
                  toast({
                    title: "Logo Clicked",
                    description: "This would take you to the homepage",
                  });
                }}
              >
                Awesome Logo Here
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 justify-end w-full mr-24">
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <div
                onClick={() => {
                  // toast.success(
                  //   "Dashboard Clicked, but this isn't a real link"
                  // );
                  toast({
                    title: "Dashboard Clicked",
                    description: "This would take you to the dashboard",
                  });
                }}
                className={classNames(
                  "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium"
                )}
              >
                <span className="cursor-pointer"> Dashboard</span>
              </div>
              <div
                onClick={() => {
                  // toast.success("Link 2 Clicked, but this isn't a real link");
                  toast({
                    title: "Link 2 Clicked",
                    description: "This would take you to a page called Link 2",
                  });
                }}
                className={classNames(
                  "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium"
                )}
              >
                Link 2
              </div>
              <div
                onClick={() => {
                  // toast.success("Link 3 Clicked, but this isn't a real link");
                  toast({
                    title: "Link 3 Clicked",
                    description: "This would take you to a page called Link 3",
                  });
                }}
                className={classNames(
                  "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium"
                )}
              >
                Link 3
              </div>
              <div
                onClick={() => {
                  // toast.success("Settings Clicked, but this isn't a real link");
                  toast({
                    title: "Settings Clicked",
                    description: "This would take you to the settings page",
                  });
                }}
                className={classNames(
                  "cursor-pointer inline-flex items-center px-1 pt-1 text-sm font-medium"
                )}
              >
                Settings
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
