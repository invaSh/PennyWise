import "animate.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'flowbite/dist/flowbite.css';
import "./globals.css";
import Sidebar from "@/components/Navbar";

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
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
