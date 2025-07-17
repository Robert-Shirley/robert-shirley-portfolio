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
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-500 hover:underline"
          >
            View
          </Link>
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
      id: 1,
      link: "https://www.nef1.org/",
      name: "National Energy Foundation Platform",
      description:
        "A nationwide educational platform connecting the National Energy Foundation with teachers to distribute energy safety learning materials to students. This comprehensive system serves thousands of users across the nation, facilitating the delivery of educational content about energy safety and conservation to classrooms nationwide.",
      images: [],
      showImages: false,
      techStack: [
        "Laravel PHP",
        "NextJS",
        "PostgreSQL",
        "TailwindCSS",
        "Docker",
        "Eloquent ORM",
        "Artisan CLI",
        "Blade Templates",
      ],
    },
    {
      id: 2,
      link: "https://www.swift-manager.com",
      name: "Wasatch Covers Custom CRM",
      description:
        "A comprehensive customer relationship management system built for Wasatch Covers, a Utah-based small business specializing in custom window well covers. This full-featured CRM handles order management, customer communications, and business operations with extensive third-party integrations including ecommerce sites, payment processing (National Processor), QuickBooks Online, Klaviyo email marketing, Call Tracking Metrics for phone/SMS, Amazon AWS, and Google services (Sheets, Maps, Places). The system seamlessly connects with WordPress/Gatsby public sites and includes a companion React Native mobile app for field technicians.",
      images: [],
      showImages: false,
      techStack: [
        "NextJS",
        "GraphQL",
        "TailwindCSS",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Codegen/Nexus",
        "React Native",
      ],
    },
    {
      id: 3,
      name: "Wasatch Covers Ecommerce Website",
      link: "https://wasatchcovers.com/",
      description:
        "A high-performance ecommerce website for Utah's leading custom window well cover manufacturer. The site showcases Wasatch Covers' industry-leading customer service and premium product offerings, featuring two distinct styles of window well covers: polycarbonate and steel options. Built with modern web technologies to deliver exceptional user experience, the platform integrates seamlessly with the company's custom CRM system and supports the business's commitment to quality with lifetime structural guarantees on all products.",
      images: [],
      showImages: false,
      techStack: [
        "Gatsby",
        "JavaScript",
        "TailwindCSS",
        "WordPress",
        "Docker",
        "Linux Servers",
      ],
    },

    {
      id: 4,
      link: "https://metacensus.org/",
      name: "MetaCensus",
      description:
        "An innovative open-access blockchain-based platform revolutionizing scientific publications' peer-review and meta-analysis processes. Built on Hyperledger Fabric to ensure transparency and inclusivity, MetaCensus democratizes scientific research by allowing anyone to submit and review papers through a structured role-based system. The platform enables comprehensive meta-analyses by aggregating and scrutinizing related research, fostering trustworthy collaboration and scientific consensus. Features include distributed peer networks, comprehensive monitoring with Prometheus and Grafana, and chaincode-as-a-service architecture for scalable smart contract deployment.",
      images: [],
      showImages: false,
      techStack: [
        "Hyperledger Fabric",
        "Node.js",
        "Docker",
        "Prometheus",
        "Grafana",
        "Chaincode",
        "Raft Consensus",
        "Certificate Authority",
        "Blockchain",
      ],
    },
    {
      id: 5,
      link: "https://knowyourforce.com/",
      name: "Know Your Force",
      description:
        "A comprehensive community engagement platform designed to bridge the communication gap between law enforcement agencies and the communities they serve. The system enables agencies to easily gather citizen feedback through SMS and QR codes after every interaction, creating transparency and accountability. Features include a secure backend system for law enforcement administrators to review and filter feedback data, and a public-facing widget that allows communities to view survey results. The platform empowers agencies to build stronger community connections while ensuring every voice is heard in creating safer, more inclusive environments.",
      images: [],
      showImages: false,
      techStack: [
        "NextJS",
        "GraphQL",
        "TailwindCSS",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Codegen/Nexus",
      ],
    },
  ];
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 xl:p-10 flex flex-col border border-gray-200">
      <div>
        <h1 className="text-4xl text-center text-blue-500">
          Professional Work
        </h1>

        <div className="flex justify-center">
          <p className=" text-gray-700 w-2/3 text-lg text-left pt-4">
            Currently, I&apos;m employed as a Software Engineer at{" "}
            <Link
              className="text-blue-600 underline"
              href="https://bootpackdigital.com/"
              target="_blank"
            >
              Bootpack Digital
            </Link>
            . Bootpack Digital is a local Utah business that creates custom
            software solutions for various clients. Since I started working
            here, I have learned and grown a ton. I&apos;ve worked a variety of
            projects, including the National Energy Foundation, Know your Force,
            Metacensus, Wasatch Covers, and more. Some of the technologies used
            are: Laravel/PHP, NextJS, GraphQL, TailwindCSS, TypeScript,
            Javascript, PostgreSQL, Prisma, Codegen/Nexus, and more. I have also
            worked with various external integrations, including a connection to
            our ecommerce sites to accept new orders, a connection to our
            payment processor (National Processor), Quickbooks online, Klaviyo
            (email provider), Call Tracking Metrics (phone and texting), AWS,
            Google Sheets, Google Maps, and Google Places.
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
