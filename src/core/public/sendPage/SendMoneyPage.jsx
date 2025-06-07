import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function SendMoneyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "unknown";

  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSend = () => {
    setSending(true);

    setTimeout(() => {
      navigate("/", { state: { paymentSuccess: true, username, amount } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-2 pt-6">
      {/* Header */}
      <div className="w-full flex items-center max-w-md mb-8">
        <button onClick={handleBack} className="text-xl mr-4">
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Send money</h1>
      </div>

      {/* User Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm py-8 md:px-6 px-2 flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold mb-4">
          {username.slice(0, 2).toUpperCase()}
        </div>
        <p className="text-lg font-medium mb-6">{username.toLowerCase()}</p>

        {/* Amount Input */}
        <div className="flex items-center border rounded-lg px-4 py-3 w-full justify-between text-4xl font-bold text-gray-900 focus-within:ring-2 focus-within:outline-offset-2 focus-within:ring-blue-500">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            inputMode="decimal" // optional: on mobile shows number pad
            className="w-full bg-transparent outline-none text-center"
          />
          <span className="text-lg font-semibold text-gray-500 ml-2">EUR</span>
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!amount || parseFloat(amount) <= 0 || sending}
        className={`w-full max-w-md rounded-lg py-3 text-white text-lg font-semibold transition ${
          !amount || parseFloat(amount) <= 0 || sending
            ? "bg-blue-200 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {sending
          ? "Sending..."
          : `Send ${amount ? parseFloat(amount).toFixed(2) : "0.00"} EUR`}
      </button>

      {/* Terms */}
      <p className="text-blue-600 text-sm mt-6 underline cursor-pointer">
        Terms and Conditions
      </p>
      <p className="text-xs text-gray-500 mt-4 text-center max-w-xs">
        By sending money, you agree to PayPal's user agreement and privacy
        policy.
      </p>
    </div>
  );
}
