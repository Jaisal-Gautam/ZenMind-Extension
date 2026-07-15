import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { logoutUser } from "@/app/slices/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };
  const links = [
    { id: 1, name: "Focus", href: "/" },
    { id: 2, name: "Analytics", href: "/analytics" },
    { id: 3, name: "Blocking", href: "/blocking" },
  ];
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative z-50 w-full">
      <nav className="w-full bg-white shadow-sm h-16 px-6 md:px-8 flex items-center justify-between border-b border-neutral-primary relative z-10">
        <div className="shrink-0">
          <h2 className="text-3xl font-bold text-green-primary">ZenMind</h2>
        </div>
        <div className="hidden md:flex space-x-8 h-full items-center">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                `text-[17px] font-medium transition-colors h-full flex items-center border-b-2 pt-1 px-1 ${
                  isActive
                    ? "text-green-primary border-green-secondary"
                    : "text-gray-500 border-transparent hover:text-green-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Action Icons & Mobile Toggle */}
        <div className="flex items-center space-x-4 md:space-x-6 text-green-primary shrink-0">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-green-primary transition hover:text-green-secondary"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/auth/login"
              aria-label="Login"
              
            >
              <User className="hover:text-green-secondary" size={25} />
            </NavLink>
          )}
          <button
            aria-label="Toggle Menu"
            className="md:hidden hover:opacity-70 transition-opacity"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={26} strokeWidth={2} />
            ) : (
              <Menu size={26} strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu (framer-motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-16 left-0 w-full bg-white border-b border-neutral-primary shadow-md md:hidden flex flex-col"
          >
            {links.map((link) => (
              <NavLink
                key={link.id}
                to={link.href}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-6 py-4 text-[17px] font-medium transition-colors border-l-4 ${
                    isActive
                      ? "text-green-primary border-green-secondary bg-green-50/50" // Active state for mobile
                      : "text-gray-500 border-transparent hover:text-green-primary hover:bg-gray-50" // Inactive state
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
