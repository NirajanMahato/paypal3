import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuStore } from "react-icons/lu";
import { MdOutlineQrCode2 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { dummyUsers } from "../../../dummydata/user"; // Import your dummy data
import BottomNav from "../components/BottomNav";

const PaymentsPage = ({ balance, recentActivities }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Send");

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Payments</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="h-6"
        />
      </div>

      {/* Balance */}
      <div className="mb-6">
        <p className="text-gray-600 text-md font-normal mb-1">PayPal balance</p>
        <p className="text-3xl font-bold">
          €
          {parseFloat(balance).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
        {["Send", "Bills", "Request"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`flex-1 py-2 text-center rounded-lg text-sm font-medium ${
              tab === item ? "bg-white text-black" : "text-gray-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center justify-between mb-6 w-full">
        <div className="flex w-full items-center gap-2 border bg-white border-gray-300 rounded-lg px-4 py-2 mr-2">
          <FiSearch className="text-gray-400" />
          <input type="text" placeholder="Name, username or email" />
        </div>
        <button className="border border-gray-300 p-2.5 bg-white rounded-lg">
          <MdOutlineQrCode2 className="text-xl" />
        </button>
      </div>

      {/* Recent Contacts */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent contacts</h2>
          <button className="text-blue-600 text-sm font-medium">See All</button>
        </div>
        <div className="flex overflow-x-auto gap-4">
          {dummyUsers.slice(0, 6).map((user) => (
            <div key={user.username} className="flex flex-col items-center">
              <div className="w-[73px] h-[73px] rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl  mb-2">
                {user.username.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-sm font-medium text-center truncate w-16">
                {user.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent transactions</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between bg-white rounded-xl shadow-xs p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl">
                  <LuStore />
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
