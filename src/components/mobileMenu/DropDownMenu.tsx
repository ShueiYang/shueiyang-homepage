import { MenuProps } from "@/constants/menu.Index";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { IoMenu } from "react-icons/io5";

import DropDownMenuItem from "./DropDownMenuItem";

interface MenuListsProps {
  MENU_LISTS: MenuProps[];
}

export default function DropDownMenu({ MENU_LISTS }: Readonly<MenuListsProps>) {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        <MenuButton
          className="inline-flex justify-center rounded-md border border-zinc-400 bg-orange-50 px-2 py-2
            text-sm font-medium shadow-sm transition-all hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-zinc-500
            focus:ring-offset-2 focus:ring-offset-gray-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-violet-500 dark:focus:ring-indigo-500"
          aria-label="menu"
        >
          <IoMenu className="h-5 w-5" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-zinc-400 rounded-md
          border border-zinc-400 bg-orange-50 shadow-xl ring-1 ring-black ring-opacity-5 
          transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:divide-zinc-700 dark:border-zinc-700 dark:bg-zinc-800"
        >
          <div className="py-3">
            {MENU_LISTS.map((item) => {
              const Icon = item.ioIcon;
              return (
                <DropDownMenuItem href={item.url} key={item.name}>
                  <Icon className="mr-2" />
                  {item.name}
                </DropDownMenuItem>
              );
            })}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
