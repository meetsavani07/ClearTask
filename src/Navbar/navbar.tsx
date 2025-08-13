import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Home, ListTodo, Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SearchBarProps {
  onSearch: (query: string) => void;
  children: React.ReactNode;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const Navbar: React.FC<SearchBarProps> = ({ onSearch, children, searchTerm = '', onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    { path: "/Home", label: "Home", icon: Home },
    { path: "/Task", label: "Task", icon: ListTodo },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <><nav className="fixed w-full z-50 bg-white backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {links.map((link) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`relative flex px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${location.pathname === link.path
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-black hover:text-orange-400 hover:bg-white/50"}`}
                >
                  {link.icon && <link.icon className="h-4 w-4 mt-0.5 mr-1" />}
                  {link.label}

                  {/* Hover effect */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600  text-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-black p-2 rounded-lg bg-balck transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Search Bar and Icons */}
          <div
            onSubmit={handleSearch}
            className="sm:ml-0 ml-4 flex-1 flex justify-center px-2"
          >
            <motion.div
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-300"
                size={18} />
              <input
                type="text"
                placeholder="Search Your Task"
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all text-sm sm:text-base"
                aria-label="Search Task" 
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black- hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </motion.div>
          </div>

          {/* Notification and User Icons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black sm:mr-10 mr-5 md:flex items-center space-x-4"
          >
            <Bell size={18} />
          </motion.div>
          <Link to="/Profile">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-black md:flex space-x-4 bg-orange-300 w-9 h-9 rounded-full flex items-center justify-center hover:bg-orange-400 boder hover:ring-2 hover:ring-slate-800 transition-all duration-300"
            >

              <User size={18} />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden text-left"
          >
            <div className="px-10 pt-2 pb-4 space-y-2 backdrop-blur-md">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${location.pathname === link.path
                      ? "text-orange-400 bg-orange-500/10 border border-orange-500/30"
                      : "text-black hover:text-orange-400 hover:bg-white/50"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${location.pathname === link.path
                          ? "bg-orange-400"
                          : "bg-gray-600"}`} />
                      {link.label}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav><main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </>
  );
};

export default Navbar;
