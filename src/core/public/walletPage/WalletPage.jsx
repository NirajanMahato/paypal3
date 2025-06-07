import { useState } from "react";
import { FiCreditCard } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import BottomNav from "../components/BottomNav";

const WalletPage = ({ balance, recentActivities }) => {
  const [tab, setTab] = useState("wallet");

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 mb-20 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="h-6"
        />
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center w-full mb-6">
        <div className="flex justify-between w-full bg-gray-100 rounded-lg p-1 max-w-md">
          <button
            onClick={() => setTab("wallet")}
            className={`px-4 py-1.5 w-1/2 rounded-lg text-sm font-semibold ${
              tab === "wallet" ? "bg-white text-gray-900" : "text-gray-400"
            }`}
          >
            Wallet
          </button>
          <button
            onClick={() => setTab("activity")}
            className={`px-4 py-1.5 w-1/2 rounded-lg text-sm font-semibold ${
              tab === "activity" ? "bg-white text-gray-900" : "text-gray-400"
            }`}
          >
            Activity
          </button>
        </div>
      </div>

      {/* Wallet Tab */}
      {tab === "wallet" && (
        <>
          {/* Wallet Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white w-full max-w-md mb-6 shadow-md">
            <div className="flex justify-between">
              <p className="text-md text-gray-200">Current Balance</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal Logo"
                className="h-5"
              />
            </div>
            <p className="text-3xl font-bold mb-6">
              €{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <div className="mt-10">
              <p className="text-lg text-gray-100">4111 1111 1111 1111</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-gray-300">
                <p>Expires</p>
                <p>12/25</p>
              </div>
              <div className="text-sm text-gray-200 font-semibold">
                JOHN DOE
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="w-full max-w-md mb-6 space-y-4">
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <LuArrowDownToLine className="text-xl text-gray-800" />
                <p className="font-medium text-gray-800">Add money</p>
              </div>
              <IoIosArrowForward className="text-gray-800 text-lg" />
            </div>
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <LuArrowUpFromLine className="text-xl text-gray-800" />
                <p className="font-medium text-gray-800">Transfer to bank</p>
              </div>
              <IoIosArrowForward className="text-gray-800 text-lg" />
            </div>
          </div>

          {/* Currencies */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-4 flex flex-col mb-6">
            <p className="text-gray-800 font-semibold text-lg">Currencies</p>
            <div className="flex justify-between items-center mt-1">
              <div>
                <p className="text-gray-800 text-lg font-semibold mt-1">
                  EUR Balance
                </p>
                <p className="text-gray-400 text-xs font-normal">Primary</p>
              </div>
              <p className="font-bold text-lg text-gray-900">
                €
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-md font-semibold text-blue-600 cursor-pointer mt-4">
            Terms and Conditions
          </p>
        </>
      )}

      {/* Activity Tab */}
      {tab === "activity" && (
        <div className="flex flex-col w-full max-w-md gap-4">
          {recentActivities.length === 0 ? (
            <p className="text-gray-500 text-center">No recent activity</p>
          ) : (
            recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FiCreditCard className="text-xl" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
                <p className="font-semibold text-red-500">
                  -€
                  {Math.abs(activity.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default WalletPage;
