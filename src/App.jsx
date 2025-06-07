import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./core/public/auth/LoginPage";
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
import { Toaster } from "react-hot-toast";

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

  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("balance");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const ProtectedRoute = (element) =>
    loggedIn ? element : <Navigate to="/login" replace />;

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage setLoggedIn={setLoggedIn} />,
    },
    {
      path: "/",
      element: ProtectedRoute(
        <HomePage
          balance={balance}
          setBalance={setBalance}
          recentActivities={recentActivities}
          setRecentActivities={setRecentActivities}
        />
      ),
    },
    {
      path: "/pay-in-store",
      element: ProtectedRoute(<PayInStorePage balance={balance} />),
    },
    {
      path: "/transfer-bank",
      element: ProtectedRoute(<TransferToBankPage balance={balance} />),
    },
    {
      path: "/confirm-transfer",
      element: ProtectedRoute(
        <ConfirmTransferPage balance={balance} setBalance={setBalance} />
      ),
    },
    { path: "/send", element: ProtectedRoute(<SendPage />) },
    { path: "/send-money", element: ProtectedRoute(<SendMoneyPage />) },
    { path: "/profile", element: ProtectedRoute(<ProfilePage />) },
    {
      path: "/profile/personal-info",
      element: ProtectedRoute(<PersonalInfoPage />),
    },
    { path: "/profile/security", element: ProtectedRoute(<SecurityPage />) },
    {
      path: "/profile/notifications",
      element: ProtectedRoute(<NotificationsPage />),
    },
    {
      path: "/profile/help-support",
      element: ProtectedRoute(<HelpSupportPage />),
    },
    {
      path: "/payments",
      element: ProtectedRoute(
        <PaymentsPage balance={balance} recentActivities={recentActivities} />
      ),
    },
    {
      path: "/wallet",
      element: ProtectedRoute(
        <WalletPage balance={balance} recentActivities={recentActivities} />
      ),
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
       <Toaster position="top-center" />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
