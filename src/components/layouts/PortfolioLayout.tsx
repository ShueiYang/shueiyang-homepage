"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  href: string;
  title: string;
  thumbnail: string;
}

const PortfolioLayout: React.FC<LayoutProps> = ({
  children,
  href,
  title,
  thumbnail,
}) => {
  // const titleName = title.replace(/\s/g, "-");

  return (
    <div className="w-full text-center">
      <motion.div
        whileHover={{ x: 2, y: 2 }}
        transition={{ duration: 0.1, type: "linear" }}
        className="relative rounded-xl shadow-custom duration-100 hover:shadow-none"
      >
        <Link
          href={href}
          // as={`/projects/${titleName}`}
          scroll={false}
        >
          <Image
            src={thumbnail}
            className="aspect-[16/10] w-full rounded-xl"
            alt={title}
            loading="lazy"
            placeholder="blur"
            blurDataURL={thumbnail}
            width={550}
            height={310}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, type: "easeInOut" }}
            className="absolute inset-0 h-full w-full rounded-xl bg-blackhover"
          >
            <span className="relative top-1/3 font-ibm text-lg text-[#FFFFFF]">
              Voir en détail
            </span>
          </motion.div>
        </Link>
      </motion.div>
      <p className="mt-4 font-ibm text-xl font-semibold">{title}</p>
      <p className="my-2">{children}</p>
    </div>
  );
};

export default PortfolioLayout;
