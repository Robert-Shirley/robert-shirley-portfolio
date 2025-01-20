import { FC, ReactElement } from "react";
import AboutMockSite from "./AboutMockSite";
import { Wrapper } from "./Wrapper";

export const AuthPageContainer: FC<{ children: ReactElement }> = ({
  children,
}) => {
  return (
    <main className="p-4 sm:p-8 h-[100vh] w-full">
      <div className="w-full mx-auto flex flex-col xl:flex-row h-full">
        <div className="h-fit xl:h-full flex items-center bg-black text-white justify-center rounded-xl py-10 flex-1">
          <div className="prose lg:prose-xl prose-invert px-4 lg:px-8">
            <AboutMockSite />
          </div>
        </div>

        <Wrapper>
          <div className="bg-white shadow-lg rounded-lg p-4 xl:p-16 h-fit flex flex-col border border-gray-200 items-center">
            {children}
          </div>
        </Wrapper>
      </div>
    </main>
  );
};
