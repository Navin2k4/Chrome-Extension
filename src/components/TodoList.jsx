import React, { useState, useEffect } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "../utils/firebaseConfig";
import {
  Input,
  Button,
  List,
  Checkbox,
  Progress,
  Space,
  Typography,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ToDoList = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from Firebase
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      setTasks(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchTasks();
  }, []);

  // Add a new task to Firebase
  const addTask = async () => {
    if (!newTask.trim()) return;
    const docRef = await addDoc(collection(db, "tasks"), {
      name: newTask,
      completed: false,
    });
    setTasks([...tasks, { id: docRef.id, name: newTask, completed: false }]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    await updateDoc(doc(db, "tasks", id), { completed: !completed });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Calculate progress
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div
      className={`p-6 rounded-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } shadow-lg`}
    >
      <Title level={3}>📌 To-Do List</Title>

      {/* Task Input */}
      <Space className="mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={addTask}>
          Add
        </Button>
      </Space>

      {/* Progress Bar */}
      <Progress percent={progress} status="active" className="mb-4" />

      {/* Task List */}
      <List
        bordered
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<DeleteOutlined />}
                danger
                onClick={() => deleteTask(task.id)}
              />,
            ]}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTask(task.id, task.completed)}
            >
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.name}
              </span>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ToDoList;
