"use client";

import Card from "@/components/shared/Card";

import projects from "@/data/projects";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  link: string;
  images?: string[];
  odinLink: string;
  showImages?: boolean;
  showComponent?: boolean;
  component?: JSX.Element | null;
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
            className="text-blue-500 font-bold text-xl cursor-pointer mt-4 underline"
          >
            Try It Out
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
          <p className="mt-2 text-center text-gray-700 max-w-lg">
            {project.description}
          </p>
          <Link
            href={project.link}
            className="text-blue-500 font-bold text-xl cursor-pointer mt-4 underline"
          >
            Try It Out
          </Link>
          <h1 className="text-center my-2 text-lg text-gray-500">Or</h1>
          <h1 className="text-center text-2xl text-orange-500 mb-2 italic rounded-lg px-2">
            Interact Below!
          </h1>
          {project.showComponent && project.component}
        </div>
        {project.techStack && project.techStack.length > 0 && (
          <TechStack techStack={project.techStack} />
        )}
      </Card>
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 xl:p-10 flex flex-col border border-gray-200">
      <div>
        <h1 className="text-4xl text-center text-blue-500">Hello World</h1>
        <p className="text-center text-gray-500">
          These are some projects that I&apos;ve done. I hope you enjoy!
        </p>
        <p className="text-center text-gray-700 italic text-lg">
          You can click on &quot;Try It Out&quot; on a card to view the project,
          view the images (click to enlarge), or interact with some of the
          projects below.
        </p>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {projects &&
            projects.map((project) => (
              <div key={project.id} className="md:animate-fadeInUp flex">
                <ProjectRow project={project} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
