import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'flowbite/dist/flowbite.css';
import './globals.css';
import Sidebar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
export const metadata = {
  title: 'Pennywise',
  description: '',
  icons: {
    icon: '/images/logo1.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar>
          <Toaster
            toastOptions={{
              success: {
                duration: 4000,
                style: {
                  background: 'green',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  animation: 'bounceIn 1s',
                },
                icon: <i className="fas fa-circle-notch fa-spin text-xl"></i>, // Success icon
              },
              error: {
                duration: 4000,
                style: {
                  background: 'red',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  animation: 'shakeX 1s',
                },
                icon: <i className="fas fa-exclamation-circle text-xl"></i>, // Error icon
              },
            }}
          />
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
