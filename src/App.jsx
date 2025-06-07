import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConfirmTransferPage from "./core/public/homePage/ConfirmTransferPage";
import HomePage from "./core/public/homePage/Home";
import PayInStorePage from "./core/public/homePage/PayInStorePage";
import TransferToBankPage from "./core/public/homePage/TransferToBankPage";
import PaymentsPage from "./core/public/paymentPage/PaymentPage";
import HelpSupportPage from "./core/public/profilePage/HelpSupportPage";
import NotificationsPage from "./core/public/profilePage/NotificationsPage";
import PersonalInfoPage from "./core/public/profilePage/PersonalInfoPage";
import ProfilePage from "./core/public/profilePage/ProfilePage";
import SecurityPage from "./core/public/profilePage/SecurityPage";
import SendMoneyPage from "./core/public/sendPage/SendMoneyPage";
import SendPage from "./core/public/sendPage/SendPage";
import WalletPage from "./core/public/walletPage/WalletPage";

const queryClient = new QueryClient();

function App() {
  const [balance, setBalance] = useState(() => {
    const savedBalance = sessionStorage.getItem("balance");
    if (savedBalance !== null) {
      return parseFloat(savedBalance);
    }
    sessionStorage.setItem("balance", 20000000.0);
    return 10000000.0;
  });

  const [recentActivities, setRecentActivities] = useState(() => {
    const savedActivities = localStorage.getItem("recentActivities");
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("balance");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element: (
                <HomePage
                  balance={balance}
                  setBalance={setBalance}
                  recentActivities={recentActivities}
                  setRecentActivities={setRecentActivities}
                />
              ),
            },
            {
              path: "pay-in-store",
              element: <PayInStorePage balance={balance} />,
            },
            {
              path: "/transfer-bank",
              element: <TransferToBankPage balance={balance} />,
            },
            {
              path: "/confirm-transfer",
              element: <ConfirmTransferPage balance={balance} setBalance={setBalance} />,
            },
            { path: "/send", element: <SendPage /> },
            { path: "/send-money", element: <SendMoneyPage /> },
            { path: "/profile", element: <ProfilePage /> },
            { path: "/profile/personal-info", element: <PersonalInfoPage /> },
            { path: "/profile/security", element: <SecurityPage /> },
            { path: "/profile/notifications", element: <NotificationsPage /> },
            { path: "/profile/help-support", element: <HelpSupportPage /> },
            {
              path: "/payments",
              element: (
                <PaymentsPage
                  balance={balance}
                  recentActivities={recentActivities}
                />
              ),
            },
            {
              path: "/wallet",
              element: (
                <WalletPage
                  balance={balance}
                  recentActivities={recentActivities}
                />
              ),
            },
          ])}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
