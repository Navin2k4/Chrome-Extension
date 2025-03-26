import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  List,
  Tag,
  Button,
  Progress,
  Space,
  Input,
  Select,
  Badge,
  Tooltip,
  Empty,
  Popconfirm,
  message,
  Statistic,
  Form,
  Checkbox,
} from "antd";
import {
  CodeOutlined,
  SearchOutlined,
  StarOutlined,
  CheckCircleOutlined,
  RightOutlined,
  FilterOutlined,
  PlusOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "../utils/firebaseConfig";

const { Search } = Input;
const { Option } = Select;

// Coding platforms
const CODING_PLATFORMS = [
  { name: "LeetCode", url: "https://leetcode.com/problems/" },
  {
    name: "GeeksforGeeks",
    url: "https://practice.geeksforgeeks.org/problems/",
  },
  { name: "HackerRank", url: "https://www.hackerrank.com/challenges/" },
  { name: "CodeChef", url: "https://www.codechef.com/problems/" },
  { name: "Codeforces", url: "https://codeforces.com/problemset/problem/" },
  { name: "SPOJ", url: "https://www.spoj.com/problems/" },
  { name: "AtCoder", url: "https://atcoder.jp/contests/" },
];

const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

const CodingPractice = ({ darkMode }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(
    CODING_PLATFORMS[0].name
  );
  const [problemNumber, setProblemNumber] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [form] = Form.useForm();

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    byPlatform: {},
    byDifficulty: {},
  });

  // Fetch problems from Firebase
  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const problemsRef = collection(db, "coding_problems");
      const q = query(problemsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedProblems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProblems(fetchedProblems);
      calculateStats(fetchedProblems);
    } catch (error) {
      console.error("Error fetching problems:", error);
      message.error("Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (problemsList) => {
    const stats = problemsList.reduce(
      (acc, problem) => {
        // Total count
        acc.total++;

        // By platform
        acc.byPlatform[problem.platform] =
          (acc.byPlatform[problem.platform] || 0) + 1;

        // By difficulty
        acc.byDifficulty[problem.difficulty] =
          (acc.byDifficulty[problem.difficulty] || 0) + 1;

        return acc;
      },
      { total: 0, byPlatform: {}, byDifficulty: {} }
    );

    setStats(stats);
  };

  const addProblem = async () => {
    try {
      if (!problemNumber || !selectedPlatform || !problemTitle) {
        message.warning("Please fill in all required fields");
        return;
      }

      const newProblem = {
        number: problemNumber,
        platform: selectedPlatform,
        title: problemTitle,
        difficulty: selectedDifficulty,
        topic: selectedTopic || null,
        completed: false,
        timestamp: new Date(),
        url: `${
          CODING_PLATFORMS.find((p) => p.name === selectedPlatform)?.url
        }${problemNumber}`,
      };

      await addDoc(collection(db, "coding_problems"), newProblem);
      message.success("Problem added successfully");
      form.resetFields();
      setProblemNumber("");
      setProblemTitle("");
      setSelectedTopic("");
      await fetchProblems();
    } catch (error) {
      console.error("Error adding problem:", error);
      message.error("Failed to add problem");
    }
  };

  const toggleProblemStatus = async (problemId, completed) => {
    try {
      await updateDoc(doc(db, "coding_problems", problemId), {
        completed: !completed,
      });
      await fetchProblems();
      message.success("Problem status updated");
    } catch (error) {
      console.error("Error updating problem:", error);
      message.error("Failed to update problem status");
    }
  };

  const deleteProblem = async (problemId) => {
    try {
      await deleteDoc(doc(db, "coding_problems", problemId));
      await fetchProblems();
      message.success("Problem deleted successfully");
    } catch (error) {
      console.error("Error deleting problem:", error);
      message.error("Failed to delete problem");
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
          <Statistic
            title={
              <span className={darkMode ? "text-white" : ""}>
                Total Problems
              </span>
            }
            value={stats.total}
            prefix={<CodeOutlined />}
          />
        </Card>

        {DIFFICULTY_LEVELS.map((difficulty) => (
          <Card
            key={difficulty}
            className={darkMode ? "bg-gray-800 text-white" : ""}
          >
            <Statistic
              title={
                <span className={darkMode ? "text-white" : ""}>
                  {difficulty} Problems
                </span>
              }
              value={stats.byDifficulty[difficulty] || 0}
              valueStyle={{
                color:
                  difficulty === "Easy"
                    ? "#52c41a"
                    : difficulty === "Medium"
                    ? "#faad14"
                    : "#f5222d",
              }}
            />
          </Card>
        ))}
      </div>

      <Card
        className={darkMode ? "bg-gray-800 text-white" : ""}
        title="Platform Statistics"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CODING_PLATFORMS.map((platform) => (
            <div key={platform.name} className="text-center">
              <Statistic
                title={
                  <span className={darkMode ? "text-white" : ""}>
                    {platform.name}
                  </span>
                }
                value={stats.byPlatform[platform.name] || 0}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderProblemsList = () => (
    <div className="space-y-6">
      <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
        <Form form={form} layout="vertical" onFinish={addProblem}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item label="Platform" required>
              <Select value={selectedPlatform} onChange={setSelectedPlatform}>
                {CODING_PLATFORMS.map((platform) => (
                  <Option key={platform.name} value={platform.name}>
                    {platform.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Problem Number" required>
              <Input
                value={problemNumber}
                onChange={(e) => setProblemNumber(e.target.value)}
                placeholder="e.g., 1234"
              />
            </Form.Item>

            <Form.Item label="Problem Title" required>
              <Input
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                placeholder="e.g., Two Sum"
              />
            </Form.Item>

            <Form.Item label="Difficulty">
              <Select
                value={selectedDifficulty}
                onChange={setSelectedDifficulty}
              >
                {DIFFICULTY_LEVELS.map((level) => (
                  <Option key={level} value={level}>
                    {level}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Topic (Optional)">
              <Input
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="e.g., Dynamic Programming"
              />
            </Form.Item>

            <Form.Item label=" ">
              <Button
                type="primary"
                onClick={addProblem}
                icon={<PlusOutlined />}
              >
                Add Problem
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>

      <Card className={darkMode ? "bg-gray-800 text-white" : ""}>
        <div className="mb-4">
          <Search
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
          />
        </div>

        <List
          loading={loading}
          dataSource={problems.filter(
            (p) =>
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.topic?.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          renderItem={(problem) => (
            <List.Item
              actions={[
                <Tooltip title="Toggle Status">
                  <Button
                    type={problem.completed ? "primary" : "default"}
                    icon={<CheckCircleOutlined />}
                    onClick={() =>
                      toggleProblemStatus(problem.id, problem.completed)
                    }
                  />
                </Tooltip>,
                <Tooltip title="Delete">
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteProblem(problem.id)}
                  />
                </Tooltip>,
                <Button
                  type="link"
                  href={problem.url}
                  target="_blank"
                  icon={<RightOutlined />}
                >
                  Solve
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium ${
                        problem.completed ? "line-through opacity-50" : ""
                      }`}
                    >
                      {problem.title}
                    </span>
                    <Tag color="blue">{problem.platform}</Tag>
                    <Tag
                      color={
                        problem.difficulty === "Easy"
                          ? "success"
                          : problem.difficulty === "Medium"
                          ? "warning"
                          : "error"
                      }
                    >
                      {problem.difficulty}
                    </Tag>
                    {problem.topic && <Tag>{problem.topic}</Tag>}
                  </div>
                }
                description={`Problem #${problem.number}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );

  const renderTopicsList = () => {
    // Group problems by topic
    const topicsMap = problems.reduce((acc, problem) => {
      const topic = problem.topic || "Uncategorized";
      if (!acc[topic]) {
        acc[topic] = [];
      }
      acc[topic].push(problem);
      return acc;
    }, {});

    const sortedTopics = Object.entries(topicsMap).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    return (
      <div className="space-y-6">
        {sortedTopics.map(([topic, topicProblems]) => {
          const completedCount = topicProblems.filter(
            (p) => p.completed
          ).length;
          const progress = (completedCount / topicProblems.length) * 100;

          return (
            <Card
              key={topic}
              className={darkMode ? "bg-gray-800 text-white" : ""}
              title={
                <div className="flex items-center justify-between">
                  <Space>
                    <span className="font-medium text-lg">{topic}</span>
                    <Tag color="blue">{topicProblems.length} problems</Tag>
                  </Space>
                  <Space>
                    <Badge
                      status="success"
                      text={
                        <span className={darkMode ? "text-white" : ""}>
                          {completedCount} Completed
                        </span>
                      }
                    />
                    <Badge
                      status="processing"
                      text={
                        <span className={darkMode ? "text-white" : ""}>
                          {topicProblems.length - completedCount} Pending
                        </span>
                      }
                    />
                    <Progress
                      percent={Math.round(progress)}
                      size="small"
                      status={progress === 100 ? "success" : "active"}
                      style={{ width: 100 }}
                    />
                  </Space>
                </div>
              }
            >
              <List
                dataSource={topicProblems}
                renderItem={(problem) => (
                  <List.Item
                    className={darkMode ? "border-gray-700" : ""}
                    actions={[
                      <Tooltip title="Toggle Status">
                        <Button
                          type={problem.completed ? "primary" : "default"}
                          icon={<CheckCircleOutlined />}
                          onClick={() =>
                            toggleProblemStatus(problem.id, problem.completed)
                          }
                        />
                      </Tooltip>,
                      <Tooltip title="Delete">
                        <Popconfirm
                          title="Delete this problem?"
                          onConfirm={() => deleteProblem(problem.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                          />
                        </Popconfirm>
                      </Tooltip>,
                      <Button
                        type="link"
                        href={problem.url}
                        target="_blank"
                        icon={<RightOutlined />}
                      >
                        Solve
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Checkbox
                          checked={problem.completed}
                          onChange={() =>
                            toggleProblemStatus(problem.id, problem.completed)
                          }
                        />
                      }
                      title={
                        <div className="flex items-center gap-2">
                          <span
                            className={`${
                              problem.completed ? "line-through opacity-50" : ""
                            }`}
                          >
                            {problem.title}
                          </span>
                          <Tag color="blue">{problem.platform}</Tag>
                          <Tag
                            color={
                              problem.difficulty === "Easy"
                                ? "success"
                                : problem.difficulty === "Medium"
                                ? "warning"
                                : "error"
                            }
                          >
                            {problem.difficulty}
                          </Tag>
                        </div>
                      }
                      description={
                        <Space size="small">
                          {problem.completed ? (
                            <Tag color="success" icon={<CheckCircleOutlined />}>
                              Done
                            </Tag>
                          ) : (
                            <Tag
                              color="processing"
                              icon={<ClockCircleOutlined />}
                            >
                              Pending
                            </Tag>
                          )}
                          <span>Problem #{problem.number}</span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultActiveKey="dashboard"
        items={[
          {
            key: "dashboard",
            label: (
              <span>
                <StarOutlined /> Dashboard
              </span>
            ),
            children: renderDashboard(),
          },
          {
            key: "problems",
            label: (
              <span>
                <CodeOutlined /> Problems
              </span>
            ),
            children: renderProblemsList(),
          },
          {
            key: "topics",
            label: (
              <span>
                <FilterOutlined /> Topics
              </span>
            ),
            children: renderTopicsList(),
          },
        ]}
      />
    </div>
  );
};

export default CodingPractice;
