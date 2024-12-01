"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Alert = ({ message, messageType }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (messageType === "success") {
      const timer = setTimeout(() => {
        router.push("/expenses");
      }, 3000);
    }else{
      const timer = setTimeout(() => {
        router.push("/expenses");
      }, 1000);
    }
  }, [messageType, router]);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    message && (
      <div
        className={`mb-6 p-4 rounded-lg animate__animated ${
          messageType === "success"
            ? "bg-green-500 text-center text-white animate__bounceIn"
            : "bg-red-500 text-white animate__shakeX"
        } flex items-center justify-between gap-4`}
      >
        <div className="flex items-center gap-4">
          {messageType === "success" ? (
            <i className="fas fa-circle-notch fa-spin text-xl"></i>
          ) : (
            <i className="fas fa-exclamation-circle text-xl"></i>
          )}
          <p className="text-lg font-semibold">{message}</p>
        </div>
      </div>
    )
  );
};

export default Alert;
