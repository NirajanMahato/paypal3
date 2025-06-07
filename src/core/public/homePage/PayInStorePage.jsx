import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const PayInStorePage = ({ balance }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center mb-8 w-full max-w-md">
        <button onClick={() => navigate(-1)} className="text-sm mr-4">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold pl-3">Pay in Store</h1>
      </div>

      {/* Available Balance */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 pb-7 mb-6 w-full max-w-md flex justify-between items-center">
        <p className="text-gray-500 text-md font-medium">Available balance</p>
        <p className="text-lg font-bold text-gray-900">
          €{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Generate QR Button */}
      <button className="bg-blue-600 text-gray-200 font-semibold py-3 w-full max-w-md rounded-lg text-xl shadow-md hover:bg-blue-700 transition">
        Generate QR Code
      </button>

      {/* Agreement Text */}
      <p className="text-sm font-medium text-gray-400 text-center mt-6 max-w-md">
        By using in-store payment, you agree to PayPal's user agreement and
        privacy policy.
      </p>
      <BottomNav />
    </div>
  );
};

export default PayInStorePage;
