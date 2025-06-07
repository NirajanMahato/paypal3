import { FiHome } from "react-icons/fi";
import { IoCardOutline } from "react-icons/io5";
import { LuUser, LuWallet } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <FiHome /> },
    { name: "Wallet", path: "/wallet", icon: <LuWallet /> },
    { name: "Payments", path: "/payments", icon: <IoCardOutline /> },
    { name: "Profile", path: "/profile", icon: <LuUser /> },
  ];

  return (
    <div className="fixed bottom-0 pb-5 left-0 w-full bg-white border-t border-t-gray-300 shadow-md flex justify-around py-2 md:px-96 px-0 z-50">
      {navItems.map((item) => (
        <div
          key={item.name}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center justify-center cursor-pointer px-3 py-2 rounded-xl ${
            location.pathname === item.path
              ? "text-blue-600 bg-blue-100"
              : "text-gray-500"
          }`}
        >
          <div
            className={`text-2xl mb-1 ${
              location.pathname === item.path ? "rounded-full" : ""
            }`}
          >
            {item.icon}
          </div>
          <span className="text-xs font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
