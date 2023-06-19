import Image from "next/image"
import Link from "next/link"
import { useContext } from "react";
import { ThemeContext } from "@/components/themeContext/ThemeProvider";
import { LinkItemProps } from "./Navbar";



const Logo = ({ path }: Pick<LinkItemProps, "path">) => {

    const { theme } = useContext(ThemeContext);

    function handleHomeClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (path === "/") {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    return (
        <Link href="/" scroll={false}>
            <div className="logoBox" onClick={handleHomeClick}>
                <Image
                    src={`/images/mistpanda-${theme}.png`}
                    alt="MistPanda logo"
                    width={42}
                    height={42}
                />
                <p className="font-ibm font-medium text-lg md:text-xl ml-1">
                    Kim Nguyen
                </p>
            </div>
        </Link>
    )
}

export default Logo;