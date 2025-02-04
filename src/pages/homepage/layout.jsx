import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
};

export default RootLayout;
