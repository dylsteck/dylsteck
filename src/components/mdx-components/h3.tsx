import { ReactNode } from "react";
import { withHeadingId } from "./utils";

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="group font-bold text-lg my-8 relative">
      {withHeadingId(children)}
    </h3>
  );
}
