import { XIcon } from "lucide-react"; // Adjust the import path according to your setup
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

type DrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
  secondaryTitle?: string;
};

export default function MyDrawer({
  open,
  setOpen,
  children,
  title,
  secondaryTitle,
}: DrawerProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="w-screen max-w-5xl">
        <DrawerHeader className="flex items-start justify-between p-4 xl:px-8">
          <div>
            <DrawerTitle className="text-2xl font-bold leading-6 text-gray-900">
              {title}{" "}
              {secondaryTitle && (
                <span className="text-gray-400">{secondaryTitle}</span>
              )}
            </DrawerTitle>
          </div>
          <DrawerClose asChild>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-3 flex h-7 items-center bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close panel</span>
              <XIcon className="h-6 w-6 text-black" aria-hidden="true" />
            </button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex h-full flex-col overflow-y-scroll bg-white py-8 shadow-xl">
          <div className="relative flex-1 px-4 xl:px-8">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
