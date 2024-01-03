import { ReactNode } from "react";

export function OL({ children }: { children: ReactNode }) {
  return <ol className="my-5 list-decimal list-inside">{children}</ol>;
}
