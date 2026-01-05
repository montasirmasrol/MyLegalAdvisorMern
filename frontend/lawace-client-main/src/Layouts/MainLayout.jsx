import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import ChatBot from "../Components/ChatBot/ChatBot";

const MainLayout = () => {
  return (
    <div>
       {/* Navbar */}
       <Navbar/>

       {/* Outlet */}
       <div className="min-h-[calc(100vh-600px)] max-w-[2400px] mx-auto">
        <Outlet />
       </div>

       {/* ChatBot */}
       <ChatBot />

       {/* Footer */}
       <Footer/>
    </div>
  );
};

export default MainLayout;