import React, { useState, useEffect } from "react";
import { Avatar, Menu, Switch, Divider, Input, Card, Typography } from "antd";
import {
  UserOutlined,
  BookOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  ReadOutlined,
  RocketOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  BulbOutlined,
  BulbFilled,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  YoutubeOutlined,
  SearchOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Text } = Typography;

const Sidebar = ({
  darkMode,
  onMenuSelect,
  onThemeChange,
  activeMenu,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const userDetails = {
    name: "Navin Kumaran",
    college: "VCET",
    year: "3rd Year",
    department: "Computer Science",
    username: "@daretobebetter",
    socialLinks: {
      github: "https://github.com/Navin2k4",
      linkedin: "https://linkedin.com/in/navin2004",
      portfolio: "https://navinportfolio.onrender.com/",
    },
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <UserOutlined />,
      label: "Dashboard",
    },
    {
      key: "aptitude",
      icon: <CalculatorOutlined />,
      label: "Aptitude Prep",
    },
    {
      key: "coding",
      icon: <RocketOutlined />,
      label: "Coding Practice",
    },
    {
      key: "learning",
      icon: <BookOutlined />,
      label: "Learning Path",
    },
    {
      key: "projects",
      icon: <ProjectOutlined />,
      label: "Projects",
    },
    // {
    //   key: "todos",
    //   icon: <CheckSquareOutlined />,
    //   label: "Todo Lists",
    // },
    {
      key: "resources",
      icon: <ReadOutlined />,
      label: "Resources",
    },
  ];


  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`h-full p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Digital Clock */}
      <Card
        className={`mb-4 text-center ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}
        bodyStyle={{ padding: "12px" }}
      >
        <div className="text-2xl font-bold mb-1">{formatTime(currentTime)}</div>
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {formatDate(currentTime)}
        </div>
      </Card>

      {/* Profile Section */}
      <div className="text-center my-6">
        <Avatar
          size={80}
          src="photo.jpg"
          className="mb-2 border-4 border-blue-500"
          icon={<UserOutlined />}
        />
        <h2 className="text-xl font-bold my-2">{userDetails.name}</h2>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {userDetails.username}
        </p>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {userDetails.college}
        </p>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {userDetails.year} - {userDetails.department}
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-3">
          <a
            href={userDetails.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xl transition-colors duration-200 ${
              darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <GithubOutlined />
          </a>
          <a
            href={userDetails.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <LinkedinOutlined />
          </a>
          <a
            href={userDetails.socialLinks.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            <GlobalOutlined />
          </a>
        </div>
      </div>

      <Divider className={darkMode ? "border-gray-700" : "border-gray-200"} />

      {/* Theme Toggle */}
      {/* <div className="flex justify-between items-center px-4 mb-4">
        <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
          Theme
        </span>
        <Switch
          checked={darkMode}
          onChange={onThemeChange}
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<BulbOutlined />}
          defaultChecked={true}
        />
      </div> */}

      {/* Navigation Menu */}
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
        className={`border-0 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white"
        }`}
        items={menuItems}
        onClick={({ key }) => onMenuSelect(key)}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default Sidebar;
