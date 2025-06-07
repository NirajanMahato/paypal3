import { useState } from "react";
import { FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { dummyUsers } from "../../../dummydata/user"; // Import your dummy data
import BottomNav from "../components/BottomNav";

const PaymentsPage = ({ balance, recentActivities }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Send");

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="h-6"
        />
      </div>

      {/* Balance */}
      <div className="mb-6">
        <p className="text-gray-500 text-sm mb-1">PayPal balance</p>
        <p className="text-3xl font-bold">
          €
          {parseFloat(balance).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 p-1 rounded-full">
        {["Send", "Bills", "Request"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`flex-1 py-2 text-center rounded-full text-sm font-medium ${
              tab === item ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Name, username or email"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
        />
        <button className="border border-gray-300 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10.442 10.442a1 1 0 0 1-1.415 0L7 8.414 4.973 10.44a1 1 0 1 1-1.415-1.414L5.586 7 3.56 4.973a1 1 0 0 1 1.414-1.415L7 5.586l2.027-2.028a1 1 0 1 1 1.415 1.415L8.414 7l2.028 2.027a1 1 0 0 1 0 1.415z" />
          </svg>
        </button>
      </div>

      {/* Recent Contacts */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Recent contacts</h2>
          <button className="text-blue-600 text-sm font-medium">See All</button>
        </div>
        <div className="flex overflow-x-auto gap-4">
          {dummyUsers.slice(0, 6).map((user) => (
            <div key={user.username} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mb-2">
                {user.username.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-xs text-center truncate w-16">{user.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-md font-semibold mb-4">Recent transactions</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FaStore />
                </div>
                <div>
                  <p className="font-semibold">{activity.name}</p>
                  <p className="text-sm text-gray-500">
                    Sent · Completed <br />
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-red-500 font-semibold">
                -€
                {Math.abs(activity.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PaymentsPage;
