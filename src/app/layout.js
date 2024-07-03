import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Calorie Tracking App",
  description: "Calorie Tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Navbar />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
