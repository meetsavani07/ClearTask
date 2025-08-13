import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Trash } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameFirstLetter, setNameFirstLetter] = useState("");
  const { logout, Delete } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const handleDelete = () => {
    Delete();
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    // const username = JSON.parse(localStorage.getItem('user') || '{}')

    // if(data){
    //   try {
    //     const newdata1 = JSON.parse(data);

    //     setEmail(newdata1.name);
    //   } catch (error) {
    //     console.error('Invalid JSON in localStorage:', error);
    //   }
    // }

    if (data) {
      try {
        const newdata = JSON.parse(data);
        const firstletter = newdata.name?.charAt(0).toUpperCase() || "";

        setEmail(newdata.email);
        setName(newdata.name);
        setNameFirstLetter(firstletter);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="bg-gray-50 py-8">
      <div>
        <div className="flex items-center justify-center">
          <div className="gird grid-cols-1 sm:grid-cols-2">
            <div className="flex items-center justify-center text-center text-4xl font-bold text-slate-800 bg-orange-300 rounded-full w-16 h-16">
              <h1 className="">{nameFirstLetter}</h1>
            </div>
          </div>
        </div>

        <div className="text-center text-xl font-bold">
          <p>{name}</p>
        </div>
        <div className="text-center">
          <p>{email}</p>
        </div>
      </div>
      `{/* Edit Profile & About me */}
      <div className="bg-gray-50 pb-24 space-y-6">
        {/* Edit Profile */}
        <div className="bg-slate-200/50 border border-slate-200 rounded-full p-3 ml-10 mr-10 text-center">
          <button className="font-bold">
            <Link to="/EditProfile">
              Edit Profile
            </Link>
          </button>
        </div>

        {/* About Me */}
        <div className="bg-slate-200/50 border border-slate-200 rounded-full p-3 ml-10 mr-10 text-center">
          <button className="font-bold">
            <a href="https://meet-savani.netlify.app/" target="_blank">
              About Me
            </a>
          </button>
        </div>
      </div>
      {/* Logout & Delete Function */}
      <div className="container mt-5 mx-auto px-10 grid grid-cols-1 sm:grid-cols-2 gap-10 ">
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Logout Your Account
                </h3>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Delete Your Account
                </h3>
              </div>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash className="h-5 w-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
