import React from "react";
import {
  Card,
  Tabs,
  List,
  Tag,
  Button,
  Progress,
  Space,
  Typography,
  Row,
  Col,
} from "antd";
import {
  BookOutlined,
  CheckCircleOutlined,
  RightOutlined,
  YoutubeOutlined,
  LinkOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import CategoryTodoList from "./CategoryTodoList";
import ToDoList from "./ToDoList";

const { Title } = Typography;

const AptitudePrep = ({ darkMode }) => {
  const quickLinks = {
    youtubeChannels: [
      {
        name: "CareerRide Official",
        icon: <YoutubeOutlined />,
        color: "#FF0000",
        url: "https://www.youtube.com/@CareerRideOfficial/playlists",
        description: "Comprehensive aptitude preparation videos",
      },
      {
        name: "Feel Free to Learn",
        icon: <YoutubeOutlined />,
        color: "#FF0000",
        url: "https://www.youtube.com/@FeelFreetoLearn/playlists",
        description: "Detailed aptitude tutorials",
      },
      {
        name: "Fresh Careers",
        icon: <YoutubeOutlined />,
        color: "#FF0000",
        url: "https://www.youtube.com/@freshcareers",
        description: "Career guidance and aptitude prep",
      },
    ],
    practiceResources: [
      {
        name: "IndiaBix",
        icon: <LinkOutlined />,
        color: "#4A90E2",
        url: "https://www.indiabix.com/aptitude/questions-and-answers/",
        description: "Practice questions and answers",
      },
      {
        name: "GeeksforGeeks Aptitude",
        icon: <LinkOutlined />,
        color: "#2F8D46",
        url: "https://www.geeksforgeeks.org/aptitude-for-placements/?ref=ml_lbp",
        description: "Placement preparation resources",
      },
    ],
  };

  const renderQuickLinkCard = (link) => (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      key={link.name}
      className={`block p-4 rounded-xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 hover:bg-gray-700 text-white"
          : "bg-white hover:bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex items-center space-x-4">
        <div
          className="text-2xl p-2 rounded-lg"
          style={{ backgroundColor: `${link.color}20` }}
        >
          <span style={{ color: link.color }}>{link.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg m-0">{link.name}</h3>
          <p
            className={`text-sm m-0 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {link.description}
          </p>
        </div>
      </div>
    </a>
  );

  const quantitativeTab = {
    key: "Quantitative",
    label: (
      <span>
        <CheckCircleOutlined className="mr-2" />
        Progress Tracker
      </span>
    ),
    children: <ToDoList darkMode={darkMode} />,
  };

  const renderTopicCard = (topic) => (
    <Card
      title={
        <Space>
          <BookOutlined /> {topic.title}
        </Space>
      }
      className={`mb-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
    >
      <div className="space-y-4">
        {/* Subtopics with Progress */}
        <div className="space-y-2">
          {topic.subtopics.map((subtopic) => (
            <div
              key={subtopic.name}
              className="flex items-center justify-between"
            >
              <span className={darkMode ? "text-white" : ""}>
                {subtopic.name}
              </span>
              <div className="w-1/2">
                <Progress percent={subtopic.progress} size="small" />
              </div>
            </div>
          ))}
        </div>

        {/* Resources */}
        <div>
          <h4
            className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          >
            Practice Resources:
          </h4>
          <Space wrap>
            {topic.resources.map((resource) => (
              <Button
                key={resource.name}
                type="link"
                icon={<RightOutlined />}
                onClick={() => window.open(resource.url, "_blank")}
                className={darkMode ? "text-blue-400" : ""}
              >
                {resource.name}
              </Button>
            ))}
          </Space>
        </div>
      </div>
    </Card>
  );

  const quickLinksTab = {
    key: "quickLinks",
    label: (
      <span>
        <PlayCircleOutlined className="mr-2" />
        Quick Links
      </span>
    ),
    children: (
      <div className="space-y-8">
        {/* YouTube Channels */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <YoutubeOutlined className="mr-2 text-red-500" />
            YouTube Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.youtubeChannels.map(renderQuickLinkCard)}
          </div>
        </div>

        {/* Practice Resources */}
        <div>
          <h2
            className={`text-2xl font-bold mb-6 flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <LinkOutlined className="mr-2 text-blue-500" />
            Practice Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.practiceResources.map(renderQuickLinkCard)}
          </div>
        </div>
      </div>
    ),
  };

  const aptitudeTopics = {
    "Logical Reasoning": [
      {
        title: "Basic Logic",
        subtopics: [
          { name: "Series Completion", progress: 85 },
          { name: "Analogies", progress: 80 },
          { name: "Classification", progress: 75 },
        ],
        resources: [
          {
            name: "IndiaBix - Logical",
            url: "https://www.indiabix.com/logical-reasoning/questions-and-answers/",
          },
          {
            name: "TestBook Logic",
            url: "https://testbook.com/logical-reasoning",
          },
        ],
      },
    ],
    Verbal: [
      {
        title: "English Language",
        subtopics: [
          { name: "Reading Comprehension", progress: 75 },
          { name: "Vocabulary", progress: 70 },
          { name: "Grammar", progress: 80 },
        ],
        resources: [
          {
            name: "IndiaBix - Verbal",
            url: "https://www.indiabix.com/verbal-ability/questions-and-answers/",
          },
          {
            name: "TestBook Verbal",
            url: "https://testbook.com/verbal-ability",
          },
        ],
      },
    ],
  };

  const prepCategories = ["Quantitative", "Logical", "Verbal"];

  const renderCategoryTab = (category) => ({
    key: category,
    label: (
      <span>
        <CheckCircleOutlined className="mr-2" />
        {category} Prep
      </span>
    ),
    children: (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CategoryTodoList darkMode={darkMode} category={category} />
        </Col>
      </Row>
    ),
  });

  return (
    <div className="space-y-6">
      <Tabs
        defaultActiveKey="quickLinks"
        items={[quickLinksTab, ...prepCategories.map(renderCategoryTab)]}
      />
    </div>
  );
};

export default AptitudePrep;
