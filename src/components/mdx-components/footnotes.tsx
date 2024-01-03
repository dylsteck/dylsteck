import React, { ReactNode } from "react";
import { A, type AProps } from "./a";
import { P } from "./p";

interface FootNotesProps {
  children: ReactNode;
}

export const FootNotes = ({ children }: FootNotesProps) => (
  <div className="text-base before:w-[200px] before:m-auto before:content[''] before:border-t before:border-gray-300 dark:before:border-[#444] before:block before:my-10">
    {children}
  </div>
);

interface RefProps {
  id: string;
}

export const Ref = ({ id }: RefProps) => (
  <a
    href={`#f${id}`}
    id={`s${id}`}
    className="relative text-xs top-[-5px] no-underline"
  >
    [{id}]
  </a>
);

interface FootNoteProps {
  id: string;
  children: ReactNode;
}

export const FootNote = ({ id, children }: FootNoteProps) => (
  <P>
    {id}.{" "}
    <A href={`#s${id}`} id={`f${id}`} className="no-underline">
      ^
    </A>{" "}
    {children}
  </P>
);