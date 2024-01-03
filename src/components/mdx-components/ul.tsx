import { ReactNode } from "react";

export function UL({ children }: { children: ReactNode }) {
  return <ul className="my-5 list-none list-inside">{children}</ul>;
}
