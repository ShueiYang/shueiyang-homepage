"use client";

import { usePathname } from "next/navigation"
import DropDownMenu from "./mobileMenu/DropDownMenu";

import Logo from "./Logo";
import NextLink from "next/link";
import ThemeToggleButton from "./customButton/ThemeButton";
import { menuLists } from "@/constants/menu.Index";
import { ThemeContext } from "@/components/themeContext/ThemeProvider";
import { useContext, useEffect, useState } from "react";
import { getLinkAndProps } from "@/utils/utility";


export interface LinkItemProps {
    children: React.ReactNode;
    path?: string;
    href: string;
}

//Higher order component as Navbar component wrapper
const LinkItem = ({ children, href, path }: LinkItemProps) => {
  const active = path === href;
  const { Link, linkProps } = getLinkAndProps(href);
  return (
    <Link
      href={href}
      className={`flex items-center py-2 md:px-0.5 lg:px-2 rounded hover:underline underline-offset-4
        ${active ? "bg-orange-300 dark:bg-[#8f6cf9]" : "" }`
      }
      {...linkProps}
    >
      {children}
    </Link>
  );
}


const Navbar = () => {
  const path = usePathname();
  const { theme } = useContext(ThemeContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
      setIsMounted(true)
  }, []);

  return isMounted ? (
    <nav
      className={`fixed w-screen z-50 backdrop-blur flex items-center
        ${theme === "light" ? "bg-gradient-to-r from-sand-l to-grn-l"
        : "bg-gradient-to-r from-purp-d to-sea-d"}`
      }
    >
      <div className="container flex flex-wrap p-2 xl:max-w-5xl">
        <div className="flex items-center mr-5 md:mr-8 lg:ml-4 lg:mr-8">
          <h1 className="text-lg tracking-tight lg:tracking-normal">
            <Logo path={path} />
          </h1>
        </div>
        <div className="hidden md:flex flex-col md:flex-row w-full md:w-auto 
          grow justify-around items-center text-base lg:text-lg"
        >
          { menuLists.map(menu => {    
          // assign the name for the reactIcon component
            const Icon = menu.ioIcon
            if(menu.name !== "BackOffice") {
              return (
                <LinkItem href={menu.url} path={path} key={menu.name}>
                {(menu.name === "Source" || menu.name === "Linkdln") &&
                  <Icon className="mr-0.5" />
                }
                  {menu.name}
                </LinkItem>
              )
            }
            return null;
          })}      
        </div>
        <div className="flex flex-nowrap justify-end md:justify-center gap-4 grow items-center">
          <div>
            <ThemeToggleButton />
          </div>
          <div className="inline-block md:hidden mr-2">
            <DropDownMenu menuLists={menuLists} />
          </div>
        </div>
      </div>
      <NextLink
        href="/backoffice/admin"
        className="absolute right-[5%] hidden xl:block text-lg hover:underline underline-offset-4"
      >
        BackOffice    
      </NextLink>      
    </nav>

  ) : <div />
}

export default Navbar;            