import { Code, Gamepad2, Github, Monitor, Mountain, Tent } from "lucide-react";
import Link from "next/link";

const AboutMe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - Made responsive */}
      <div className="relative min-h-[24rem] md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-90">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative flex items-center h-full max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="https://github.com/Robert-Shirley.png"
                  alt="Your Name"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Hey, I&apos;m Robert Shirley 👋
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-xl">
                I&apos;m a fullstack developer who loves working with startups
                and small teams because I get to see the direct impact of my
                work on people&apos;s lives. There&apos;s something special
                about building something that makes someone&apos;s day a little
                better, even in small ways.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Link href="https://github.com/Robert-Shirley" target="_blank">
                  <span className="text-xs md:text-sm font-medium cursor-pointer pt-8">
                    <Github className="w-5 h-5 md:w-6 md:h-6 inline-block mr-2" />
                    <span className="underline text-white">
                      My Github Profile
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Skills and Current Focus - Improved grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              <h2 className="text-xl md:text-2xl font-bold">My Core Skills</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "GraphQL",
                "Web APIs",
                "React",
                "Python",
                "TailwindCSS",
                "Node.js",
                "C++",
                "Machine Learning",
                "REST APIs",
                "SQL",
                "Docker",
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-blue-50 rounded-lg p-2 md:p-3 text-center text-blue-800 text-sm md:text-base"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Monitor className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              <h2 className="text-xl md:text-2xl font-bold">Currently</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Right now I&apos;m working on a fieldwork tracker app for the BCBA
              Masters Program at the Utah Valley University (UVU) that&apos;s
              making life easier for both students and professors. Before,
              students had to track all their stats and hours in spreadsheets -
              one wrong formula and everything would break. Now they have a
              simple app that automates the tedious stuff, and professors can
              actually see their students&apos; data without wrestling with
              mismatched spreadsheets. It&apos;s these kinds of projects that
              keep me excited about coding - when you can see how it directly
              helps people in their day-to-day work.
            </p>
          </div>
        </div>

        {/* Passions Section - Improved spacing and responsiveness */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
          What Drives Me
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
          {[
            {
              icon: (
                <Mountain className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
              ),
              title: "Rock Climbing",
              description:
                "Mostly into bouldering - it's like solving a puzzle with your whole body. It's a great way to stay fit while also giving your brain a different kind of problem to solve than coding.",
            },
            {
              icon: (
                <Gamepad2 className="w-10 h-10 md:w-12 md:h-12 text-purple-600" />
              ),
              title: "Game Development",
              description:
                "Working on a roguelite game with my brothers where you try to save souls who don't deserve to be in hell. It's just a passion project - we're not trying to be pro game devs, just having fun building something together.",
            },
            {
              icon: (
                <Tent className="w-10 h-10 md:w-12 md:h-12 text-orange-600" />
              ),
              title: "Outdoor Adventures",
              description:
                "There's nothing like disconnecting from screens and reconnecting with nature. Regular hiking and camping trips help me maintain perspective and recognize the beauty in the world around us.",
            },
          ].map((passion) => (
            <div
              key={passion.title}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center hover:transform hover:-translate-y-1 transition-transform"
            >
              <div className="flex justify-center mb-4">{passion.icon}</div>
              <h3 className="text-lg md:text-xl font-bold mb-3">
                {passion.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {passion.description}
              </p>
            </div>
          ))}
        </div>

        {/* Projects Section - Improved mobile layout */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
          My Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
          <Link href="/personal-projects" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Personal Projects
              </h3>
              <p className="text-gray-600 mb-4">
                Explore my learning journey through The Odin Project and
                personal experiments. See what I build when I&apos;m following
                my curiosity.
              </p>
              <span className="text-green-600 group-hover:underline">
                View personal projects →
              </span>
            </div>
          </Link>
          <Link href="/professional-projects" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Professional Projects
              </h3>
              <p className="text-gray-600 mb-4">
                Check out the projects I&apos;ve built for clients and
                companies. These are the real-world applications of my skills.
              </p>
              <span className="text-blue-600 group-hover:underline">
                View professional projects →
              </span>
            </div>
          </Link>
          <Link href="/client-projects" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full *:transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                Client Projects
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the projects I&apos;ve worked on for clients, where I
                apply my skills to solve real business problems.
              </p>
              <span className="text-purple-600 group-hover:underline">
                View client projects →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
