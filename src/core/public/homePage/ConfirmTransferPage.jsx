import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmTransferPage = ({ balance, setBalance }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { amount, bank, iban } = state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmTransfer = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Reduce balance
      const newBalance = balance - amount;
      setBalance(newBalance);
      sessionStorage.setItem("balance", newBalance);

      // Navigate and pass success state
      navigate("/", {
        state: {
          transferSuccess: true,
          amount,
          bank,
          iban,
        },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center mb-8 w-full max-w-md">
        <button onClick={() => navigate(-1)} className="text-sm mr-6">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold">Confirm Transfer</h1>
      </div>

      {/* Transfer Details */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-xs border border-gray-200 p-6 w-full max-w-md mb-6">
        <p className="text-3xl font-bold mb-2">
          €{parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p className="text-md font-medium text-gray-500">
          to {bank === "your" ? "Your Bank Account" : "Other Bank"}
        </p>
        <p className="text-sm font-medium text-gray-400 mt-1">IBAN: {iban}</p>
      </div>

      {/* Fee and Total */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-md font-medium text-gray-500">Fee</p>
          <p className="text-md text-gray-900 font-semibold">€0.00</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-bold text-gray-800">Total</p>
          <p className="text-lg font-bold text-gray-900">
            €{parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirmTransfer}
        disabled={isProcessing}
        className={`${
          isProcessing ? "bg-blue-300" : "bg-blue-600"
        } text-white w-full max-w-md rounded-lg py-3 font-bold text-lg mb-6 disabled:cursor-not-allowed`}
      >
        {isProcessing ? "Processing..." : "Confirm Transfer"}
      </button>

      {/* Protection Notice */}
      <p className="text-gray-500 text-md px-2 mb-4">
        Your transfer is protected by PayPal's Seller Protection
      </p>

      {/* Terms */}
      <p className="text-blue-600 font-semibold text-sm cursor-pointer">
        Terms and Conditions
      </p>
      <p className="text-xs font-medium text-gray-400 text-center max-w-md mt-8">
        By confirming this transfer, you agree to PayPal's user agreement and privacy policy.
      </p>
    </div>
  );
};

export default ConfirmTransferPage;
