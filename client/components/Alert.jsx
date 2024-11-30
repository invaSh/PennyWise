"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

const Alert = ({ message, messageType }) => {
  const router = useRouter();

  useEffect(() => {
    if (messageType === "success") {
      const timer = setTimeout(() => {
        router.push("/expenses");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messageType, router]);

  return (
    message && (
      <div
        className={`mb-6 p-4 rounded-lg animate__animated ${
          messageType === "success"
            ? "bg-green-500 text-white animate__bounceIn"
            : "bg-red-500 text-white animate__shakeX"
        } flex items-center justify-center gap-4`}
      >
        <div>
          {messageType === "success" ? (
            <i className="fas fa-circle-notch fa-spin text-xl"></i>
          ) : (
            <i className="fas fa-exclamation-circle text-xl"></i>
          )}
        </div>
        <p className="text-lg font-semibold text-center">{message}</p>
      </div>
    )
  );
};

export default Alert;
