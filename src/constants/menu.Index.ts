import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
  IoSchoolOutline,
  IoKey,
} from "react-icons/io5";
import { IconType } from "react-icons";

export interface MenuProps {
  name: string;
  url: string;
  ioIcon: IconType;
}

export const MENU_LISTS: MenuProps[] = [
  {
    name: "Projects",
    url: "/projects",
    ioIcon: IoSchoolOutline,
  },
  {
    name: "Contact",
    url: "/contact",
    ioIcon: IoMailOutline,
  },
  {
    name: "Source",
    url: "https://github.com/ShueiYang/shueiyang-homepage",
    ioIcon: IoLogoGithub,
  },
  {
    name: "Linkdln",
    url: "https://www.linkedin.com/in/shueiyang",
    ioIcon: IoLogoLinkedin,
  },
  {
    name: "BackOffice",
    url: "/backoffice/admin",
    ioIcon: IoKey,
  },
];
