import { IdCard, Mail, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { showToast } from "../utils/toast";

const EditProfile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        const newData = JSON.parse(data);
        setName(newData.name);
        setEmail(newData.email);
        setPassword(newData.password);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
      }
    }
  }, []);

  const chnageDatahandle = () => {
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    showToast.success("Your Profile Updated");
  }

  return (
    <div className="items-center justify-center px-4 sm:py-5 py-16 bg-gray-50 sm:flex-row sm:mt-0 sm:px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="font-bold text-center mt-6 text-2xl">User Profile</h1>
      <div className="px-4 py-6 bg-gray-50 border rounded-lg shadow-lg sm:mt-8 mt-8 sm:py-8 sm:px-6 sm:mx-auto sm:w-[30rem]">
        <form action="">
          <div>
            <label className="block text-sm font-medium text-gray-700 -mt-2">
              Full Name
            </label>
            <div className="relative mt-1">
              <IdCard className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 pl-10 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-orangr-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 pl-10 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 pl-10 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={chnageDatahandle}
            className="w-full mt-6 px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
