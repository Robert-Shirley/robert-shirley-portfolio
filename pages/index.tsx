import Card from "@/components/shared/Card";

import projects from "@/data/projects";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const [selectedImage, setSelectedImage] = useState(0);
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

  return project.showImages ? (
    <Link href={project.link} className="w-full h-full">
      <Card className="h-full flex flex-col justify-start items-start">
        <div className="w-full h-full flex items-center justify-start flex-col">
          <div className="text-2xl font-bold mt-4">{project.name}</div>
          <p className="mt-2 text-center text-gray-700 max-w-lg">
            {project.description}
          </p>
          <div className="my-8">
            <div
              onClick={(e) => {
                e.preventDefault();
                window.open(project.odinLink, "_blank");
              }}
              className="text-md font-light underline text-gray-700 cursor-pointer"
            >
              View in the Odin Project
            </div>
          </div>
          <h1 className="text-center text-lg text-gray-500">Project Images</h1>

          {project.images && project.images.length > 0 && (
            <div className="relative w-48 h-48 xl:w-96 xl:h-96">
              <Image
                onClick={(e) => e.preventDefault()}
                src={project.images[selectedImage]}
                alt={project.name}
                fill
                className="object-cover rounded-lg cursor-default"
              />
              <div className="absolute inset-0 rounded-lg border border-gray-200 pointer-events-none" />
              <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevImage();
                }}
              >
                <ChevronLeftIcon className="h-5 w-5 text-white" />
              </div>
              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextImage();
                }}
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
    </Link>
  ) : (
    <div className="w-full h-full">
      <Card className="h-full flex flex-col">
        <div className="w-full h-full flex items-center justify-start flex-col">
          <div className="text-2xl font-bold mt-4">{project.name}</div>
          <p className="mt-2 text-center text-gray-700 max-w-lg">
            {project.description}
          </p>
          <div className="my-8">
            <div
              onClick={(e) => {
                e.preventDefault();
                window.open(project.odinLink, "_blank");
              }}
              className="text-md font-light underline text-gray-700 cursor-pointer"
            >
              View in the Odin Project
            </div>
          </div>
          <Link
            href={project.link}
            className="text-blue-500 font-bold text-xl cursor-pointer"
          >
            View Project
          </Link>
          <h1 className="text-center my-2 text-lg text-gray-500">Or</h1>
          <h1 className="text-center text-2xl text-orange-500 mb-2 italic rounded-lg  px-2 ">
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
    <Card>
      <div>
        <h1 className="text-4xl text-center text-blue-500">Hello World</h1>

        <p className="text-center text-gray-500">
          These are some projects that I&apos;ve done as part of the Odin
          Project
        </p>
        <p className="text-center text-gray-700 italic text-lg">
          You can click on a card to view the project, view the images, or
          interact with the components below.
        </p>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {projects &&
            projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
        </div>
      </div>
    </Card>
  );
}
