// app/ClientLayout.tsx
"use client";

import { Provider } from "react-redux";
import { Store } from "./redux/store";
import WhatsAppComponent from "./whatsapppage/page";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={Store}>
       <Toaster position="top-right" richColors />
      {children}
      <WhatsAppComponent />
    </Provider>
  );
}
