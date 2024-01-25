import { ReactNode } from "react";

// we use `[ul_&]` prefix for the <UL> variety
export function LI({ children }: { children: ReactNode }) {
  return (
    <li
    className={`
    [ul_&]:relative
    [ul_&]:pl-4
    [ul_&]:before:text-gray-400
    [ul_&]:before:content-"–"
    [ul_&]:before:mr-2
    [ul_&]:before:absolute
  `}
    >
      {children}
    </li>
  );
}
