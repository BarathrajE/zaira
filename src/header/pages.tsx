"use client";
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
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest('[data-search="true"]') &&
        !target.closest('[data-search-input="true"]')
      ) {
        setShowInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="p-4 bg-[#535e51] sticky top-0 z-50">
      {/* leftSide */}
      <div className="flex flex-row justify-between items-center w-full">
        {/* Left - Menu + Drawer */}
        <div className="bg-[#535e51] text-[#f1f5f4] sm:order-1 order-1">
          <Sheet>
            <SheetTrigger className="block">
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
                      {/* MAN */}
                      <AccordionItem value="cat-1">
                        <AccordionTrigger className="text-black">
                          MAN
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-white shadow-md">
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="sub-1">
                              <AccordionTrigger className="text-sm text-[#052659] underline underline-offset-4">
                                SHIRTS
                              </AccordionTrigger>
                              <AccordionContent className="grid grid-cols-1 gap-4 mt-2 text-[#052659]">
                                <div className="text-sm">Printed Shirt</div>
                                <div className="text-sm">Polo Shirt</div>
                                <div className="text-sm">Denim Shirt</div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </AccordionContent>
                      </AccordionItem>

                      {/* WOMEN */}
                      <AccordionItem value="cat-2">
                        <AccordionTrigger className="text-black">
                          WOMEN
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-white shadow-md">
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="sub-2">
                              <AccordionTrigger className="text-sm text-[#052659] underline underline-offset-4">
                                T-SHIRTS
                              </AccordionTrigger>
                              <AccordionContent className="grid grid-cols-1 gap-4 mt-2 text-[#052659]">
                                <div className="text-sm">Sleeveless</div>
                                <div className="text-sm">Half sleeves</div>
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

        {/* Center - Title */}
        <div className="text-[30px] text-[#f1f5f4] font-bold sm:order-2 order-2 mt-2 sm:mt-0">
          ZAIRA
        </div>

        {/* Right - Icons + Search */}
        <div className="flex gap-5 justify-center items-center cursor-pointer sm:order-3 order-3">
          <div className="relative flex items-center gap-2">
            <button
              data-search="true"
              onClick={() => setShowInput((prev) => !prev)}
              className="p-2 shadow-xl rounded-full"
            >
              <Search className="text-[#f1f5f4]" />
            </button>

            {/* Desktop Search Input */}
            {showInput && (
              <input
                data-search-input="true"
                type="text"
                placeholder="Search"
                autoFocus
                className="hidden sm:block placeholder-white rounded-lg px-4 py-2 shadow-md transition-all duration-300 bg-white text-black"
              />
            )}
          </div>

          <UserRound className="text-[#f1f5f4]" />
          <Heart className="text-[#f1f5f4]" />
          <ShoppingCart className="text-[#f1f5f4]" />
        </div>

        {/* Mobile Search Input: Below the title */}
        {showInput && (
          <div className="sm:hidden fixed top-0 left-0 w-full bg-[#f7f7e8] z-50 p-4 shadow-lg rounded-b-lg">
            {/* Search Bar */}
            <div className="flex items-center bg-[#f7f7e8] rounded-lg px-4 py-2 shadow-md border border-gray-300">
              <Search className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-800"
                autoFocus
              />
              <button onClick={() => setShowInput(false)}>
                <X className="text-gray-500 w-5 h-5" />
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-3 bg-[#fdfdf4] rounded-lg shadow-md p-4">
              <p className="text-xs text-gray-500 tracking-widest font-semibold mb-2">
                MOST SEARCHED
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li> Do Nothing</li>
                
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
