"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // or Heroicons if you prefer

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  // Toggle button visibility on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed sm:bottom-30 bottom-33 z-50 sm:right-10 right-7 p-3 rounded-full bg-[#535e51] text-[#f1f5f4] shadow-lg hover:bg-[#3c473d] transition-colors duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
