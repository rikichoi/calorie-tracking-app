'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContextProvider from "@/lib/store/auth-context";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>HealthDiary</title>
      </head>
      <body className="bg-gray-50">
        <AuthContextProvider>
        <ToastContainer />
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
