import { IoLogoGithub, IoLogoLinkedin, IoMailOutline, IoSchoolOutline } from "react-icons/io5";
import { IconType } from 'react-icons';

export interface MenuProps {
    name: string;
    url: string;
    ioIcon: IconType;       
};

export const menuLists: MenuProps[] = [
    {
        name: "Projects",
        url: "/projects",
        ioIcon: IoSchoolOutline
    },
    {
        name: "Contact",
        url: "/contact",
        ioIcon: IoMailOutline
    },
    {
        name: "Source",
        url: "https://github.com/ShueiYang",
        ioIcon: IoLogoGithub
    },
    {
        name: "Linkdln",
        url: "https://www.linkedin.com/in/shueiyang",
        ioIcon: IoLogoLinkedin
    },
]