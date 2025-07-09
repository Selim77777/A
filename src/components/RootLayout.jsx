import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Toaster position="top-center" />
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}