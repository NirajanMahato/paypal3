import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Switch from "../components/Switch";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="text-lg mr-4">
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Push Notifications</p>
            <p className="text-sm text-gray-500">
              Receive notifications on your device
            </p>
          </div>
          <Switch checked={push} onCheckedChange={setPush} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500">Receive updates via email</p>
          </div>
          <Switch checked={email} onCheckedChange={setEmail} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">SMS Notifications</p>
            <p className="text-sm text-gray-500">
              Receive text messages for important updates
            </p>
          </div>
          <Switch checked={sms} onCheckedChange={setSms} />
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold">
        Update Preferences
      </button>
      <BottomNav />
    </div>
  );
};

export default NotificationsPage;
