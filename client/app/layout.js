import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Pennywise",
  description: "",
  icons: {
    icon: "/images/logo1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
