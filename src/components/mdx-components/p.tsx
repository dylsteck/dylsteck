import { ReactNode } from "react";

export function P({ children }: { children: ReactNode }) {
  return <p className="my-1 [blockquote_&]:my-2">{children}</p>;
}
