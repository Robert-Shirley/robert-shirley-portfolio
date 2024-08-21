import Image from "next/image";
import { useState } from "react";

type DrawerItemProps = {
  icon: string;
  text: string;
  isDrawerOpen: boolean;
};

const DrawerItem = ({ icon, text, isDrawerOpen }: DrawerItemProps) => {
  return (
    <div className="flex items-center gap-2 hover:bg-blue-400 w-full px-4 py-4 cursor-pointer">
      <div className="flex-shrink-0 ">
        <Image src={icon} alt={text} width={40} height={40} />
      </div>
      <h1 className={`text-white ml-6 ${isDrawerOpen ? "flex" : "hidden"}`}>
        {text}
      </h1>
    </div>
  );
};

const AdminPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Drawer */}
      <div
        className={`bg-blue-500 ${
          isDrawerOpen ? "w-[clamp(210px,22vw,500px)]" : "w-32"
        } transition-all duration-500 overflow-hidden`}
        onMouseEnter={() => setIsDrawerOpen(true)}
        onMouseLeave={() => setIsDrawerOpen(false)}
      >
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center gap-2 hover:bg-blue-400 w-full px-4 py-4 cursor-pointer">
            <div className="flex-shrink-0 ">
              <Image
                src="/icons/view-dashboard.svg"
                alt="Dashboard"
                width={40}
                height={40}
              />
            </div>
            <h1
              className={`text-white ml-6 ${isDrawerOpen ? "flex" : "hidden"}`}
            >
              Dashboard
            </h1>
          </div>
          {/* <div className="flex items-center gap-2 hover:bg-blue-400 w-full px-4 py-2 cursor-pointer">
            <div className="flex-shrink-0">
              <Image src="/icons/home.svg" alt="Home" width={40} height={40} />
            </div>
            <h1 className={`text-white ${isDrawerOpen ? "flex" : "hidden"}`}>
              Home
            </h1>
          </div> */}
          <DrawerItem
            icon="/icons/home.svg"
            text="Home"
            isDrawerOpen={isDrawerOpen}
          />
          {/* <div className="flex items-center gap-2 hover:bg-blue-400 w-full px-4 py-2 cursor-pointer">
            <div className="flex-shrink-0">
              <Image
                src="/icons/card-account-details.svg"
                alt="Profile"
                width={40}
                height={40}
              />
            </div>
            <h1 className={`text-white ${isDrawerOpen ? "flex" : "hidden"}`}>
              Profile
            </h1>
          </div> */}
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
          <div className="flex items-center space-x-4">
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
            <p className="text-lg font-bold">Codin with Robz</p>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex flex-grow p-6 bg-gray-100">
          <div className="w-2/3 space-y-6">
            <h3 className="text-xl font-semibold">Your Projects</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-md shadow-md">
                <h5 className="text-lg font-semibold mb-2">
                  Super Cool Project
                </h5>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  ea doloribus debitis reprehenderit? Sapiente, qui quaerat enim
                  non.
                </p>
                <div className="flex justify-end space-x-4 mt-4">
                  <Image
                    src="/icons/star-plus-outline.svg"
                    alt="Star"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icons/eye-plus-outline.svg"
                    alt="Eye"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/icons/source-branch.svg"
                    alt="Branch"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              {/* Add more project cards here */}
            </div>
          </div>

          <div className="w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h5 className="text-lg font-semibold mb-4">Site Maintenance</h5>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                veritatis commodi, sint dolore ex quidem mollitia dignissimos
                omnis odio aliquam atque repudiandae quo ducimus rerum
                accusantium voluptatem ab suscipit quis.
              </p>
            </div>
            {/* Add more content here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
