import Header from "@/header/pages";
import Slide from "../_components/page"
import Footer from "@/footer/page";
import WhatsAppComponent from "./whatsapppage/page";


export default function Home() {
  return (
    <>
      
      <Header />
      <Slide />
      <WhatsAppComponent />
      <Footer />
    </>
  );
}
