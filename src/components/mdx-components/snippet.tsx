import React, { ReactNode } from "react";
import { Caption } from "./caption";

interface SnippetProps {
  children: ReactNode;
  scroll?: boolean;
  caption?: ReactNode | null;
}

export const Snippet = ({ children, scroll = true, caption = null }: SnippetProps) => (
  <div className="my-6">
    <pre
      className={`
        p-4
        text-sm
        bg-gray-800 text-white
        dark:bg-[#222] dark:text-gray-300

        ${
          scroll
            ? "overflow-scroll"
            : "whitespace-pre-wrap break-all overflow-hidden"
        }
      `}
    >
      <code>{children}</code>
    </pre>

    {caption != null ? <Caption>{caption}</Caption> : null}
  </div>
);