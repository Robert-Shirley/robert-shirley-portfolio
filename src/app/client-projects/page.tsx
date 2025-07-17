"use client";

import Card from "@/components/shared/Card";

import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

type Project = {
  id: number;
  link: string;
  name: string;
  description: string;
  images?: string[];
  showImages?: boolean;
  techStack: string[];
};

const TechStack = ({ techStack }: { techStack: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t">
      {techStack.map((tech) => (
        <div
          key={tech}
          className="px-2 py-1 bg-gray-200 rounded-md text-gray-600 text-xs"
        >
          {tech}
        </div>
      ))}
    </div>
  );
};

const ProjectRow = ({ project }: { project: Project }) => {
  const [selectedImage, setSelectedImage] = useState(0); // For carousel
  const [modalImage, setModalImage] = useState(0); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const imageCount = project.images?.length || 0;

  const handleNextImage = () => {
    setSelectedImage((prevIndex) =>
      project.images && prevIndex < project.images.length - 1
        ? prevIndex + 1
        : 0
    );
  };

  const handlePrevImage = () => {
    setSelectedImage((prevIndex) =>
      project.images && prevIndex > 0 ? prevIndex - 1 : imageCount - 1
    );
  };

  const openModal = (index: number) => {
    setModalImage(index); // Set modal image separately
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleModalNextImage = () => {
    setModalImage((prevIndex) =>
      project.images && prevIndex < project.images.length - 1
        ? prevIndex + 1
        : 0
    );
  };

  const handleModalPrevImage = () => {
    setModalImage((prevIndex) =>
      project.images && prevIndex > 0 ? prevIndex - 1 : imageCount - 1
    );
  };

  return project.showImages ? (
    <div className="w-full h-full">
      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-full md:h-auto p-4 md:p-10">
                  {/* Close Button */}
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    ✕
                  </button>

                  {/* Image Display */}
                  {project.images && (
                    <div className="relative w-full h-full flex justify-center items-center">
                      <div className="w-full md:w-auto h-auto">
                        <Image
                          src={project.images[modalImage]}
                          alt={`${project.name} enlarged`}
                          width={800}
                          height={600}
                          className="object-contain rounded-lg"
                          quality={90}
                        />
                      </div>

                      {/* Modal Navigation */}
                      <button
                        onClick={handleModalPrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 focus:outline-none"
                      >
                        <ChevronLeftIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={handleModalNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 focus:outline-none"
                      >
                        <ChevronRightIcon className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Card with Images */}
      <Card className="h-full flex flex-col justify-start items-start">
        <div className="w-full h-full flex items-center justify-start flex-col">
          <div className="text-2xl font-bold mt-4">{project.name}</div>
          <Link
            href={project.link}
            className="mt-2 text-blue-500 hover:underline"
          >
            View Project
          </Link>

          <p className="mt-2 text-center text-gray-700 max-w-lg">
            {project.description}
          </p>
          <h1 className="text-center text-lg text-gray-500 mt-4">
            Project Images (Click to Enlarge)
          </h1>
          {project.images && project.images.length > 0 && (
            <div className="relative w-48 h-48 xl:w-96 xl:h-80 mt-4">
              {project.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${project.name} image ${index + 1}`}
                  fill
                  className={`${
                    index === selectedImage
                      ? "object-contain cursor-pointer"
                      : "hidden"
                  } rounded-lg bg-white`}
                  quality={90}
                  priority={index === 0}
                  onClick={() => openModal(index)} // Open modal on click
                />
              ))}
              <div className="absolute inset-0 rounded-lg border border-gray-200 pointer-events-none" />
              <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
                onClick={handlePrevImage}
              >
                <ChevronLeftIcon className="h-5 w-5 text-white" />
              </div>
              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
                onClick={handleNextImage}
              >
                <ChevronRightIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
        </div>
        {project.techStack && project.techStack.length > 0 && (
          <TechStack techStack={project.techStack} />
        )}
      </Card>
    </div>
  ) : (
    <div className="w-full h-full">
      <Card className="h-full flex flex-col">
        <div className="w-full h-full flex items-center justify-start flex-col">
          <div className="text-2xl font-bold mt-4">{project.name}</div>
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-500 hover:underline"
            >
              View
            </Link>
          )}
          <p className="mt-2 text-center text-gray-700 max-w-lg">
            {project.description}
          </p>
        </div>
        {project.techStack && project.techStack.length > 0 && (
          <TechStack techStack={project.techStack} />
        )}
      </Card>
    </div>
  );
};

export default function Home() {
  const projects: Project[] = [
    {
      id: 6,
      name: "UVU BCBA Fieldwork Tracker",
      link: "https://www.uvu-bcba-tracker.com/",
      description:
        "A specialized academic tracking platform built in collaboration with Utah Valley University to streamline the fieldwork requirements for BCBA (Board Certified Behavior Analyst) students. Developed as the sole developer working directly with a UVU professor, this platform addresses the critical need for accurate hour tracking and compliance documentation in behavioral analysis certification programs. Features include comprehensive fieldwork hour tracking, automated form generation, monthly progress reporting, supervision form management with custom supervisor links, and requirements tracking to ensure program completion. The system supports both authenticated users and guest access, with secure data encryption and automated email notifications to facilitate seamless communication between students and supervisors.",
      images: [],
      showImages: false,
      techStack: [
        "NextJS 15",
        "PostgreSQL",
        "TailwindCSS",
        "Resend",
        "Node.js",
        "Drizzle ORM",
        "Authentication",
        "Encryption",
      ],
    },
    {
      id: 7,
      name: "HelpCloud Ecommerce Platform",
      link: "https://www.helpcloud.com/",
      description:
        "A comprehensive ecommerce platform built for HelpCloud, a leading remote tech support company established in 2012. As the sole developer, I created a modern web solution to showcase their dual focus on business-to-consumer remote support and business-to-business IT solutions. The platform features integrated payment processing through Qualpay, automated email communications, and a robust content management system to highlight their flagship free services including HelpCloud Search and HelpCloud Learning Center. The site serves as both a service showcase and transaction platform, supporting HelpCloud's mission to provide accessible remote technical support across consumer and enterprise markets.",
      images: [],
      showImages: false,
      techStack: [
        "PayloadCMS",
        "NextJS",
        "TailwindCSS",
        "Custom CSS",
        "Resend",
        "Qualpay",
      ],
    },
    {
      id: 8,
      name: "Wasatch Covers Time Tracking App",
      link: "",
      description:
        "A dedicated employee time tracking application developed for Wasatch Covers to streamline payroll management and workforce monitoring. This intuitive platform allows employees to clock in and out, track hours across different projects, and manage time-off requests with ease. Built with a modern tech stack featuring Nuxt.js for optimal performance and Material-UI for consistent user experience, the application integrates seamlessly with Wasatch Covers' existing CRM system and ecommerce platforms. The system provides real-time reporting for managers, automated payroll calculations, and comprehensive time analytics, creating a unified ecosystem that connects all aspects of the business operations.",
      images: [],
      showImages: false,
      techStack: [
        "Nuxt.js",
        "Supabase",
        "Material-UI",
        "Vue.js",
        "PostgreSQL",
        "Real-time Database",
      ],
    },
    {
      id: 9,
      name: "PowerlineCX Website",
      link: "https://www.powerlinecx.com/",
      description:
        "The official website for PowerlineCX, a premium U.S.-based BPO provider specializing in in-office customer support solutions. Developed to showcase their services, mission, and story, the site emphasizes quality, trust, and professionalism. As the sole developer, I built the platform from the ground up using Payload CMS and Next.js 15 App Router to deliver a modern, scalable content management system. The frontend features dynamic content blocks, custom components, responsive Tailwind-based design, and integrated CMS editing tools. This project ensures the PowerlineCX brand is represented with a polished, maintainable, and performant digital presence.",
      images: [],
      showImages: false,
      techStack: [
        "NextJS 15",
        "Payload CMS",
        "TailwindCSS",
        "Node.js",
        "TypeScript",
        "Custom Components",
        "App Router",
        "Dynamic Content Blocks",
      ],
    },
  ];
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 xl:p-10 flex flex-col border border-gray-200">
      <div>
        <h1 className="text-4xl text-center text-blue-500">
          Work for My Clients
        </h1>

        <div className="flex justify-center">
          <p className=" text-gray-700 w-2/3 text-lg text-left pt-4">
            I have had the privilege of working on a variety of projects for my
            clients, utilizing a diverse set of technologies to deliver
            high-quality solutions.
          </p>
        </div>
        <p className="text-center text-gray-700 italic text-lg">
          The repositories for these sites are private, so I can&apos;t show the
          code. However, I can discuss the technologies used.
        </p>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {projects &&
            projects.map((project, index) => (
              <div key={project.id} className="md:animate-fadeInUp flex">
                <ProjectRow project={project} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
