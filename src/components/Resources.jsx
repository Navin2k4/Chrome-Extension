import React from "react";
import { Card, List, Tag, Button, Input, Space, Tabs } from "antd";
import {
  SearchOutlined,
  BookOutlined,
  YoutubeOutlined,
  ReadOutlined,
  LinkOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const Resources = ({ darkMode }) => {
  const resources = {
    Documentation: [
      {
        title: "React Documentation",
        description: "Official React documentation and tutorials",
        url: "https://react.dev",
        tags: ["React", "Frontend", "JavaScript"],
      },
      {
        title: "Node.js Docs",
        description: "Node.js official documentation",
        url: "https://nodejs.org/docs",
        tags: ["Node.js", "Backend", "JavaScript"],
      },
      {
        title: "MDN Web Docs",
        description: "Comprehensive web development documentation",
        url: "https://developer.mozilla.org",
        tags: ["Web", "HTML", "CSS", "JavaScript"],
      },
    ],
    "Video Tutorials": [
      {
        title: "freeCodeCamp",
        description: "Free coding tutorials and certifications",
        url: "https://www.youtube.com/c/freecodecamp",
        tags: ["Programming", "Web Development", "Computer Science"],
      },
      {
        title: "Traversy Media",
        description: "Web development tutorials",
        url: "https://www.youtube.com/c/TraversyMedia",
        tags: ["Web Development", "JavaScript", "React"],
      },
      {
        title: "The Net Ninja",
        description: "Modern web development tutorials",
        url: "https://www.youtube.com/c/TheNetNinja",
        tags: ["Web Development", "JavaScript", "React"],
      },
    ],
    "CS Fundamentals": [
      {
        title: "GeeksforGeeks DSA",
        description: "Data Structures and Algorithms",
        url: "https://www.geeksforgeeks.org/data-structures/",
        tags: ["DSA", "Algorithms", "Programming"],
      },
      {
        title: "Operating Systems Notes",
        description: "Comprehensive OS concepts",
        url: "https://www.geeksforgeeks.org/operating-systems/",
        tags: ["OS", "Computer Science"],
      },
      {
        title: "DBMS Tutorial",
        description: "Database Management Systems",
        url: "https://www.javatpoint.com/dbms-tutorial",
        tags: ["DBMS", "SQL", "Database"],
      },
    ],
    "Interview Prep": [
      {
        title: "System Design Primer",
        description: "Learn how to design large-scale systems",
        url: "https://github.com/donnemartin/system-design-primer",
        tags: ["System Design", "Architecture", "Interview"],
      },
      {
        title: "Tech Interview Handbook",
        description: "Curated interview preparation materials",
        url: "https://www.techinterviewhandbook.org",
        tags: ["Interview", "Algorithms", "Career"],
      },
      {
        title: "Coding Interview University",
        description: "Complete computer science study plan",
        url: "https://github.com/jwasham/coding-interview-university",
        tags: ["Computer Science", "Interview", "Study Plan"],
      },
    ],
  };

  const getIconForCategory = (category) => {
    switch (category) {
      case "Documentation":
        return <ReadOutlined />;
      case "Video Tutorials":
        return <YoutubeOutlined />;
      case "CS Fundamentals":
        return <BookOutlined />;
      case "Interview Prep":
        return <GithubOutlined />;
      default:
        return <LinkOutlined />;
    }
  };

  const onSearch = (value) => {
    // Implement search functionality
    console.log("Searching for:", value);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className={darkMode ? "bg-gray-800" : ""}>
        <Search
          placeholder="Search resources..."
          onSearch={onSearch}
          size="large"
          className="max-w-xl"
        />
      </Card>

      {/* Resources Tabs */}
      <Tabs
        defaultActiveKey="Documentation"
        items={Object.entries(resources).map(([category, items]) => ({
          key: category,
          label: (
            <span>
              {getIconForCategory(category)}
              <span className="ml-2">{category}</span>
            </span>
          ),
          children: (
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
              dataSource={items}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    className={`h-full ${
                      darkMode ? "bg-gray-800 text-white" : ""
                    }`}
                    actions={[
                      <Button
                        type="link"
                        icon={<LinkOutlined />}
                        onClick={() => window.open(item.url, "_blank")}
                      >
                        Visit
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <span className={darkMode ? "text-white" : ""}>
                          {item.title}
                        </span>
                      }
                      description={
                        <div>
                          <p
                            className={`mb-3 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {item.description}
                          </p>
                          <Space wrap>
                            {item.tags.map((tag) => (
                              <Tag key={tag} color="blue">
                                {tag}
                              </Tag>
                            ))}
                          </Space>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          ),
        }))}
      />
    </div>
  );
};

export default Resources;
