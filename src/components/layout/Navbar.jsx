import React from "react";
import { NavLink } from "react-router-dom";
import { User} from "lucide-react";

function Navbar() {
  const links = [
    {
      id: 1,
      name: "Analytics",
      href: "/analytics",
    },
    {
      id: 2,
      name: "Focus",
      href: "/focus",
    },
    {
      id: 3,
      name: "Blocking", 
      href: "/blocking",
    },
    {
      id: 4,
      name: "Settings",
      href: "/settings",
    },
  ];

  return (
    <nav className="w-full bg-white shadow-sm h-16 px-8 flex items-center justify-between border-b border-gray-100">
      
      {/* Logo */}
      <div className="shrink-0">
        <h2 className="text-3xl font-bold text-[#1b332b]">
          FocusFlow
        </h2>
      </div>

      {/* Center Navigation Links */}
      <div className="flex space-x-8 h-full items-center">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `text-[17px] font-medium transition-colors h-full flex items-center border-b-2 pt-1 px-1 ${
                isActive
                  ? "text-[#1b332b] border-[#1b332b]" // Active: Dark green text & underline
                  : "text-gray-500 border-transparent hover:text-[#1b332b]" // Inactive: Gray text, no underline
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center space-x-6 text-[#1b332b] shrink-0">
        <button aria-label="Profile" className="hover:opacity-70 transition-opacity">
          <User size={24} strokeWidth={2} />
        </button>

      </div>
      
    </nav>
  );
}

export default Navbar;