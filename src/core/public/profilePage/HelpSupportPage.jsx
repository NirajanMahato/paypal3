import { BsTelephone } from "react-icons/bs"; // icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const HelpSupportPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-lg mr-4">
          <FaArrowLeft className="text-md" />
        </button>
        <h1 className="text-xl font-bold">Help & Support</h1>
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for help"
          className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3 text-sm placeholder-gray-400 font-normal focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Support Options */}
      <div className="flex flex-col gap-4 mb-6">
        {[
          {
            label: "Chat with us",
            sub: "Get instant support",
            icon: <IoChatbubbleOutline className="text-blue-600 text-3xl" />,
          },
          {
            label: "Call us",
            sub: "Speak to a representative",
            icon: <BsTelephone className="text-blue-600 text-3xl" />,
          },
          {
            label: "Email support",
            sub: "We'll respond within 24 hours",
            icon: <MdMailOutline className="text-blue-600 text-4xl" />,
          },
        ].map((item, idx) => (
          <div
            key={item.label}
            className={`flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg`}
          >
            <div className="flex items-center gap-4">
              {item.icon}
              <div>
                <p className="text-gray-900 font-semibold text-md">
                  {item.label}
                </p>
                <p className="text-gray-500 text-sm">{item.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold mb-3">Frequently Asked Questions</h2>
        {[
          "How do I send money?",
          "How long do transfers take?",
          "Is my information secure?",
        ].map((faq, index) => (
          <div
            key={index}
            className="flex justify-between items-center font-semibold bg-white rounded-xl shadow-xs border border-gray-200 px-4 py-3 cursor-pointer"
          >
            <p className="text-gray-900 text-sm">{faq}</p>
            <FaArrowRight className="text-gray-800" />
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default HelpSupportPage;
