import { motion } from "framer-motion";
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { IdCard, Mail, Lock } from "lucide-react";
import { showToast } from "../utils/toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password || (isSignup && !name)) {
      setError('Please fill in all fields.');
      return;
    } 

    try {
      if (isSignup) {
        const success = await signup(email, password, name);
        if (success) {
          showToast.success('Account created successfully!');
          setIsSignup(false);
          
        } else {
          setError('Signup failed. Please try again.');
        }
      } else {
        const success = await login(email, password);
        if (success) {
          showToast.success('Logged in successfully!');
          navigate('/Home');
        } else {
          showToast.success('Invalid credentials. Please try again.');
          setError('Login failed. Please check your credentials.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleGoogleSuccess =  async (credentialResponse: any) => {
  try {
      const decoded: any = jwtDecode(credentialResponse.credential);
  
      showToast.success('Successfully logged in with Google!');
      localStorage.setItem('token', credentialResponse.credential);
      localStorage.setItem('user', JSON.stringify(decoded));
      
      navigate('/Home');
    } catch (error) {
      console.error('Google login error:', error);
      showToast.error('Failed to login with Google');
    }
};

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    showToast.error('Failed to login with Google');
  };

  const handleForgotPassword = () => {
    if (email) {
      showToast.warning('Invalid credentials. Please try again.');
      console.error('Invalid credentials. Please try again.');
      setIsForgotPassword(false);
      return;
    } else{
      showToast.success('Email sent to reset your password!');
      return;
    }
  }


  if (isForgotPassword) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <motion.div
            className="sm:mx-auto sm:w-full sm:max-w-md"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Reset Password
            </h1>
          </motion.div>
          <div className="px-4 py-6 bg-white border rounded-lg shadow-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 pl-10 text-black border rounded-md focus:outline-none focus:ring-orange-400"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
              <motion.button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-orange-500 hover:text-orange-700"
                whileHover={{ scale: 1.02 }}
              >
                Back to login
              </motion.button>
              <button
                type="submit"
                onClick={handleForgotPassword}
                className="relative flex justify-center w-auto px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-gradient-to-r from-orange-400 to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Reset Link
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="items-center justify-center min-h-screen px-4 sm:py-5 py-16 bg-white sm:flex-row sm:mt-0 sm:px-6 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      <div className="">{error}</div>
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Welcome to
          <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent font-bold"> ClearTask</span>
        </h1>
      </motion.div>
      <motion.div
        className="sm:mt-8 sm:mx-auto sm:w-96 sm:max-w-96"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="px-4 py-6 bg-gray-100 border rounded-lg shadow-lg sm:mt-0 mt-24 sm:py-8 sm:px-6">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-center mb-10 text-2xl font-semibold">
                {isSignup
                  ? "Create your account"
                  : "Sign in to access your account"}
              </h1>

              {isSignup && (
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
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
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
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm -mt-4 font-medium text-gray-700"
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

            {/* Forgot Password */}
            {!isSignup && (
              <div className="text-sm text-right">
                <motion.button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-orange-400 hover:text-orange-600 focus:outline-none"
                  whileHover={{ scale: 1.02 }}
                >
                  Forgot Password?
                </motion.button>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 rounded-lg hover:bg-orange-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSignup ? "Sign Up" : "Login"}
            </motion.button>

            {/* Google Login */}
            <div className="flex items-center justify-center my-4">
              <span className="text-gray-500 text-sm mx-2 -mt-3">or</span>
            </div>
            <div className="flex items-center justify-center -mt-3 ">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                width="100%"
              />
            </div>

            {/* Create new account */}
            <div className="text-sm text-center">
              <motion.button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-orange-400 hover:text-orange-600 focus:outline-none"
                whileHover={{ scale: 1.02 }}
              >
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </motion.button>
            </div>      
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;