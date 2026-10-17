"use client";

import { Sliders } from "lucide-react";

export function CookiePreferencesButton({ className }: { className?: string }) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || "cursor-pointer hover:underline text-left inline-flex items-center gap-1"}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        color: "inherit",
        font: "inherit",
      }}
    >
      <Sliders size={12} /> Cookie Settings
    </button>
  );
}
