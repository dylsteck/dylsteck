import { ReactNode } from "react";

export function OL({ children }: { children: ReactNode }) {
  return <ol className="list-decimal list-inside">{children}</ol>;
}
