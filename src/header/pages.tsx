/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import OTPLoginDialog from "../app/authform/page";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { menuGetAction } from "@/app/redux/action/menu/menuGet";
import { submenuGetAction } from "@/app/redux/action/menu/submenu";
import { fetchSubmenusAction } from "@/app/redux/action/menu/collection";

interface SubMenuItem {
  name: string;
  description: string;
  imageUrl: string;
  _id: string;
}

interface MenuItem {
  name: string;
  subMenus: SubMenuItem[];
  __v: number;
  _id: string;
}

const Header = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Load menus and static submenus
  useEffect(() => {
    dispatch(menuGetAction());
    dispatch(submenuGetAction());
  }, [dispatch]);

  // ✅ Check login token
  useEffect(() => {
    const token = Cookies.get("accessToken");
    setHasToken(!!token);
  }, []);

  // ✅ Hide search input on outside click
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

  const handleClick = () => {
    const token = Cookies.get("accessToken");
    if (token) {
      router.push("/profile");
    } else {
      setOtpDialogOpen(true);
    }
  };

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  const goTowishlistPage = () => handleNavigation("/wishlist");
  const goTocartPage = () => handleNavigation("/cart");
  const goTohomepage = () => router.push("/");

  // ✅ Menus with submenus from Redux
  const menuData = useSelector(
    (state: RootState) => state.menuGet.menu
  ) as MenuItem[];

  const menuWithSubmenus = menuData.map((menu: MenuItem) => ({
    menuId: menu._id,
    menuName: menu.name,
    subMenus: menu.subMenus,
  }));

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center opacity-80">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-[#535e51]" />
        <p className="text-[#535e51] font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="sticky top-0 z-50 bg-[#535e51] px-2 py-1 md:p-5">
        <div className="flex md:justify-between items-center w-full md:gap-0 gap-10">
          {/* Mobile Drawer */}
          <div className="text-[#f1f5f4]">
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
                    <Accordion
                      type="single"
                      collapsible
                      value={openItem}
                      onValueChange={setOpenItem}
                      className="w-full"
                    >
                      {menuWithSubmenus.map((menu) => (
                        <AccordionItem
                          key={`menu-${menu.menuId}`}
                          value={`menu-${menu.menuId}`}
                        >
                          <AccordionTrigger className="text-base font-medium text-black">
                            {menu.menuName}
                          </AccordionTrigger>
                          <AccordionContent className="bg-gray-50">
                            {menu.subMenus.length > 0 ? (
                              <ul className="pl-4 space-y-2">
                                {menu.subMenus.map((sub) => (
                                  <li
                                    key={`sub-${sub._id}`}
                                    className="text-sm text-[#052659] underline underline-offset-4 cursor-pointer hover:text-blue-600"
                                    onClick={() => {
                                      dispatch(fetchSubmenusAction(menu.menuId)); // ✅ Pass menuId
                                      router.push(`/menu/${menu.menuId}/submenus`);
                                    }}
                                  >
                                    {sub.name}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="pl-4 text-gray-500 text-sm">
                                No submenus available
                              </p>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div
            className="sm:text-[48px] text-[35px] font-bold text-[#f1f5f4] cursor-pointer mt-1 sm:mt-0"
            onClick={goTohomepage}
          >
            ZAIRA
          </div>

          {/* Right icons */}
          <Button
            className="bg-transparent text-[#f1f5f4] sm:hidden ms-28"
            onClick={handleClick}
          >
            <UserRound className="w-6 h-6 cursor-pointer" />
          </Button>

          <div className="hidden md:flex gap-5 items-center">
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setShowInput((prev) => !prev)}
                className="p-2 bg-transparent cursor-pointer"
                data-search="true"
              >
                <Search className="text-[#f1f5f4] w-5 h-5" />
              </button>
              {showInput && (
                <Input
                  type="text"
                  placeholder="Search"
                  autoFocus
                  className="lg:w-2xl w-2xs rounded-lg py-2 px-3 shadow-md transition-all duration-300 bg-white text-black placeholder-gray-500"
                  data-search-input="true"
                />
              )}
            </div>
            <UserRound
              className="text-[#f1f5f4] w-5 h-5 cursor-pointer"
              onClick={handleClick}
            />
            <Heart
              className="text-[#f1f5f4] w-5 h-5 cursor-pointer"
              onClick={goTowishlistPage}
            />
            <ShoppingCart
              className="text-[#f1f5f4] w-5 h-5 cursor-pointer"
              onClick={goTocartPage}
            />
          </div>
        </div>

        {/* Mobile bottom nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#535e51] sm:hidden px-6 py-2 shadow-md">
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setShowInput(true)}
              className="bg-transparent text-[#f1f5f4]"
            >
              <Search className="w-6 h-6 cursor-pointer" />
            </Button>
            <Button
              className="bg-transparent text-[#f1f5f4]"
              onClick={goTowishlistPage}
            >
              <Heart className="w-6 h-6 cursor-pointer" />
            </Button>
            <Button
              className="bg-transparent text-[#f1f5f4]"
              onClick={goTocartPage}
            >
              <ShoppingCart className="w-6 h-6 cursor-pointer" />
            </Button>
          </div>
          {showInput && (
            <div className="fixed top-0 left-0 w-full bg-[#f7f7e8] z-50 p-4 shadow-lg rounded-b-lg">
              <div className="flex bg-[#f7f7e8] rounded-lg px-4 py-2 shadow-md border border-gray-300">
                <Input
                  type="text"
                  placeholder="Search"
                  className="flex-1 bg-transparent outline-none px-2 text-sm text-gray-800"
                  autoFocus
                />
                <Button
                  className="bg-transparent"
                  onClick={() => setShowInput(false)}
                >
                  <X className="text-gray-500 w-5 h-5" />
                </Button>
              </div>
              <div className="mt-3 bg-[#fdfdf4] rounded-lg shadow-md p-4">
                <p className="text-xs text-gray-500 tracking-widest font-semibold mb-2">
                  MOST SEARCHED
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Do Nothing</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <OTPLoginDialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen} />
    </>
  );
};

export default Header;
