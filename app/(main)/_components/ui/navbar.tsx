"use client";
import React, { useState, useRef, useEffect } from "react";
import Logo from "../logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/careers", label: "Careers" },
  ];

  const servicesMenu = [
    {
      href: "/mobile-app-development",
      label: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
    },
    {
      href: "/web-app-development",
      label: "Web App Development",
      description: "Custom web solutions tailored to your needs",
    },
    {
      href: "/custom-software-development",
      label: "Custom Software Development",
      description: "Bespoke software solutions for your business",
    },
    {
      href: "/bpo-solutions",
      label: "BPO Solutions",
      description: "Reliable Business Process Outsourcing solutions",
    },
  ];

  // Close desktop services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-50 w-full pt-5">
      <div className="max-w-screen-2xl mx-auto w-[80%] flex items-center justify-between py-6">
        <Logo />

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-5   bg-[#5e05a600] bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-90 px-4 border border-[#FFFFFF14] rounded-full text-base font-medium p-1">
          {links.slice(0, 1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "bg-white/90 text-primary rounded-full px-2 -ml-3"
                  : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop Services Dropdown */}
          <div
            className="relative"
            ref={menuRef}
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            {/* Hover buffer */}
            <div className="absolute -bottom-4 left-0 w-full h-4" />

            <button
              className={`flex items-center gap-1 ${
                pathname.startsWith("/services") ? "text-primary" : "text-white"
              } transition-colors`}
            >
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-[13%] mt-2 w-[300px] bg-black border border-white/10 rounded-2xl p-3 space-y-1">
                {servicesMenu.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className={`block p-3 rounded-lg transition-all hover:bg-[#5E05A6]/30 ${
                      pathname === service.href
                        ? "bg-[#5E05A6]/30 text-white"
                        : "text-white"
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      {service.label}
                    </div>
                    <p className="text-xs text-[#9B96B0]">
                      {service.description}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.slice(1, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "bg-white/90 text-primary rounded-full px-2"
                  : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Contact Button */}
        <Link
          href={"/contact-us"}
          className="bg-linear-to-l md:block hidden transition-all ease-linear hover:shadow-[0px_0px_30px_0px_rgba(132,14,205,1)] bg-[#5E05A6] text-sm shadow-[0px_0px_30px_0px_rgba(132,14,205,0.25)] from-[#FFFFFF]/20 to-[#FFFFFF73]/10 text-white border-2 border-[#840ECD] px-4 py-1 rounded-full"
        >
          {" "}
          Contact Us{" "}
        </Link>

        {/* Mobile Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>

          <SheetContent className="bg-black text-white p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <Logo />
              {/* <SheetClose asChild>
                <button>
                  <X className="w-6 h-6 text-white" />
                </button>
              </SheetClose> */}
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-4">
              {links.slice(0, 1).map((link) => (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`text-white text-lg ${
                      pathname === link.href ? "text-primary" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}

              {/* Mobile Services */}
              <div className="flex flex-col gap-2">
                <button
                  className="flex items-center justify-between text-white text-lg w-full"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="flex flex-col gap-2 pl-4">
                    {servicesMenu.map((service) => (
                      <SheetClose key={service.href} asChild>
                        <Link
                          href={service.href}
                          className="text-white text-sm"
                        >
                          {service.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                )}
              </div>

              {links.slice(1).map((link) => (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`text-white text-lg ${
                      pathname === link.href ? "text-primary" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            {/* Mobile Contact */}
            <SheetClose asChild>
              <Link
                href={"/contact-us"}
                className="mt-auto bg-[#5E05A6] text-white px-4 py-2 rounded-full text-center"
              >
                Contact Us
              </Link>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
