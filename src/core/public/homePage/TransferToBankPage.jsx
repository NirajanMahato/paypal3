import { LucideBanknote } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const TransferToBankPage = ({ balance }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("other");
  const [iban, setIban] = useState("");

  const handleTransferClick = () => {
    const transferAmount = parseFloat(amount);

    // 👉 Only navigate — do NOT update balance here
    navigate("/confirm-transfer", {
      state: {
        amount: transferAmount,
        bank: selectedBank,
        iban: selectedBank === "your" ? "DE28473712166040084048" : iban,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 flex flex-col items-center mb-20">
      {/* Header */}
      <div className="flex items-center mb-8 w-full max-w-md">
        <button onClick={() => navigate(-1)} className="text-sm mr-6">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold">Transfer to bank</h1>
      </div>

      {/* Balance and Amount Input */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 font-medium">Available balance</p>
          <p className="text-gray-900 font-bold">
            €{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Bank Selection */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-6 w-full max-w-md space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="your-bank"
            checked={selectedBank === "your"}
            onChange={() => setSelectedBank("your")}
            className="accent-blue-500 w-5 h-5"
          />
          <label
            htmlFor="your-bank"
            className="font-semibold text-lg text-gray-800 flex items-center gap-2"
          >
            <LucideBanknote className="text-blue-500 text-2xl" />
            Your bank
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="other-bank"
            checked={selectedBank === "other"}
            onChange={() => setSelectedBank("other")}
            className="accent-blue-500 w-5 h-5"
          />
          <label
            htmlFor="other-bank"
            className="font-semibold text-lg text-gray-800 flex items-center gap-2"
          >
            <LuBuilding2 className="text-blue-500 text-2xl" />
            Other bank
          </label>
        </div>

        {/* Show Details below */}
        {selectedBank === "your" && (
          <div className="pt-2">
            <p className="text-sm text-gray-400 font-medium">Your IBAN</p>
            <p className="text-md font-semibold">DE28473712166040084048</p>
            <p className="text-md font-medium text-gray-400 mt-1">
              Transfer usually arrives in 1-3 business days
            </p>
          </div>
        )}
        {selectedBank === "other" && (
          <div className="pt-2">
            <input
              type="text"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              placeholder="Enter IBAN"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-md text-gray-400 mt-1">
              Transfer to other banks may take 2-4 business days
            </p>
          </div>
        )}
      </div>

      {/* Transfer Button */}
      <button
        onClick={handleTransferClick}
        disabled={
          !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance
        }
        className="bg-blue-600 text-white w-full max-w-md rounded-lg py-3 font-bold text-lg mb-6 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {amount ? `Transfer ${amount} EUR` : "Enter Amount"}
      </button>

      {/* Terms and Conditions */}
      <p className="text-blue-600 font-semibold text-sm cursor-pointer">
        Terms and Conditions
      </p>
      <p className="text-xs font-medium text-gray-400 text-center max-w-md mt-2">
        By transferring money, you agree to PayPal's user agreement and privacy
        policy.
      </p>
      <BottomNav />
    </div>
  );
};

export default TransferToBankPage;
