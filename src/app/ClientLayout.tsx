// app/ClientLayout.tsx
"use client";

import { Provider } from "react-redux";
import { Store } from "./redux/store";
import WhatsAppComponent from "./whatsapppage/page";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={Store}>
      {children}
      <WhatsAppComponent />
    </Provider>
  );
}
