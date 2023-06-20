"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion'

interface LayoutProps {
    children: React.ReactNode;
    href: string;
    title: string;
    thumbnail: string;        
}

function PortfolioLayout({children, href, title, thumbnail}: LayoutProps) {

  return (
    <div className="w-full text-center"> 
      <motion.div 
        whileHover={{ x: 2, y: 2 }}  
        transition={{ duration: 0.1, type: 'linear'}}
        className="relative rounded-xl shadow-custom hover:shadow-none duration-100"
      >
        <Link href={href} scroll={false}>
          <Image 
            src={thumbnail}
            className="rounded-xl w-full aspect-[16/10]"
            alt={title}
            loading="lazy"
            placeholder="blur"
            blurDataURL={thumbnail}
            width={550}
            height={310}
        />
          <motion.div 
            initial={{opacity: 0}}
            whileHover={{opacity: 1}}
            transition={{ duration: 0.3, type: 'easeInOut'}}
            className="absolute w-full h-full rounded-xl inset-0 bg-blackhover"
          >
            <span className="relative top-1/3 font-ibm text-lg text-[#FFFFFF]">
              Voir en détail 
            </span>
          </motion.div>
        </Link> 
      </motion.div>
        <p className="mt-4 text-xl font-ibm font-semibold">{title}</p>
        <p className="my-2">{children}</p>
    </div>
  )
}

export default PortfolioLayout;       