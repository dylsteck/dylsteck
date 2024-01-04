import Link from "next/link";
import { ReactNode } from "react";

export type AProps = {
  children: ReactNode;
  className?: string;
  href: string;
  id?: string;
}

export function A({ children, className = "", href, id, ...props }: AProps) {
  if (href[0] === "#") {
    return (
      <a
        href={href}
        className={`border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600  dark:border-gray-500 dark:hover:border-white ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href} className={`border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600  dark:border-gray-500 dark:hover:border-white ${className}`}>
        {/* <a
          className={`border-b text-gray-600 border-gray-300 transition-[border-color] hover:border-gray-600  dark:border-gray-500 dark:hover:border-white ${className}`}
          {...props}
        >
          {children}
        </a> */}
        {children}
      </Link>
    );
  }
}