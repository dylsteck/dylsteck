import { ReactNode } from "react";

export function UL({ children }: { children: ReactNode }) {
  return <ul className="list-inside list-disc flex flex-col">{children}</ul>;
}
