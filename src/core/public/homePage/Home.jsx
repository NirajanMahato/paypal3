import { ArrowRight } from "lucide-react"; // Nice simple arrow icon
import { useEffect, useRef, useState } from "react";
import { FaStore } from "react-icons/fa";
import { LuStore } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image1 from "../../../../public/Logo/image1.jpg";
import BottomNav from "../components/BottomNav";
import { FiArrowRight } from "react-icons/fi";

const HomePage = ({
  balance,
  setBalance,
  recentActivities,
  setRecentActivities,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const processedPayment = useRef(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({ username: "", amount: "" });
  const [showTransferSuccess, setShowTransferSuccess] = useState(false);
  const [transferData, setTransferData] = useState({});

  const handleSendClick = () => {
    navigate("/send");
  };

  useEffect(() => {
    if (location.state?.paymentSuccess && !processedPayment.current) {
      processedPayment.current = true;

      const sentAmount = parseFloat(location.state.amount);

      // Update balance
      setBalance((prevBalance) => {
        const newBalance = prevBalance - sentAmount;
        sessionStorage.setItem("balance", newBalance); // update session storage
        return newBalance;
      });

      // Add new activity
      const newActivity = {
        id: Date.now(),
        name: location.state.username,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
        amount: -sentAmount,
      };

      setRecentActivities((prevActivities) => {
        const updatedActivities = [newActivity, ...prevActivities];
        localStorage.setItem(
          "recentActivities",
          JSON.stringify(updatedActivities)
        );
        return updatedActivities;
      });

      // Show success message
      setSuccessData({
        username: location.state.username,
        amount: location.state.amount,
      });
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // Clear the navigation state to prevent re-execution
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.transferSuccess) {
      setTransferData(location.state);
      setShowTransferSuccess(true);

      setTimeout(() => {
        setShowTransferSuccess(false);
      }, 3000);

      // Clear the state after success to avoid repeat
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleClearRecent = () => {
    localStorage.removeItem("recentActivities");
    setRecentActivities([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 mb-20">
      {/* Top Logo and Profile */}
      <div className="w-full flex justify-between items-center mb-6 max-w-md">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="h-5"
        />
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
          <Link to={"/profile"}>
            <img
              src={image1}
              alt="Img"
              className="w-10 h-10 bg-cover rounded-full shadow-md"
            />
          </Link>
        </div>
      </div>

      {/* Balance Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-4">
        <p className="text-gray-500 mb-2">PayPal balance</p>
        <p className="text-3xl font-bold mb-4">
          €{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleSendClick}
            className="p-4 bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Send
          </button>
          <button className="p-4 border border-gray-300 py-2 rounded-lg font-semibold">
            Request
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-md mb-4">
        <p className="text-lg font-semibold mb-4">Quick actions</p>
        <div className="grid grid-cols-2 gap-4">
          <Link to={"/pay-in-store"}>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 px-4 py-4 hover:bg-gray-100 cursor-pointer">
              <LuStore className="text-lg mb-2" />
              <p className="text-md font-medium">Pay in store</p>
            </div>
          </Link>
          <Link to={"/transfer-bank"}>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 px-4 py-4 hover:bg-gray-100 cursor-pointer">
              <FiArrowRight className="text-lg mb-2" />
              <p className="text-md font-medium">Transfer to bank</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Recent activity</p>
          {recentActivities.length > 0 && (
            <button
              onClick={handleClearRecent}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between bg-white rounded-lg border border-gray-200 shadow-xs p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <LuStore />
                </div>
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  activity.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                €
                {Math.abs(activity.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed top-6 right-8 bg-white border border-gray-200 rounded-xl shadow-lg px-6 py-4 max-w-xs w-full">
          <p className="font-bold text-gray-900 mb-1">
            Money sent successfully
          </p>
          <p className="text-gray-700 text-sm">
            {parseFloat(successData.amount).toFixed(2)} EUR sent to{" "}
            {successData.username}
          </p>
        </div>
      )}

      {showTransferSuccess && (
        <div className="fixed top-6 right-8 bg-white border border-gray-200 rounded-xl shadow-lg px-6 py-4 max-w-xs w-full">
          <p className="font-bold text-gray-900 mb-1">
            Transfer completed successfully
          </p>
          <p className="text-gray-700 text-sm">
            {parseFloat(transferData.amount).toFixed(2)} EUR transferred to{" "}
            {transferData.bank === "your" ? "Your Bank" : "Other Bank"}
          </p>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default HomePage;
