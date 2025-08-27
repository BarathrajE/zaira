import { Loader2 } from "lucide-react";
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
