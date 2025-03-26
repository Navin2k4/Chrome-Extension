import { useState } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Components
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import LearningResources from "./components/LearningResources";
import TodoList from "./components/TodoList";
import Projects from "./components/Projects";
import AptitudePrep from "./components/AptitudePrep";
import Resources from "./components/Resources";
import CodingPractice from "./components/CodingPractice";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRd1LUssfmPQwQrw6FAdP_IgszXADMvFA",
  authDomain: "my-custom-extension.firebaseapp.com",
  projectId: "my-custom-extension",
  storageBucket: "my-custom-extension.firebasestorage.app",
  messagingSenderId: "580099700915",
  appId: "1:580099700915:web:e9050b94e2a7d54ae458c6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const { Content } = Layout;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard darkMode={darkMode} />;
      case "learning":
        return <LearningResources darkMode={darkMode} />;
      case "todos":
        return <TodoList darkMode={darkMode} />;
      case "projects":
        return <Projects darkMode={darkMode} />;
      case "resources":
        return <Resources darkMode={darkMode} />;
      case "aptitude":
        return <AptitudePrep darkMode={darkMode} />;
      case "coding":
        return <CodingPractice darkMode={darkMode} />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <Layout className="min-h-screen">
        <div className="fixed left-0 top-0 h-full w-64">
          <Sidebar
            darkMode={darkMode}
            onMenuSelect={setActiveMenu}
            onThemeChange={setDarkMode}
            activeMenu={activeMenu}
          />
        </div>
        <Layout className="ml-64 ">
          <Content className="p-6  bg-gray-100 dark:bg-gray-900 min-h-screen">
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
