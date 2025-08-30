"use client";

import * as React from "react";
import { Toaster } from "sonner";

export const AppToaster: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        style: {
          borderRadius: "12px",
          padding: "12px 16px",
          fontWeight: 500,
          fontSize: "14px",
          background: "#fff", // blends with your UI
          color: "#111",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    />
  );
};
