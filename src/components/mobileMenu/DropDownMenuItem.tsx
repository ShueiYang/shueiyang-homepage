import { MenuItem } from "@headlessui/react";
import { LinkItemProps } from "../Navbar";
import { useLink } from "@/hooks/useLink";

//DropDownMenu Wrapper
function DropDownMenuItem({ href, children }: Readonly<LinkItemProps>) {
  const { Link, linkProps } = useLink(href);

  return (
    <MenuItem>
      <Link
        href={href}
        className={`flex items-center px-4 py-2 text-lg data-[focus]:bg-orange-200 dark:data-[focus]:bg-sea-d`}
        {...linkProps}
      >
        {children}
      </Link>
    </MenuItem>
  );
}

export default DropDownMenuItem;
