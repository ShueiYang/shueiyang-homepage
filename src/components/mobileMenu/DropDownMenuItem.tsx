import { Menu } from '@headlessui/react'
import { LinkItemProps } from "../Navbar";
import { getLinkAndProps } from "@/utils/utility";


//DropDownMenu Wrapper
function DropDownMenuItem ({ href, children }: LinkItemProps ) {
  const { Link, linkProps } = getLinkAndProps(href);
  
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={ `flex items-center px-4 py-2 text-lg
            ${active? "bg-orange-200 dark:bg-sea-d": ""}`
          }
          {...linkProps}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  )
}

export default DropDownMenuItem;