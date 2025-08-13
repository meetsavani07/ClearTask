import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Tasks from "./pages/Task";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./Auth/LoginPage";
import Navbar from "./Navbar/navbar";
import Profile from "./pages/Profile";
import React from "react";
import EditProfile from "./components/EditProfle";

const App = () => {

  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
        <Routes>
          <Route path="" element={<LoginPage />} />
        </Routes>
        <AnimatePresence mode="wait">
          <Navbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={function (): void {
              throw new Error("Function not implemented.");
            } } children={undefined} />
          <Routes>
            <Route path="/Home" element={<Home searchTerm={searchTerm} />} />
            <Route path="/Task" element={<Tasks searchTerm={searchTerm} />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/EditProfile" element={<EditProfile />} />
          </Routes>
        </AnimatePresence>

        {/* Toast Notifications */}
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#FDBA74",
              color: "#fff",
            },
          }}
        />
      </div>
    </>
  );
};

export default App;
