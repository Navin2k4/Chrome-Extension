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
  Card,
  Select,
  Collapse,
  Badge,
  Tooltip,
  Empty,
  Tag,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  FolderOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

// Updated dark theme colors with Tailwind classes
const colors = {
  primary: "#3B82F6", // blue-500
  success: "#10B981", // emerald-500
  warning: "#F59E0B", // amber-500
  error: "#EF4444", // red-500
  background: "#1F2937", // gray-800
  cardBg: "#111827", // gray-900
  border: "#374151", // gray-700
  text: "#F9FAFB", // gray-50
  textSecondary: "#9CA3AF", // gray-400
  hover: "#2D3748", // gray-700
  // New subcategory colors
  subcategories: [
    "#3B82F6", // blue-500
    "#8B5CF6", // violet-500
    "#EC4899", // pink-500
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#6366F1", // indigo-500
  ],
};

const CategoryTodoList = ({ category }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(
        collection(db, `categories_${category.toLowerCase()}`)
      );
      setCategories(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchCategories();
  }, [category]);

  // Fetch tasks from Firebase using category-specific collection
  useEffect(() => {
    const fetchTasks = async () => {
      if (!selectedCategory) return;

      // Fetch all tasks for the selected category
      const baseCollectionPath = `tasks_${category.toLowerCase()}_${selectedCategory.toLowerCase()}`;
      const baseTasks = await getDocs(collection(db, baseCollectionPath));
      let allTasks = baseTasks.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch tasks from all subcategories
      const selectedCat = categories.find(
        (cat) => cat.name === selectedCategory
      );
      if (selectedCat?.subcategories?.length > 0) {
        const subcategoryTasks = await Promise.all(
          selectedCat.subcategories.map(async (subcat) => {
            const subcatPath = `${baseCollectionPath}_${subcat.toLowerCase()}`;
            const subcatSnapshot = await getDocs(collection(db, subcatPath));
            return subcatSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              subcategory: subcat, // Ensure subcategory is set
            }));
          })
        );
        allTasks = [...allTasks, ...subcategoryTasks.flat()];
      }

      // Filter by subcategory if selected
      const filteredTasks = selectedSubcategory
        ? allTasks.filter((task) => task.subcategory === selectedSubcategory)
        : allTasks;

      setTasks(filteredTasks);
    };
    fetchTasks();
  }, [category, selectedCategory, selectedSubcategory]);

  // Add a new category
  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const docRef = await addDoc(
      collection(db, `categories_${category.toLowerCase()}`),
      {
        name: newCategory,
        subcategories: [],
        timestamp: new Date(),
      }
    );
    setCategories([
      ...categories,
      { id: docRef.id, name: newCategory, subcategories: [] },
    ]);
    setNewCategory("");
  };

  // Add a new subcategory
  const addSubcategory = async (categoryId) => {
    if (!newSubcategory.trim() || categoryId !== activeCategoryId) return;
    const categoryRef = doc(
      db,
      `categories_${category.toLowerCase()}`,
      categoryId
    );
    const categoryDoc = categories.find((cat) => cat.id === categoryId);

    // Check if subcategory already exists
    if (categoryDoc.subcategories?.includes(newSubcategory.trim())) {
      message.warning("Subcategory already exists!");
      return;
    }

    const updatedSubcategories = [
      ...(categoryDoc.subcategories || []),
      newSubcategory,
    ];

    await updateDoc(categoryRef, {
      subcategories: updatedSubcategories,
    });

    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, subcategories: updatedSubcategories }
          : cat
      )
    );
    setNewSubcategory("");
  };

  // Add a new task to Firebase
  const addTask = async () => {
    if (!newTask.trim() || !selectedCategory) return;

    const collectionPath = `tasks_${category.toLowerCase()}_${selectedCategory.toLowerCase()}${
      selectedSubcategory ? "_" + selectedSubcategory.toLowerCase() : ""
    }`;

    const docRef = await addDoc(collection(db, collectionPath), {
      name: newTask,
      completed: false,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      timestamp: new Date(),
    });

    setTasks([
      ...tasks,
      {
        id: docRef.id,
        name: newTask,
        completed: false,
        category: selectedCategory,
        subcategory: selectedSubcategory,
      },
    ]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    const collectionPath = `tasks_${category.toLowerCase()}_${selectedCategory.toLowerCase()}${
      selectedSubcategory ? "_" + selectedSubcategory.toLowerCase() : ""
    }`;

    await updateDoc(doc(db, collectionPath, id), { completed: !completed });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = async (id) => {
    const collectionPath = `tasks_${category.toLowerCase()}_${selectedCategory.toLowerCase()}${
      selectedSubcategory ? "_" + selectedSubcategory.toLowerCase() : ""
    }`;

    await deleteDoc(doc(db, collectionPath, id));
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Calculate progress
  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  const getProgressColor = (percent) => {
    if (percent >= 80) return "#52c41a";
    if (percent >= 50) return "#1890ff";
    if (percent >= 20) return "#faad14";
    return "#ff4d4f";
  };

  const getCategoryProgress = (categoryName) => {
    if (!categories.length) return 0;
    const categoryTasks = tasks.filter(
      (task) => task.category === categoryName
    );
    if (!categoryTasks.length) return 0;
    return Math.round(
      (categoryTasks.filter((task) => task.completed).length /
        categoryTasks.length) *
        100
    );
  };

  // Delete a category and its tasks
  const deleteCategory = async (categoryId, categoryName) => {
    try {
      // Delete the category document
      await deleteDoc(
        doc(db, `categories_${category.toLowerCase()}`, categoryId)
      );

      // Delete all tasks in this category
      const tasksCollectionPath = `tasks_${category.toLowerCase()}_${categoryName.toLowerCase()}`;
      const tasksSnapshot = await getDocs(collection(db, tasksCollectionPath));
      const deleteTasks = tasksSnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deleteTasks);

      setCategories(categories.filter((cat) => cat.id !== categoryId));
      if (selectedCategory === categoryName) {
        setSelectedCategory("");
        setSelectedSubcategory("");
        setTasks([]);
      }
      message.success("Category deleted successfully");
    } catch (error) {
      message.error("Failed to delete category");
    }
  };

  // Delete a subcategory and its tasks
  const deleteSubcategory = async (
    categoryId,
    categoryName,
    subcategoryName
  ) => {
    try {
      const categoryRef = doc(
        db,
        `categories_${category.toLowerCase()}`,
        categoryId
      );
      const categoryDoc = categories.find((cat) => cat.id === categoryId);
      const updatedSubcategories = categoryDoc.subcategories.filter(
        (subcat) => subcat !== subcategoryName
      );

      // Update category with removed subcategory
      await updateDoc(categoryRef, {
        subcategories: updatedSubcategories,
      });

      // Delete all tasks in this subcategory
      const tasksCollectionPath = `tasks_${category.toLowerCase()}_${categoryName.toLowerCase()}_${subcategoryName.toLowerCase()}`;
      const tasksSnapshot = await getDocs(collection(db, tasksCollectionPath));
      const deleteTasks = tasksSnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deleteTasks);

      setCategories(
        categories.map((cat) =>
          cat.id === categoryId
            ? { ...cat, subcategories: updatedSubcategories }
            : cat
        )
      );

      if (selectedSubcategory === subcategoryName) {
        setSelectedSubcategory("");
        setTasks([]);
      }
      message.success("Subcategory deleted successfully");
    } catch (error) {
      message.error("Failed to delete subcategory");
    }
  };

  return (
    <Card
      className="shadow-lg"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
      }}
      bodyStyle={{ padding: "16px" }}
    >
      <div className="flex items-center justify-between mb-4">
        <Title level={4} style={{ color: colors.text, margin: 0 }}>
          {category} Progress Tracker
        </Title>
        <Tag color={colors.primary} className="text-base px-3">
          {Math.round(progress)}% Complete
        </Tag>
      </div>

      {/* Category Management */}
      <Collapse
        className="mb-4 bg-white"
        expandIconPosition="end"
        style={{
          borderColor: colors.border,
        }}
      >
        <Panel
          header={
            <span className="font-semibold text-white">
              <FolderOutlined
                className="mr-2"
                style={{ color: colors.primary }}
              />
              Manage Categories
            </span>
          }
          key="1"
        >
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add new category..."
                prefix={
                  <FolderAddOutlined style={{ color: colors.textSecondary }} />
                }
                onPressEnter={addCategory}
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addCategory}
              >
                Add
              </Button>
            </div>

            <div className="grid gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FolderOutlined style={{ color: colors.primary }} />
                      <Text strong style={{ color: colors.text, margin: 0 }}>
                        {cat.name}
                      </Text>
                      {cat.subcategories?.length > 0 && (
                        <Badge
                          count={cat.subcategories.length}
                          style={{ backgroundColor: colors.primary }}
                          className="ml-2"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        type="circle"
                        percent={getCategoryProgress(cat.name)}
                        width={24}
                        strokeColor={getProgressColor(
                          getCategoryProgress(cat.name)
                        )}
                        trailColor={colors.border}
                      />
                      <Popconfirm
                        title="Delete this category?"
                        description="All tasks in this category will be deleted."
                        onConfirm={() => deleteCategory(cat.id, cat.name)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          danger
                          size="small"
                        />
                      </Popconfirm>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      size="small"
                      placeholder="Add subcategory..."
                      value={cat.id === activeCategoryId ? newSubcategory : ""}
                      onChange={(e) => {
                        setActiveCategoryId(cat.id);
                        setNewSubcategory(e.target.value);
                      }}
                      onFocus={() => setActiveCategoryId(cat.id)}
                      prefix={
                        <EditOutlined style={{ color: colors.textSecondary }} />
                      }
                      onPressEnter={() => addSubcategory(cat.id)}
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                      className="flex-1"
                    />
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => addSubcategory(cat.id)}
                      icon={<PlusOutlined />}
                    />
                  </div>

                  {cat.subcategories && cat.subcategories.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {cat.subcategories.map((subcat, index) => (
                        <Tag
                          key={subcat}
                          color={
                            colors.subcategories[
                              index % colors.subcategories.length
                            ]
                          }
                          className="flex items-center px-2 py-0.5 text-xs rounded"
                          closable
                          onClose={(e) => {
                            e.preventDefault();
                            deleteSubcategory(cat.id, cat.name, subcat);
                          }}
                        >
                          {subcat}
                        </Tag>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 italic">
                      No subcategories
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </Collapse>

      {/* Category Selection */}
      <div className="flex gap-2 my-4">
        <Select
          className="w-2/3"
          placeholder="Select Category"
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            setSelectedSubcategory(""); // Reset subcategory filter
          }}
          suffixIcon={<FolderOutlined />}
          style={{ backgroundColor: colors.cardBg }}
          dropdownStyle={{ backgroundColor: colors.cardBg }}
        >
          {categories.map((cat) => (
            <Option
              key={cat.name}
              value={cat.name}
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="flex items-center gap-2">
                <FolderOutlined style={{ color: colors.primary }} />
                <span style={{ color: colors.text }}>{cat.name}</span>
                {cat.subcategories?.length > 0 && (
                  <Badge
                    count={cat.subcategories.length}
                    style={{ backgroundColor: colors.primary }}
                  />
                )}
              </div>
            </Option>
          ))}
        </Select>

        {selectedCategory &&
          categories.find((cat) => cat.name === selectedCategory)?.subcategories
            ?.length > 0 && (
            <Select
              className="w-1/3"
              placeholder="Filter by Subcategory"
              value={selectedSubcategory}
              onChange={setSelectedSubcategory}
              allowClear
              suffixIcon={<EditOutlined />}
              style={{ backgroundColor: colors.cardBg }}
              dropdownStyle={{ backgroundColor: colors.cardBg }}
            >
              {categories
                .find((cat) => cat.name === selectedCategory)
                ?.subcategories.map((subcat, index) => (
                  <Option
                    key={subcat}
                    value={subcat}
                    style={{ backgroundColor: colors.cardBg }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            colors.subcategories[
                              index % colors.subcategories.length
                            ],
                        }}
                      />
                      <span style={{ color: colors.text }}>{subcat}</span>
                    </div>
                  </Option>
                ))}
            </Select>
          )}
      </div>

      {/* Tasks Section */}
      {selectedCategory && (
        <div className="space-y-4">
          {/* Progress Overview */}
          <div className="flex items-center justify-between mb-2">
            <Space>
              <Badge
                status="success"
                text={
                  <span style={{ color: colors.text }}>
                    {completedTasks} Completed
                  </span>
                }
              />
              <Badge
                status="processing"
                text={
                  <span style={{ color: colors.text }}>
                    {tasks.length - completedTasks} Pending
                  </span>
                }
              />
              {selectedSubcategory && (
                <Tag color={colors.primary}>
                  Filtering: {selectedSubcategory}
                </Tag>
              )}
            </Space>
            <Progress
              percent={Math.round(progress)}
              steps={5}
              size="small"
              strokeColor={getProgressColor(progress)}
              trailColor={colors.border}
            />
          </div>

          {/* Task Input */}
          <Input.Group compact className="mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={`Add task for ${selectedCategory}${
                selectedSubcategory ? " > " + selectedSubcategory : ""
              }`}
              onPressEnter={addTask}
              className="w-4/5 my-2 mb-3"
              prefix={<EditOutlined style={{ color: colors.textSecondary }} />}
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
            <Button
              type="primary"
              onClick={addTask}
              icon={<PlusOutlined />}
              className="w-1/5 rounded-r-full mb-2"
            >
              Add
            </Button>
          </Input.Group>

          {/* Task List */}
          <List
            className="border rounded-lg my-2"
            style={{ borderColor: colors.border }}
            size="small"
            dataSource={tasks}
            locale={{
              emptyText: (
                <Empty
                  description={
                    <span style={{ color: colors.textSecondary }}>
                      {selectedSubcategory
                        ? `No tasks in subcategory: ${selectedSubcategory}`
                        : "No tasks yet"}
                    </span>
                  }
                />
              ),
            }}
            renderItem={(task) => (
              <List.Item
                style={{ borderColor: colors.border }}
                actions={[
                  <Tooltip title="Delete Task">
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                      size="small"
                      onClick={() => deleteTask(task.id)}
                    />
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task.completed)}
                    />
                  }
                  title={
                    <div className="flex items-center gap-2">
                      <Text
                        style={{
                          color: colors.text,
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                          opacity: task.completed ? 0.7 : 1,
                        }}
                      >
                        {task.name}
                      </Text>
                      {task.subcategory && (
                        <Tag
                          color={
                            colors.subcategories[
                              categories
                                .find((cat) => cat.name === selectedCategory)
                                ?.subcategories.indexOf(task.subcategory) %
                                colors.subcategories.length
                            ]
                          }
                          className="text-xs"
                        >
                          {task.subcategory}
                        </Tag>
                      )}
                    </div>
                  }
                  description={
                    <Space size="small">
                      {task.completed ? (
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                          Done
                        </Tag>
                      ) : (
                        <Tag color="processing" icon={<ClockCircleOutlined />}>
                          Pending
                        </Tag>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </Card>
  );
};

export default CategoryTodoList;
