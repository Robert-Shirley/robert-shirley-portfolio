"use client";

import classNames from "@/functions/classNames";
import Image from "next/image";
import { useState } from "react";

type ProjectItemProps = {
  title: string;
  description: string;
};

const ProjectItem = ({ title, description }: ProjectItemProps) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md border-l-4 border-yellow-400">
      <h5 className="text-lg font-semibold mb-2">{title}</h5>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="flex justify-end space-x-4 mt-4">
        <Image
          src="/icons/star-plus-outline.svg"
          alt="Star"
          width={24}
          height={24}
          className="cursor-pointer hover:bg-blue-100 rounded-full "
        />
        <Image
          src="/icons/eye-plus-outline.svg"
          alt="Eye"
          width={24}
          height={24}
          className="cursor-pointer hover:bg-blue-100 rounded-full"
        />
        <Image
          src="/icons/source-branch.svg"
          alt="Branch"
          width={24}
          height={24}
          className="cursor-pointer hover:bg-blue-100 rounded-full"
        />
      </div>
    </div>
  );
};

type DrawerItemProps = {
  icon: string;
  text: string;
  isDrawerOpen: boolean;
};

const DrawerItem = ({ icon, text, isDrawerOpen }: DrawerItemProps) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-2 hover:bg-blue-400 w-full px-3 py-2 mx-3 cursor-pointer transition-all duration-300"
      )}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
        <Image src={icon} alt={text} width={30} height={30} />
      </div>
      <span
        className={classNames("text-white ml-2 transition-all duration-100")}
      >
        {text}
      </span>
    </div>
  );
};

const AdminPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Drawer */}
      <div
        className={`bg-blue-500 hidden md:block w-fit `}
        onMouseEnter={() => setIsDrawerOpen(true)}
        onMouseLeave={() => setIsDrawerOpen(false)}
      >
        <div className="flex flex-col items-center">
          <div
            className={classNames(
              "flex items-center hover:bg-blue-400 w-full px-3 mt-6 cursor-pointer transition-all duration-300"
            )}
          >
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
              <Image
                src="/icons/view-dashboard.svg"
                alt="Dashboard"
                width={30}
                height={30}
              />
            </div>
            <span
              className={classNames(
                "text-white ml-2 transition-all duration-100"
              )}
            >
              Dashboard
            </span>
          </div>
          <DrawerItem
            icon="/icons/home.svg"
            text="Home"
            isDrawerOpen={isDrawerOpen}
          />
          <DrawerItem
            icon="/icons/card-account-details.svg"
            text="Profile"
            isDrawerOpen={isDrawerOpen}
          />

          <DrawerItem
            icon="/icons/android-messages.svg"
            text="Messages"
            isDrawerOpen={isDrawerOpen}
          />
          <DrawerItem
            icon="/icons/clock-outline.svg"
            text="History"
            isDrawerOpen={isDrawerOpen}
          />
          <DrawerItem
            icon="/icons/note-multiple.svg"
            text="Tasks"
            isDrawerOpen={isDrawerOpen}
          />
          <DrawerItem
            icon="/icons/account-group.svg"
            text="Communities"
            isDrawerOpen={isDrawerOpen}
          />
          <DrawerItem
            icon="/icons/cog.svg"
            text="Settings"
            isDrawerOpen={isDrawerOpen}
          />
          <DrawerItem
            icon="/icons/message-question.svg"
            text="Support"
            isDrawerOpen={isDrawerOpen}
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <div className="bg-gray-100 border-b-2 border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 w-4/5">
            <Image
              src="/icons/magnify.svg"
              alt="Search"
              width={24}
              height={24}
            />
            <input
              type="text"
              name="search"
              autoComplete="off"
              className="p-2 bg-gray-200 rounded-md outline-none w-full max-w-2xl"
              placeholder="Search..."
            />
          </div>
          <div className="md:flex items-center space-x-4 hidden">
            <Image
              src="/icons/bell-ring-outline.svg"
              alt="Notifications"
              width={24}
              height={24}
            />
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: 'url("https://github.com/codingWithRobz.png")',
              }}
            ></div>
            <p className="text-lg font-bold">Rob</p>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex flex-col xl:flex-row flex-grow p-6 bg-gray-100">
          <div className="xl:w-2/3 w-full space-y-6">
            <h3 className="text-xl font-semibold">Your Projects</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              <ProjectItem
                title="Super Cool Project"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  ea doloribus debitis reprehenderit? Sapiente, qui quaerat enim
                  non."
              />
              <ProjectItem
                title="Less Cool Project"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              officia nesciunt harum distinctio quia nisi ipsum reiciendis
              aspernatur, sunt nam. Doloremque aliquam ut culpa harum non rem
              in, cumque vitae!"
              />
              <ProjectItem
                title="Impossible App"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              officia nesciunt harum distinctio quia nisi ipsum reiciendis
              aspernatur, sunt nam. Doloremque aliquam ut culpa harum non rem
              in, cumque vitae!"
              />
              <ProjectItem
                title="Easy Peasy App"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              officia nesciunt harum distinctio quia nisi ipsum reiciendis
              aspernatur, sunt nam. Doloremque aliquam ut culpa harum non rem
              in, cumque vitae!"
              />
              <ProjectItem
                title="Money Maker"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              officia nesciunt harum distinctio quia nisi ipsum reiciendis
              aspernatur, sunt nam. Doloremque aliquam ut culpa harum non rem
              in, cumque vitae!"
              />
              <ProjectItem
                title="Ad Blocker"
                description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              officia nesciunt harum distinctio quia nisi ipsum reiciendis
              aspernatur, sunt nam. Doloremque aliquam ut culpa harum non rem
              in, cumque vitae!"
              />
            </div>
          </div>

          <div className="xl:w-1/3 w-full xl:px-8 mt-6 xl:mt-12 space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-4 xl:p-16 h-fit flex flex-col gap-6 border border-gray-200">
              <div className="bg-white border p-6 rounded-md shadow-xl">
                <h5 className="text-lg font-semibold mb-4">Site Maintenance</h5>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  veritatis commodi, sint dolore ex quidem mollitia dignissimos
                  omnis odio aliquam atque repudiandae quo ducimus rerum
                  accusantium voluptatem ab suscipit quis.
                </p>
              </div>
              <div className="bg-white border p-6 rounded-md shadow-xl">
                <h5 className="text-lg font-semibold mb-4">
                  Community Share Day
                </h5>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  veritatis commodi, sint dolore ex quidem mollitia dignissimos
                  omnis odio aliquam atque repudiandae quo ducimus rerum
                  accusantium voluptatem ab suscipit quis.
                </p>
              </div>
              <div className="bg-white border p-6 rounded-md shadow-xl">
                <h5 className="text-lg font-semibold mb-4">
                  Updated Privacy Policy
                </h5>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  veritatis commodi, sint dolore ex quidem mollitia dignissimos
                  omnis odio aliquam atque repudiandae quo ducimus rerum
                  accusantium voluptatem ab suscipit quis.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
