import { GitContributions } from "@/components/About/GitContributions";
import { Code, Gamepad2, Github, Monitor, Mountain, Tent } from "lucide-react";
import Link from "next/link";

const AboutMe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="relative h-96 overflow-hidden">
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

        <div className="relative flex items-center h-full max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="https://github.com/Robert-Shirley.png"
                  alt="Your Name"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Intro Text */}
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">
                Hey, I&apos;m Robert Shirley 👋
              </h1>
              <p className="text-xl opacity-90 max-w-xl">
                I&apos;m a fullstack developer who loves working with startups
                and small teams because I get to see the direct impact of my
                work on people&apos;s lives. There&apos;s something special
                about building something that makes someone&apos;s day a little
                better, even in small ways.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold">My Core Skills</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
              ].map((tech) => (
                <div
                  key={tech}
                  className="bg-blue-50 rounded-lg p-3 text-center text-blue-800"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Current Focus */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Monitor className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold">Currently</h2>
            </div>
            <p className="text-gray-600 mb-4">
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

        {/* Passions Section */}
        <h2 className="text-3xl font-bold mb-8 text-center">What Drives Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Mountain className="w-12 h-12 text-green-600" />,
              title: "Rock Climbing",
              description:
                "Mostly into bouldering - it's like solving a puzzle with your whole body. It's a great way to stay fit while also giving your brain a different kind of problem to solve than coding.",
            },
            {
              icon: <Gamepad2 className="w-12 h-12 text-purple-600" />,
              title: "Game Development",
              description:
                "Working on a roguelite game with my brothers where you try to save souls who don't deserve to be in hell. It's just a passion project - we're not trying to be pro game devs, just having fun building something together.",
            },
            {
              icon: <Tent className="w-12 h-12 text-orange-600" />,
              title: "Outdoor Adventures",
              description:
                "There's nothing like disconnecting from screens and reconnecting with nature. Regular hiking and camping trips help me maintain perspective and recognize the beauty in the world around us.",
            },
          ].map((passion) => (
            <div
              key={passion.title}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:transform hover:-translate-y-1 transition-transform"
            >
              <div className="flex justify-center mb-4">{passion.icon}</div>
              <h3 className="text-xl font-bold mb-3">{passion.title}</h3>
              <p className="text-gray-600">{passion.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">My Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/professional-projects" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Professional Work
              </h3>
              <p className="text-gray-600 mb-4">
                Impact-driven solutions built at startups. See how I&apos;ve
                helped companies solve real problems and improve user
                experiences.
              </p>
              <span className="text-blue-600 group-hover:underline">
                View professional projects →
              </span>
            </div>
          </Link>

          <Link href="/client-projects" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                Client Work
              </h3>
              <p className="text-gray-600 mb-4">
                Custom solutions crafted for specific client needs. From concept
                to delivery, see how I&apos;ve helped businesses achieve their
                goals.
              </p>
              <span className="text-purple-600 group-hover:underline">
                View client projects →
              </span>
            </div>
          </Link>

          <Link href="/odin-projects" className="group">
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
        </div>

        {/* GitHub Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">My GitHub Activity</h2>
          <Link href="https://github.com/Robert-Shirley" target="_blank">
            <span className="text-gray-500 text-sm font-medium cursor-pointer">
              <Github className="w-6 h-6 inline-block mr-2" />
              <span className="text-blue-600">My Github Profile</span>
            </span>
          </Link>
          <div className="h-fit bg-gray-50 rounded-lg flex items-center justify-center">
            <GitContributions username="Robert-Shirley" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
