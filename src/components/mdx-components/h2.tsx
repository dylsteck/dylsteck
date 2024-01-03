import { ReactNode } from "react";
import { withHeadingId } from "./utils";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="group font-bold text-xl my-8 relative">
      {withHeadingId(children)}
    </h2>
  );
}
