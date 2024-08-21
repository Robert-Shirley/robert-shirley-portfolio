import Calculator from "@/components/Calculator/Calculator";
import EtchASketch from "@/components/EtchASketch/EtchASketch";
import RockPaperScissors from "@/components/RockPaperScissors/RockPaperScissors";
import Card from "@/components/shared/Card";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    id: 1,
    name: "Recipes",
    description: "A simple recipe app with images, lists, and navigation",
    link: "/projects/recipes",
    odinLink: "https://www.theodinproject.com/lessons/foundations-recipes",
    images: [
      "/images/projects/recipeIndex.png",
      "/images/projects/recipePage.png",
      "/images/projects/recipeIndex2.png",
      "/images/projects/recipeIndex3.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
  },
  {
    id: 2,
    name: "Landing Page",
    description:
      "A simple landing page with a header/navbar, hero section, images, quote, call to action, and a footer.",
    link: "/projects/landing-page",
    odinLink: "https://www.theodinproject.com/lessons/landing-page",
    images: [
      "/images/projects/landingIndex.png",
      "/images/projects/landingIndex2.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
  },
  {
    id: 3,
    name: "Rock Paper Scissors",
    description: "A simple rock paper scissors game with a win/loss counter",
    link: "/projects/rock-paper-scissors",
    odinLink:
      "https://www.theodinproject.com/lessons/foundations-rock-paper-scissors",
    showComponent: true,
    component: <RockPaperScissors isComponent={true} />,
    showImages: false,
    images: [],
  },
  {
    id: 4,
    name: "Etch a Sketch",
    description:
      "A cool etch a sketch app with a customizable grid size, color mode, and mode toggle (coloring/not coloring)",
    link: "/projects/etch-a-sketch",
    odinLink:
      "https://www.theodinproject.com/lessons/foundations-etch-a-sketch",
    showComponent: true,
    component: <EtchASketch isComponent={true} />,
    showImages: false,
    images: [],
  },
  {
    id: 5,
    name: "Calculator",
    description:
      "A sleek and responsive calculator app, designed with TailwindCSS, offering essential arithmetic operations and seamless decimal handling",
    link: "/projects/calculator",
    odinLink: "https://www.theodinproject.com/lessons/foundations-calculator",
    showComponent: true,
    component: <Calculator isComponent={true} />,
    showImages: false,
    images: [],
  },
  {
    id: 6,
    name: "Sign Up Form",
    description:
      "A modern sign up and login forms with validation and error messages",
    link: "/projects/sign-up-form/sign-up",
    odinLink: "https://www.theodinproject.com/lessons/foundations-recipes",
    images: [
      "/images/projects/signUpIndex.png",
      "/images/projects/signUpIndex2.png",
      "/images/projects/signUpIndex3.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
  },
];

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
      <Card className="h-full flex flex-col">
        <div className="w-full h-full flex items-center justify-center flex-col">
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
      </Card>
    </Link>
  ) : (
    <div className="w-full h-full">
      <Card className="h-full flex flex-col">
        <div className="w-full h-full flex items-center justify-center flex-col">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects &&
            projects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
        </div>
      </div>
    </Card>
  );
}
