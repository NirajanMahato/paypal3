import { LucideCreditCard, LucideKeyRound, LucideLock } from "lucide-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const SecurityPage = () => {
  const navigate = useNavigate();
  const options = [
    {
      label: "Change password",
      icon: <LucideLock className="text-xl" />,
    },
    {
      label: "Two-factor authentication",
      icon: <LucideKeyRound className="text-xl" />,
    },
    {
      label: "Manage devices",
      icon: <LucideCreditCard className="text-xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-md mr-4">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Security</h1>
      </div>

      {/* Security Options */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 flex flex-col gap-3">
        {options.map((option, idx) => (
          <div
            key={option.label}
            className={`flex justify-between items-center px-4 py-3 cursor-pointer border border-gray-200 rounded-xl hover:bg-gray-50`}
          >
            <div className="flex items-center gap-4">
              <div className="text-gray-600">{option.icon}</div>
              <p className="text-gray-900 text-[15px] font-medium">
                {option.label}
              </p>
            </div>
            <FaArrowRight className="text-gray-800 text-md" />
          </div>
        ))}
      </div>

      <p className="text-md font-normal text-gray-400 mt-8">
        Last account activity: Today at 2:30 PM GST
      </p>
      <BottomNav />
    </div>
  );
};

export default SecurityPage;
