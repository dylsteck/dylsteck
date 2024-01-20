import { ReactNode } from "react";
import { withHeadingId } from "./utils";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="group font-bold text-xl mt-3 mb-0 pb-0 relative">
      {withHeadingId(children)}
    </h2>
  );
}
