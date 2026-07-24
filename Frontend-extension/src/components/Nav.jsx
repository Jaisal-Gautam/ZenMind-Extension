import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  KeyRound,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/app/slices/auth/authThunk";
import { useTheme } from "next-themes";

function Navbar() {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const username = useSelector((state) => state.auth.user?.username);

  const links = [
    { id: 1, name: "Focus", href: "/" },
    { id: 2, name: "Analytics", href: "/analytics" },
    { id: 3, name: "Blocking", href: "/blocking" },
  ];

  const closeMobileMenu = () => setIsOpen(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const handleLogout = async () => {
    try {
      closeUserMenu();
      closeMobileMenu();
      await dispatch(logoutUser()).unwrap();
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 w-full">
      <nav className="relative z-20 flex h-16 w-full items-center justify-between border-b border-border-default bg-surface px-4 md:px-8 shadow-sm">
        {/* Logo */}
        <div className="shrink-0 flex items-center">
          <NavLink to="/" className="text-2xl font-bold text-brand">
            ZenMind
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden h-full items-center space-x-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.href}
              className={({ isActive }) =>
                `flex h-full items-center border-b-2 px-1 text-[17px] font-medium transition-colors ${
                  isActive
                    ? "border-border-brand text-brand"
                    : "border-transparent text-text-disabled hover:text-brand"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Action Section */}
        <div className="flex shrink-0 items-center space-x-3 md:space-x-4">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-default bg-surface-muted text-text-soft transition hover:bg-surface-hover hover:text-brand focus:outline-none"
            aria-label="Toggle Theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 45 : 0 }}
              transition={{ duration: 0.35, ease: easeInOut }}
              className="flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-500" />
              ) : (
                <Moon size={18} className="text-text-soft" />
              )}
            </motion.div>
          </button>

          {/* User Auth Controls */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center space-x-2 rounded-lg border border-border-default bg-surface-muted/60 px-3 py-1.5 text-sm font-medium text-text-muted transition hover:bg-surface-hover hover:text-brand focus:outline-none"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15 text-brand">
                  <User size={14} className="text-brand" />
                </div>
                <span className="max-w-25 truncate text-sm font-semibold sm:max-w-35 text-text">
                  {username || "User"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-text-disabled transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-52 rounded-xl border border-border-light bg-surface py-1.5 shadow-lg ring-1 ring-ring-subtle"
                  >
                    <NavLink
                      to="/auth/change-password"
                      onClick={closeUserMenu}
                      className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-text-muted transition hover:bg-surface-muted hover:text-brand"
                    >
                      <KeyRound size={16} className="text-gray-400" />
                      <span>Change password</span>
                    </NavLink>

                    <div className="my-1 border-t border-border-light" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center space-x-2.5 px-4 py-2.5 text-left text-sm text-danger transition hover:bg-danger-soft"
                    >
                      <LogOut size={16} className="text-danger" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink
              to="/auth/login"
              aria-label="Login"
              className="flex items-center space-x-1.5 rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium text-text-muted hover:text-brand"
            >
              <User size={18} />
              <span className="hidden sm:inline">Login</span>
            </NavLink>
          )}

          {/* Mobile Hamburger Menu Trigger */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="p-1 text-text-muted transition-opacity hover:opacity-70 md:hidden"
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

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 top-16 z-10 flex w-full flex-col border-b border-border-default bg-surface shadow-md md:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.id}
                to={link.href}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `border-l-4 px-6 py-4 text-[17px] font-medium transition-colors ${
                    isActive
                      ? "border-border-brand bg-success/10 text-brand"
                      : "border-transparent text-text-soft hover:bg-surface-muted hover:text-brand"
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