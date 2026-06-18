"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1a1a1a",
          color: "#f5f5f5",
          border: "1px solid #d4af37",
          borderRadius: "8px",
          padding: "16px",
          fontFamily: "inherit",
        },
        success: {
          iconTheme: {
            primary: "#d4af37",
            secondary: "#1a1a1a",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#1a1a1a",
          },
        },
      }}
    />
  );
}
