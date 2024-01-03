import { A as a } from "./src/pages/articles/components/a";
import { P as p } from "./src/pages/articles/components/p";
import { H1 as h1 } from "./src/pages/articles/components/h1";
import { H2 as h2 } from "./src/pages/articles/components/h2";
import { H3 as h3 } from "./src/pages/articles/components/h3";
import { OL as ol } from "./src/pages/articles/components/ol";
import { UL as ul } from "./src/pages/articles/components/ul";
import { LI as li } from "./src/pages/articles/components/li";
import { HR as hr } from "./src/pages/articles/components/hr";
import { Code as code } from "./src/pages/articles/components/code";
// import { Tweet } from "./src/pages/articles/components/tweet";
// import { Image } from "./src/pages/articles/components/image";
import { Figure } from "./src/pages/articles/components/figure";
import { Snippet } from "./src/pages/articles/components/snippet";
import { Caption } from "./src/pages/articles/components/caption";
import { Callout } from "./src/pages/articles/components/callout";
import { YouTube } from "./src/pages/articles/components/youtube";
import { Ref, FootNotes, FootNote } from "./src/pages/articles/components/footnotes";
import { Blockquote as blockquote } from "./src/pages/articles/components/blockquote";
import MediaGrid from "./src/pages/articles/components/MediaGrid";
import { CldImage } from "next-cloudinary";

export function useMDXComponents(components: {
  [component: string]: React.ComponentType;
}) {
  return {
    ...components,
    a,
    h1,
    h2,
    h3,
    p,
    ol,
    ul,
    li,
    hr,
    code,
    pre: Snippet,
    blockquote,
    Figure,
    Snippet,
    Caption,
    Callout,
    YouTube,
    Ref,
    FootNotes,
    FootNote,
    MediaGrid,
    CldImage
  };
}