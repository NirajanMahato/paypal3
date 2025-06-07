import {
  LucideBell,
  LucideCreditCard,
  LucideHelpCircle,
  LucideShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import image1 from "../../../../public/Logo/image1.jpg";
import BottomNav from "../components/BottomNav";
import Switch from "../components/Switch";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const options = [
    {
      label: "Security",
      icon: <LucideShieldCheck className="text-xl" />,
      route: "/profile/security",
    },
    {
      label: "Payment methods",
      icon: <LucideCreditCard className="text-xl" />,
      route: "/payments",
    },
    {
      label: "Notifications",
      icon: <LucideBell className="text-xl" />,
      route: "/profile/notifications",
    },
    {
      label: "Help & Support",
      icon: <LucideHelpCircle className="text-xl" />,
      route: "/profile/help-support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div></div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="h-6"
        />
      </div>

      {/* User Info */}
      <div className="flex items-center mb-8 gap-4">
        <img
          src={image1}
          alt="Img"
          className="w-16 h-16 bg-cover rounded-full shadow-md"
        />
        <div>
          <h1 className="text-xl font-semibold">Sulaiman Al Habib</h1>
          <p className="text-gray-400 font-semibold text-sm">
            habibulaiman009@gmail.com
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-6 space-y-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => navigate("/profile/personal-info")}
        >
          <p className="text-md font-medium">Personal info</p>
          <IoIosArrowForward className="text-gray-400 text-xl" />
        </div>
        <div className=" border-b border-gray-200"></div>
        <div className="flex justify-between items-center">
          <p className="text-md font-medium">Two-factor authentication</p>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={(val) => setTwoFactorEnabled(val)}
          />
        </div>
      </div>

      {/* More Options */}
      <div className="flex flex-col gap-2">
        {options.map((option, idx) => (
          <div
            key={option.label}
            onClick={() => navigate(option.route)}
            className={`flex justify-between items-center py-3 px-4 cursor-pointer bg-white rounded-xl  border border-gray-200 ${
              idx !== options.length - 1 ? "border-b border-gray-200" : ""
            } hover:bg-gray-50`}
          >
            <div className="flex items-center gap-4">
              <div className="text-gray-600">{option.icon}</div>
              <p className="text-gray-900 text-[15px] font-medium">
                {option.label}
              </p>
            </div>
            <IoIosArrowForward className="text-gray-800 text-lg" />
          </div>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-3 mt-8 bg-red-500 text-gray-200 rounded-xl shadow-md py-3 font-semibold">
        <FiLogOut className="text-lg" />
        <h1>Log out</h1>
      </button>

      <p className="text-xs font-medium text-gray-400 text-center mt-6">
        PayPal Services in UAE are provided by PayPal Pte. Ltd., a Singaporean
        company.
      </p>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
