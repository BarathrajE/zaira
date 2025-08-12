"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles, Package, ArrowRight, Home } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
interface PaymentSuccessDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  goToOrderPage: () => void;
  goToHome: () => void;
}

export default function PaymentSuccessDialog({
  isOpen,
  setIsOpen,
  goToOrderPage,
  goToHome,
}: PaymentSuccessDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed z-50 inset-0 flex items-center justify-center px-4"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-w-md w-full">
              {/* Header */}
              <div className="px-8 pt-12 pb-8 text-center bg-gradient-to-br from-green-50 to-emerald-50">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                    delay: 0.3,
                  }}
                  className="w-20 h-20 mx-auto mb-6 relative"
                >
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2"
                >
                  Payment Successful!
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                </motion.h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                  Your payment has been processed successfully. What would you
                  like to do next?
                </p>
              </div>

              {/* Buttons */}
              <div className="px-8 pb-8 pt-4 space-y-4">
                <motion.button
                  onClick={goToOrderPage}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Package className="w-5 h-5" />
                    View Your Orders
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.button>

                <motion.button
                  onClick={goToHome}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-2xl border border-gray-200"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Home className="w-5 h-5" />
                    Return to Home
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
