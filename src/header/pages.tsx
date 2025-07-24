import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, Menu, Search, ShoppingCart, UserRound } from "lucide-react";

const Header = () => {
  return (
    <header className="p-4 bg-[#f1f5f4]">
      {/* leftSide */}
      <div className="flex justify-between items-center">
        <div className="bg-[#f1f5f4]">
          <Sheet>
            <SheetTrigger className="block ">
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-[30px] bg-[#535e51] p-3 mt-10 text-[#f1f5f4]">
                  ZAIRA
                </SheetTitle>

                <SheetDescription>
                  <div className="flex gap-4 overflow-y-auto h-[calc(100vh-150px)] text-2xl">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="cat-1">
                        <AccordionTrigger className="text-black">
                          MAN
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-white shadow-md">
                          <Accordion type="single" collapsible className="w-full">
                            {/* --- Secondary Category Example --- */}
                            <AccordionItem value="sub-1">
                              <AccordionTrigger className="text-sm text-[#052659] underline underline-offset-4">
                                SHIRTS
                              </AccordionTrigger>

                              <AccordionContent className="grid grid-cols-1 gap-4 mt-2 text-[#052659]">
                                {/* --- Tertiary Items Example --- */}
                                <div className="flex items-center gap-2 text-sm">
                                  <span>Printed Shirt</span>
                                </div>

                                {/* --- Shop by Color --- */}
                                <div className="flex items-center gap-2 text-sm">
                                  <span>Polo Shirt</span>
                                </div>

                                {/* --- Shop by Pattern --- */}
                                <div className="flex items-center gap-2 text-sm">
                                  <span>Denim Shirt</span>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="cat-2">
                        <AccordionTrigger className="text-black">
                          WOMEN
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-white shadow-md">
                          <Accordion type="single" collapsible className="w-full">
                            {/* --- Secondary Category Example --- */}
                            <AccordionItem value="sub-2">
                              <AccordionTrigger className="text-sm text-[#052659] underline underline-offset-4">
                                T-SHIRTS
                              </AccordionTrigger>

                              <AccordionContent className="grid grid-cols-1 gap-4 mt-2 text-[#052659]">
                                {/* --- Tertiary Items Example --- */}
                                <div className="flex items-center gap-2 text-sm">
                                  <span>Sleeveless</span>
                                </div>

                                {/* --- Shop by Color --- */}
                                <div className="flex items-center gap-2 text-sm">
                                  <span>Half sleeves</span>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <h1 className="text-[30px]">ZAIRA</h1>
        <div className="flex gap-5 cursor-pointer">
          <Search />
          <UserRound />
          <Heart />
          <ShoppingCart />
        </div>
      </div>
    </header>
  );
};
export default Header;
