import { MenuProps } from "@/constants/menu.Index";
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react";
import { IoMenu } from "react-icons/io5";

import DropDownMenuItem from "./DropDownMenuItem";

interface MenuListsProps {
    menuLists: MenuProps[]
};

function DropDownMenu({ menuLists }: MenuListsProps) {
    
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center rounded-md border bg-orange-50 dark:bg-zinc-900 border-zinc-400 dark:border-zinc-700
            px-2 py-2 text-sm font-medium shadow-sm hover:bg-orange-300 dark:hover:bg-violet-500 focus:outline-none
            focus:ring-2 focus:ring-zinc-500 dark:focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all"
          aria-label="menu"
        >
          <IoMenu className="h-5 w-5"/>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border
          border-zinc-400 dark:border-zinc-700 bg-orange-50 dark:bg-zinc-800 shadow-xl ring-1 ring-black 
          ring-opacity-5 focus:outline-none divide-zinc-400 dark:divide-zinc-700 "
        >
          <div className="py-3">
            { menuLists.map(item => {
              const Icon = item.ioIcon
              return (
                <DropDownMenuItem href={item.url} key={item.name}>
                  <Icon className="mr-2"/>
                  {item.name}
                </DropDownMenuItem> 
              )
            })}   
          </div>
        </Menu.Items>
      </Transition> 
    </Menu>          
  )
}

export default DropDownMenu;