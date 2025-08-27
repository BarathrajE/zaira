"use client";

import { Provider } from "react-redux";
import { Store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import WhatsAppComponent from "./whatsapppage/page";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/_components/topArrow";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="bottom-right" richColors />
        {children}
        <ScrollToTop />
        <WhatsAppComponent />
      </PersistGate>
    </Provider>
  );
}
