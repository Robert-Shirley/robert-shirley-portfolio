import Calculator from "@/components/Calculator/Calculator";
import EtchASketch from "@/components/EtchASketch/EtchASketch";
import RockPaperScissors from "@/components/RockPaperScissors/RockPaperScissors";
import Card from "@/components/shared/Card";
import TicTacToe from "@/components/TicTacToe/TicTacToe";
import TodoList from "@/components/TodoApp/TodoList";
import WeatherApp from "@/components/WeatherApp/WeatherApp";

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
    techStack: [
      "NextJS",
      "TailwindCSS",
      "NextJS Router",
      "TypeScript",
      "NextJS Image",
    ],
  },
  {
    id: 2,
    name: "Landing Page",
    description:
      "A simple landing page with a header/navbar, hero section, images, quote, call to action, and a footer.",
    link: "/projects/landing-page",
    odinLink: "https://www.theodinproject.com/lessons/foundations-landing-page",
    images: [
      "/images/projects/landingIndex.png",
      "/images/projects/landingIndex2.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
    techStack: [
      "NextJS",
      "TailwindCSS",
      "NextJS Image",
      "TypeScript",
      "React Hot Toast",
    ],
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
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Hot Toast",
      "React Components",
      "React Hooks",
    ],
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
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Components",
      "React Hooks",
    ],
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
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Components",
      "React Hooks",
    ],
  },
  {
    id: 6,
    name: "Sign Up Form",
    description:
      "A modern sign up and login forms with validation and error messages",
    link: "/projects/sign-up-form/sign-up",
    odinLink:
      "https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-sign-up-form",
    images: [
      "/images/projects/signUpIndex.png",
      "/images/projects/signUpIndex2.png",
      "/images/projects/signUpIndex3.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Hook Form",
      "ShadCN Components",
      "React Hot Toast",
      "NextJS Router",
    ],
  },
  {
    id: 7,
    name: "Admin Page",
    description:
      "A modern and mobile friendly admin page with a navigation sidebar, navbar, customizable project cards with icons, and a site information section",
    link: "/projects/admin-page",
    odinLink:
      "https://www.theodinproject.com/lessons/node-path-intermediate-html-and-css-admin-dashboard",
    images: [
      "/images/projects/adminIndex.png",
      "/images/projects/adminIndex2.png",
      "/images/projects/adminIndex3.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Hot Toast",
      "React Icons",
      "NextJS Router",
      "React Components",
    ],
  },
  {
    id: 8,
    name: "Library",
    description:
      "A cool library app that allows you to add, remove, and toggle read status of books. The project uses local storage to persist data. There is a user friendly drawer component that allows you to add a new book.",
    link: "/projects/library",
    odinLink:
      "https://www.theodinproject.com/lessons/node-path-javascript-library",
    images: [
      "/images/projects/libraryIndex.png",
      "/images/projects/libraryIndex2.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Icons",
      "React Hook Form",
      "React Hot Toast",
      "NextJS Router",
      "Local Storage",
      "Custom React Hooks",
    ],
  },

  {
    id: 9,
    name: "Tic Tac Toe",
    description:
      "A fun and interactive tic tac toe game with a two difficulties, easy and impossible. The impossible difficulty uses recursion and a minimax algorithm to ensure the computer never loses.",
    link: "/projects/tic-tac-toe",
    odinLink:
      "https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe",
    images: [],
    showImages: false,
    showComponent: true,
    component: (
      <Card>
        <TicTacToe />
      </Card>
    ),
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Components",
      "React Hooks",
      "React Hot Toast",
    ],
  },
  {
    id: 10,
    name: "Todo List",
    description:
      "A simple todo list app that allows you to add, remove, and toggle completion of tasks. The app uses local storage to persist data. There is a due date feature that allows you to set a due date for each task.",
    link: "/projects/todo-app",
    odinLink:
      "https://www.theodinproject.com/lessons/node-path-javascript-todo-list",
    images: [],
    showImages: false,
    showComponent: true,
    component: (
      <Card>
        <TodoList />
      </Card>
    ),
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Components",
      "React Hooks",
      "Local Storage",
      "Conditional Rendering",
      "Date Fns",
    ],
  },
  {
    id: 11,
    name: "Weather App",
    description:
      "A simple weather app that allows you to search for the weather in a location. The app uses the Visual Crossing Weather API to fetch weather data.",
    link: "/projects/weather-app",
    odinLink:
      "https://www.theodinproject.com/lessons/node-path-javascript-weather-app",
    images: [],
    showImages: false,
    showComponent: true,
    component: (
      <Card>
        <WeatherApp />
      </Card>
    ),
    techStack: [
      "NextJS",
      "TailwindCSS",
      "TypeScript",
      "React Components",
      "React Hooks",
      "NextJS API Routes",
      "Visual Crossing Weather API",
      ".env",
    ],
  },
];

export default projects;
