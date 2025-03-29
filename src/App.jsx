import { useState } from "react";
import Hero from "./components/hero/hero";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/sidebar";
import "./App.css";

const App = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="main-content">
        {isSidebarVisible && <Sidebar />}
        <Hero />
      </div>
    </div>
  );
};

export default App;
