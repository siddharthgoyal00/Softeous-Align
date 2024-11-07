import React, { useState } from "react";
import {
  FaCog,
  FaUserAlt,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaCalendarCheck,
  FaWallet,
} from "react-icons/fa";
import { IconType } from "react-icons";

type MenuItem = {
  name: string;
  icon: IconType;
  items?: string[];
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: FaUserAlt,
    items: ["Overview", "Stats", "Reports"],
  },
  { name: "Salary", icon: FaWallet, items: ["Monthly", "Annual", "Bonuses"] },
  {
    name: "Attendance",
    icon: FaCalendarCheck,
    items: ["Daily", "Monthly", "Yearly"],
  },
  {
    name: "Leave",
    icon: FaCalendarCheck,
    items: ["Apply", "Leave Balance", "Leave Status"],
  },
  {
    name: "Settings",
    icon: FaCog,
    items: ["Profile", "Preferences", "Security"],
  },
];

export const SidebarEmployee: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <div className={`min-h-screen `}>
      {/* Navbar with Menu Button and Theme Toggle */}
      <nav className="fixed top-0 left-0 w-full bg-gray-700 p-5 flex  justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars />
          </button>
          <h1 className="ml-4 text-white text-2xl font-semibold">
            Office Align
          </h1>
        </div>

        {/* Theme Toggle Buttons */}
      </nav>

      {/* Full-Height Sidebar */}
      <div
        className={`fixed top-20 left-0 w-64 h-full p-4 transition-transform duration-300 rounded shadow ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-10`}
        style={{ paddingTop: "56px" }}
      >
        <h2 className="text-xl font-bold mb-8"> Menu</h2>
        {/* Sidebar Menu Items with Theme-Based Hover Effect */}
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name} className="text-black">
              <div
                className={`flex items-center justify-between cursor-pointer p-2 rounded transition-colors duration-200 hover:bg-gray-300 hover:text-gray-800 `}
                onClick={() => handleDropdownToggle(item.name)}
              >
                <div className="flex items-center space-x-2">
                  <item.icon />
                  <span>{item.name}</span>
                </div>
                {item.items &&
                  (activeDropdown === item.name ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  ))}
              </div>

              {item.items && activeDropdown === item.name && (
                <ul className="pl-8 mt-2 space-y-2">
                  {item.items.map((subItem) => (
                    <li
                      key={subItem}
                      className={`text-sm rounded p-1 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800`}
                    >
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
