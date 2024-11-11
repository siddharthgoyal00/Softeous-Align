import React, { useState } from "react";
import { FaCog, FaUserAlt, FaChevronDown, FaChevronUp, FaCalendarCheck, FaWallet, FaBars } from "react-icons/fa";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";


type MenuItem = {
  name: string;
  icon: IconType;
  items?: { name: string; route: string }[];
};

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: FaUserAlt,
    items: [
      { name: "Overview", route: "/dashboard/overview" },
      { name: "Stats", route: "/dashboard/stats" },
      { name: "Reports", route: "/dashboard/reports" },
    ],
  },
  {
    name: "Salary",
    icon: FaWallet,
    items: [
      { name: "Monthly", route: "/salary/monthly" },
      { name: "Annual", route: "/salary/annual" },
      { name: "Bonuses", route: "/salary/bonuses" },
    ],
  },
  {
    name: "Attendance",
    icon: FaCalendarCheck,
    items: [
      { name: "Mark Attendance", route: "/attendance/mark" },
      { name: "Attendance Overview", route: "/attendance/overview" },
    ],
  },
  {
    name: "Leave",
    icon: FaCalendarCheck,
    items: [
      { name: "Apply", route: "/leave/apply" },
      { name: "Leave Balance", route: "/leave/balance" },
      { name: "Leave Status", route: "/leave/status" },
    ],
  },
  {
    name: "Settings",
    icon: FaCog,
    items: [
      { name: "Profile", route: "/settings/profile" },
      { name: "Logout", route: "/home" }, // Home page on logout
    ],
  },
];

export const SidebarEmployee: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const handleNavigation = (route: string) => {
    if (route === "/home") {
      // Check which token is present in localStorage
      if (localStorage.getItem("AdminToken")) {
        // If Admin is logging out
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      } else if (localStorage.getItem("employeeToken")) {
        // If Employee is logging out
        localStorage.removeItem("employeeToken");
        navigate("/home"); // Redirect to home
      } else {
        // Fallback to home if no token is found (additional safeguard)
        navigate("/home");
      }
    } else {
      navigate(route);
    }
  };

  return (
    <div className={`min-h-screen`}>
       <nav className="fixed top-0 left-0 w-full bg-gray-700 p-5 flex  justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars />
          </button>
          <h1 className="ml-4 text-white text-2xl font-semibold">
            Office Align
          </h1>
        </div>
      </nav>

      {/* Full-Height Sidebar */}
      <div
        className={`fixed top-20 left-0 w-64 h-full p-4 transition-transform duration-300 rounded shadow ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-10`}
        style={{ paddingTop: "56px" }}
      >
        <h2 className="text-xl font-bold mb-8">Menu</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name} className="text-black">
              <div
                className="flex items-center justify-between cursor-pointer p-2 rounded transition-colors duration-200 hover:bg-gray-300 hover:text-gray-800"
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
                      key={subItem.name}
                      className="text-sm rounded p-1 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800"
                      onClick={() => handleNavigation(subItem.route)}
                    >
                      {subItem.name}
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
