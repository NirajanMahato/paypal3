import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const PersonalInfoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center mb-8 w-full max-w-md">
        <button onClick={() => navigate(-1)} className="text-md mr-4">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Personal Info</h1>
      </div>

      {/* Personal Info Box */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xs border border-gray-200 px-6 py-4 mb-8 space-y-5">
        <div>
          <p className="text-gray-500 text-md font-medium mb-1">Name</p>
          <p className="text-gray-900 text-xl font-semibold">
            Sulaiman Al Habib
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-md font-medium mb-1">Email</p>
          <p className="text-gray-900 text-xl font-semibold">
            hamzahabibi707@gmail.com
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-md font-medium mb-1">Phone</p>
          <p className="text-gray-900 text-xl font-semibold">
            +971 57 432 6745
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-md font-medium mb-1">Address</p>
          <p className="text-gray-900 text-xl font-semibold">
            123 Palm Jumeirah, Dubai, UAE
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-md font-medium mb-1">
            Date of Birth
          </p>
          <p className="text-gray-900 text-xl font-semibold">17 August 1993</p>
        </div>
      </div>

      {/* Edit Button */}
      <button className="w-full max-w-md bg-blue-600 text-white py-3 rounded-lg text-md font-semibold">
        Edit Personal Info
      </button>
      <BottomNav />
    </div>
  );
};

export default PersonalInfoPage;
