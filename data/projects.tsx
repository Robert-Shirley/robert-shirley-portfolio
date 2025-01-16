import Calculator from "@/components/Calculator/Calculator";
import EtchASketch from "@/components/EtchASketch/EtchASketch";
import RockPaperScissors from "@/components/RockPaperScissors/RockPaperScissors";
import Card from "@/components/shared/Card";
import TicTacToe from "@/components/TicTacToe/TicTacToe";
import TodoList from "@/components/TodoApp/TodoList";
import WeatherApp from "@/components/WeatherApp/WeatherApp";

const projects = [
  {
    id: 0,
    name: "E-Commerce Site",
    description:
      "This E-Commerce site is built with a modern tech stack designed for simplicity and responsiveness. The project leverages React and a custom useContext wrapper to manage global state (realtime updates to the cart from any page), ensuring efficient and scalable state management. Data is persisted through a custom local storage hook, so you won't lose your cart on a page refresh. Styling is handled with TailwindCSS, providing a sleek and responsive design. Data is fetched dynamically from the FakeStoreAPI, allowing for realistic mock data integration. The site uses Next.js for dynamic routing, enabling smooth navigation and SEO optimization. Features like interactive toasts from React Hot Toast enhance the user experience by providing real-time feedback. Overall, this stack ensures a robust and user-friendly application that's easy to extend and maintain.",
    link: "/projects/ecommerce",
    odinLink: "https://www.theodinproject.com/lessons/foundations-recipes",
    images: [
      "/images/ecommerce/Ecommerce1.png",
      "/images/ecommerce/Ecommerce2.png",
      "/images/ecommerce/Ecommerce3.png",
      "/images/ecommerce/Ecommerce4.png",
      "/images/ecommerce/Ecommerce5.png",
      "/images/ecommerce/Ecommerce6.png",
      "/images/ecommerce/Ecommerce7.png",
      "/images/ecommerce/Ecommerce8.png",
      "/images/ecommerce/Ecommerce9.png",
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
      "React Hot Toast",
      "React Context",
      "React Hooks",
      "FakeStoreAPI",
      "Dynamic Routing",
      "SEO Optimization",
      "Cart Functionality",
    ],
  },
  {
    id: 12,
    name: "CV Creator",
    description:
      "A dynamic CV creator app built with React Hook Form. Users can create customizable CVs by adding sections for personal details, skills, education, experience, projects, and certifications. The app integrates features like React Hook Form for efficient form handling and React To Print for seamless print functionality. TailwindCSS ensures a responsive and visually appealing design, while components and hooks streamline the app’s modular structure. The customization options include real-time changes to the header's font, size, and background color, showcasing attention to both functionality and user experience.",
    link: "/projects/cv-application",
    odinLink:
      "https://www.theodinproject.com/lessons/node-path-react-new-cv-application",
    images: [
      "/images/cvApplication/cvAppIndex.png",
      "/images/cvApplication/cvAppIndex2.png",
      "/images/cvApplication/cvAppIndex3.png",
    ],
    showImages: true,
    showComponent: false,
    component: null,
    techStack: [
      "NextJS",
      "TailwindCSS",
      "React Hook Form",
      "React To Print",
      "TypeScript",
      "React Components",
      "React Hooks",
      "Date Fns",
    ],
  },
  {
    id: 1,
    name: "Recipes",
    description:
      "A recipe app that lets you browse and view recipes with images, ingredient lists, and step-by-step instructions. Built using NextJS, the app leverages static generation for fast performance and Next.js Image for optimized image loading. The clean design, powered by TailwindCSS, ensures an easy and enjoyable browsing experience.",
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
      "A clean and responsive landing page featuring modular React components such as a header with navigation, a hero section, a motivational quote, a call-to-action button, and a footer. The use of reusable components makes it easy to modify content and update the site’s structure, while TailwindCSS ensures consistent and modern styling. Optimized image handling enhances performance and provides a smooth user experience.",
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
    description:
      "A simple rock-paper-scissors game. The game uses React state to track wins, losses, and previous choices, while React Hot Toast provides real-time feedback for a better user experience.",
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
      "A feature-packed Etch-a-Sketch app with customizable grid size and multiple drawing modes, including black-and-white, grayscale, random colors, and an eraser. The app also includes a toggleable coloring mode, allowing users to easily enable or disable coloring with a click.",
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
      "A sleek and responsive calculator app designed with TailwindCSS, offering essential arithmetic operations and seamless decimal handling. Users can interact with the calculator by clicking on numbers and operators, or enable keypress support to use their keyboard for input, providing a flexible and intuitive experience.",
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
