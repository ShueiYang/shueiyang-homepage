import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { LinkItemProps } from "./Navbar";

type EventProps = React.MouseEvent<HTMLDivElement, MouseEvent>;

const Logo = ({ path }: Pick<LinkItemProps, "path">) => {
  const { theme } = useContext(ThemeContext);

  function handleHomeClick(event: EventProps) {
    if (path === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // set to true since Exit animation not working
  return (
    <Link href="/" scroll={true}>
      <div className="logoBox" onClick={handleHomeClick}>
        <Image
          src={`/images/mistpanda-${theme}.png`}
          alt="MistPanda logo"
          width={42}
          height={42}
        />
        <p className="ml-1 font-ibm text-lg font-medium md:text-xl">
          Kim Nguyen
        </p>
      </div>
    </Link>
  );
};

export default Logo;
