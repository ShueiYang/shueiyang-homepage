"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getLinkAndProps } from "@/utils/utility";

import { ThemeContext } from "@/providers/ThemeProvider";
import { MENU_LISTS } from "@/constants/menu.Index";
import Logo from "./Logo";
import ThemeToggleButton from "@/components/customButton/ThemeButton";
import DropDownMenu from "@/components/mobileMenu/DropDownMenu";

export interface LinkItemProps {
  children: React.ReactNode;
  path?: string;
  href: string;
}

// Higher order component as Navbar component wrapper
const LinkItem: React.FC<LinkItemProps> = ({ children, href, path }) => {
  const active = path === href;
  const { Link, linkProps } = getLinkAndProps(href);
  return (
    <Link
      href={href}
      className={`flex items-center rounded py-2 underline-offset-4 hover:underline md:px-0.5 lg:px-2
        ${active ? "bg-orange-300 dark:bg-[#8f6cf9]" : ""}`}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const path = usePathname();
  const { theme } = useContext(ThemeContext);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration trick to display correct gradient color theme on Navbar
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <nav
      className={`fixed z-50 flex w-screen items-center backdrop-blur
        ${
          theme === "light"
            ? "bg-gradient-to-r from-sand-l to-grn-l"
            : "bg-gradient-to-r from-purp-d to-sea-d"
        }`}
    >
      <div className="container flex flex-wrap p-2 xl:max-w-5xl">
        <div className="mr-5 flex items-center md:mr-8 lg:ml-4 lg:mr-8">
          <h1 className="text-lg tracking-tight lg:tracking-normal">
            <Logo path={path} />
          </h1>
        </div>
        <div
          className="hidden w-full grow flex-col items-center justify-around 
          text-base md:flex md:w-auto md:flex-row lg:text-lg"
        >
          {MENU_LISTS.map((menu) => {
            // assign the name for the reactIcon component
            const Icon = menu.ioIcon;
            if (menu.name !== "BackOffice") {
              return (
                <LinkItem href={menu.url} path={path} key={menu.name}>
                  {(menu.name === "Source" || menu.name === "Linkdln") && (
                    <Icon className="mr-0.5" />
                  )}
                  {menu.name}
                </LinkItem>
              );
            }
            return null;
          })}
        </div>
        <div className="flex grow flex-nowrap items-center justify-end gap-4 md:justify-center">
          <div>
            <ThemeToggleButton />
          </div>
          <div className="mr-2 inline-block md:hidden">
            <DropDownMenu MENU_LISTS={MENU_LISTS} />
          </div>
        </div>
      </div>
      <NextLink
        href="/backoffice/admin"
        className="absolute right-[5%] hidden text-lg underline-offset-4 hover:underline xl:block"
      >
        BackOffice
      </NextLink>
    </nav>
  ) : (
    <div />
  );
}
