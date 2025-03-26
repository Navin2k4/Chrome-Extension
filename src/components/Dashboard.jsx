import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  YoutubeOutlined,
  GithubOutlined,
  CodeOutlined,
  BookOutlined,
  RocketOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  CloudOutlined,
  ApiOutlined,
  DatabaseOutlined,
  BulbOutlined,
  TeamOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  TwitterOutlined,
  InstagramOutlined,
  DesktopOutlined,
  ReadOutlined,
  LaptopOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  CalendarOutlined,
  CloudServerOutlined,
  ShopOutlined,
  MessageOutlined,
  CloudOutlined as CloudIcon,
} from "@ant-design/icons";
import { SiNextdotjs } from "react-icons/si";
import { FaReact } from "react-icons/fa";

const Dashboard = ({ darkMode }) => {
  const [runningServices, setRunningServices] = useState([]);
  useEffect(() => {
    const checkServer = async (port) => {
      try {
        const response = await fetch(`http://localhost:${port}`, {
          mode: "no-cors",
        });
        setRunningServices((prev) => [...prev, port]);
      } catch (error) {
        console.log(`Server on port ${port} is not running.`);
      }
    };

    checkServer(5173);
    checkServer(3000);
  }, []);
  const platforms = {
    coding: [
      {
        name: "GitHub",
        icon: <GithubOutlined />,
        color: "#333",
        url: "https://github.com/Navin2k4",
        description: "Your code repository",
      },
      {
        name: "GeeksForGeeks",
        icon: <DatabaseOutlined />,
        color: "#2F8D46",
        url: "https://auth.geeksforgeeks.org/user/NavinKumarMNK",
        description: "Your GfG profile",
      },
      {
        name: "HackerRank",
        icon: <SafetyCertificateOutlined />,
        color: "#2EC866",
        url: "https://www.hackerrank.com/profile/22cseb48_Navin",
        description: "Your HackerRank profile",
      },
      {
        name: "LeetCode",
        icon: <CodeOutlined />,
        color: "#FFA116",
        url: "https://leetcode.com/u/navinkumaran2004/",
        description: "Your LeetCode profile",
      },
      {
        name: "LinkedIn",
        icon: <LinkedinOutlined />,
        color: "#0A66C2",
        url: "https://www.linkedin.com/in/navin2004/",
        description: "Your professional profile",
      },
      {
        name: "Twitter",
        icon: <TwitterOutlined />,
        color: "#1DA1F2",
        url: "https://x.com/navin_2k4",
        description: "Your Twitter profile",
      },
      {
        name: "Instagram",
        icon: <InstagramOutlined />,
        color: "#E4405F",
        url: "https://www.instagram.com/navin_2k4/",
        description: "Your Instagram profile",
      },
    ],
    learning: [
      {
        name: "Canvas",
        icon: <DesktopOutlined />,
        color: "#394B58",
        url: "https://canvas.instructure.com/?login_success=1",
        description: "Your learning management system",
      },
      {
        name: "Google Classroom",
        icon: <ReadOutlined />,
        color: "#4285F4",
        url: "https://classroom.google.com/u/1/",
        description: "Your Google Classroom",
      },
      {
        name: "YouTube",
        icon: <YoutubeOutlined />,
        color: "#FF0000",
        url: "https://youtube.com",
        description: "Video tutorials & courses",
      },
      {
        name: "Coursera",
        icon: <BookOutlined />,
        color: "#0056D3",
        url: "https://coursera.org",
        description: "Online courses & certifications",
      },
    ],
    development: [
      {
        name: "Stack Overflow",
        icon: <ApiOutlined />,
        color: "#F48024",
        url: "https://stackoverflow.com",
        description: "Programming Q&A",
      },
      {
        name: "MDN Web Docs",
        icon: <FileTextOutlined />,
        color: "#0A0A0A",
        url: "https://developer.mozilla.org",
        description: "Web development documentation",
      },
      {
        name: "Dev.to",
        icon: <GlobalOutlined />,
        color: "#0A0A0A",
        url: "https://dev.to",
        description: "Developer community",
      },
      {
        name: "Docker Hub",
        icon: <CloudOutlined />,
        color: "#2496ED",
        url: "https://hub.docker.com",
        description: "Container registry",
      },
    ],
    ai: [
      {
        name: "ChatGPT",
        icon: <RobotOutlined />,
        color: "#10A37F",
        url: "https://chat.openai.com",
        description: "AI coding assistant",
      },
      {
        name: "GitHub Copilot",
        icon: <ExperimentOutlined />,
        color: "#2EA043",
        url: "https://github.com/features/copilot",
        description: "AI pair programmer",
      },
      {
        name: "Hugging Face",
        icon: <ThunderboltOutlined />,
        color: "#FFD21E",
        url: "https://huggingface.co",
        description: "AI models & datasets",
      },
      {
        name: "Kaggle",
        icon: <DatabaseOutlined />,
        color: "#20BEFF",
        url: "https://kaggle.com",
        description: "Data science & ML",
      },
    ],
    yourSites: [
      {
        name: "VCET Connect",
        icon: <TeamOutlined />,
        color: "#4A90E2",
        url: "https://vcet-connect.onrender.com/",
        description: "College community platform",
      },
      {
        name: "Skip the Doctor",
        icon: <MedicineBoxOutlined />,
        color: "#2ECC71",
        url: "https://skipthedoctor.ca/",
        description: "Healthcare platform",
      },
      {
        name: "Skip the Clinic",
        icon: <MedicineBoxOutlined />,
        color: "#2ECC71",
        url: "https://skiptheclinic.ca/",
        description: "Clinic management system",
      },
      {
        name: "HRMS System",
        icon: <UserOutlined />,
        color: "#E74C3C",
        url: "https://hrms-rwyv.onrender.com/",
        description: "Human Resource Management System",
      },
      {
        name: "Urban Uplift",
        icon: <CloudServerOutlined />,
        color: "#9B59B6",
        url: "https://themainone.onrender.com/",
        description: "Urban development platform",
      },
      {
        name: "Portfolio React",
        icon: <LaptopOutlined />,
        color: "#3498DB",
        url: "https://navinportfolio.onrender.com/",
        description: "React.js portfolio website",
      },
      {
        name: "Portfolio Next",
        icon: <LaptopOutlined />,
        color: "#3498DB",
        url: "https://navin-portfolio-nine.vercel.app/",
        description: "Next.js portfolio website",
      },
      {
        name: "Promptopia",
        icon: <BulbOutlined />,
        color: "#F1C40F",
        url: "https://evently-beige-eight.vercel.app/",
        description: "AI prompt sharing platform",
      },
      {
        name: "Eventify",
        icon: <CalendarOutlined />,
        color: "#E67E22",
        url: "https://promptopia-mauve.vercel.app/",
        description: "Event management platform",
      },
      {
        name: "Nike Landing",
        icon: <ShopOutlined />,
        color: "#000000",
        url: "https://nike-landing-site.vercel.app/#products",
        description: "Nike product showcase",
      },
      {
        name: "Your Voice",
        icon: <MessageOutlined />,
        color: "#1ABC9C",
        url: "https://navin2k4.github.io/HackOdessey/",
        description: "Voice-based platform",
      },
      {
        name: "Weather Website",
        icon: <CloudIcon />,
        color: "#3498DB",
        url: "https://navin2k4.github.io/Weather-Website/",
        description: "Weather information platform",
      },
    ],
  };

  const handleGoogleSearch = (value) => {
    if (value.trim()) {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(value)}`,
        "_blank"
      );
    }
  };

  const handleYoutubeSearch = (value) => {
    if (value.trim()) {
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          value
        )}`,
        "_blank"
      );
    }
  };

  const renderPlatformCard = (platform) => (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      key={platform.name}
      className={`block p-4 rounded-xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 hover:bg-gray-700 text-white"
          : "bg-white hover:bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className="text-2xl p-2 rounded-lg"
          style={{ backgroundColor: `${platform.color}20` }}
        >
          <span style={{ color: platform.color }}>{platform.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-300 m-0">
            {platform.name}
          </h3>
          <p
            className={`text-sm m-0 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {platform.description}
          </p>
        </div>
      </div>
    </a>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between w-full pb-6">
        {/* Greeting Section (Left) */}
        <h1
          className={`text-4xl font-extrabold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Hi Navin! 👋
        </h1>

        {/* Running Services (Right) */}
        <div className="flex ">
          {runningServices.includes(5173) && (
            <div className="flex items-center space-x-4 bg-green-500 text-white p-4 rounded-2xl shadow-lg transition-all">
              <FaReact className="text-3xl animate-pulse" />
              <span className="text-lg font-semibold">React is Running</span>
              <a
                href="http://localhost:5173"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold transition"
              >
                <span className="text-white hover:text-bold hover:underline">
                  Open
                </span>
              </a>
            </div>
          )}

          {runningServices.includes(3000) && (
            <div className="flex items-center space-x-4 bg-green-500 text-white p-4 rounded-2xl shadow-lg transition-all">
              <SiNextdotjs className="text-3xl animate-pulse" />
              <span className="text-lg font-semibold">Next.js is Running</span>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold transition"
              >
                <span className="text-white hover:text-bold hover:underline">
                  Open
                </span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div
        className={`p-6 rounded-2xl mb-12 ${
          darkMode ? "bg-gray-800" : "bg-white shadow-lg"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Google..."
              className={`w-full px-4 py-3 pl-12 rounded-xl border-2 focus:outline-none focus:border-blue-500 transition-colors ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
              }`}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleGoogleSearch(e.target.value);
                }
              }}
            />
            <SearchOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search YouTube..."
              className={`w-full px-4 py-3 pl-12 rounded-xl border-2 focus:outline-none focus:border-red-500 transition-colors ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
              }`}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleYoutubeSearch(e.target.value);
                }
              }}
            />
            <YoutubeOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="space-y-12">
        {/* Coding Platforms */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <CodeOutlined className="mr-2 text-blue-500" />
            Coding Platforms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.coding.map(renderPlatformCard)}
          </div>
        </div>

        {/* Learning Resources */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <BookOutlined className="mr-2 text-purple-500" />
            Learning Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.learning.map(renderPlatformCard)}
          </div>
        </div>

        {/* Your Sites */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <LaptopOutlined className="mr-2 text-purple-500" />
            Your Sites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {platforms.yourSites.map(renderPlatformCard)}
          </div>
        </div>

        {/* Development Tools */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <ApiOutlined className="mr-2 text-green-500" />
            Development Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.development.map(renderPlatformCard)}
          </div>
        </div>

        {/* AI & ML */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <RobotOutlined className="mr-2 text-indigo-500" />
            AI & Machine Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.ai.map(renderPlatformCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
