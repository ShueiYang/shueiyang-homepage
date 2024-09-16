import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { LinkItemProps } from "./Navbar";

type LogoProps = Pick<LinkItemProps, "path">;
type EventProps = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const Logo: React.FC<LogoProps> = ({ path }) => {
  const { theme } = useContext(ThemeContext);

  function handleHomeClick(event: EventProps) {
    if (path === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link href="/" scroll={false}>
      <button type="button" className="logoBox" onClick={handleHomeClick}>
        <Image
          src={`/images/mistpanda-${theme}.png`}
          alt="MistPanda logo"
          width={42}
          height={42}
        />
        <p className="ml-1 font-ibm text-lg font-medium md:text-xl">
          Kim Nguyen
        </p>
      </button>
    </Link>
  );
};

export default Logo;
