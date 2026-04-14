"use client";
import { usePathname } from "next/navigation";

export const useCanonicalUrl = () => {
  const pathname = usePathname();

  return `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
};
