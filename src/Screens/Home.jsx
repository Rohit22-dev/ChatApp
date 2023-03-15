import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Chat from "../components/Chat";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const mode = useSelector((state) => state.mode);
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  useEffect(() => {
    if (isLargeScreen) {
      setSideBarToggle(true);
    } else {
      setSideBarToggle(false);
    }
  }, [isLargeScreen]);
  return (
    <div
      className="flex flex-col h-screen"
      data-theme={mode === "light" ? "emerald" : "dark"}
    >
      <Navbar
        setSideBarToggle={setSideBarToggle}
        sideBarToggle={sideBarToggle}
      />
      <div className="flex flex-1">
        {sideBarToggle && <Sidebar />}
        <Chat className="flex-1" />
      </div>
    </div>
  );
};

export default Home;
