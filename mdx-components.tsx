import { A as a } from "./src/components/mdx-components/a";
import { P as p } from "./src/components/mdx-components/p";
import { H1 as h1 } from "./src/components/mdx-components/h1";
import { H2 as h2 } from "./src/components/mdx-components/h2";
import { H3 as h3 } from "./src/components/mdx-components/h3";
import { OL as ol } from "./src/components/mdx-components/ol";
import { UL as ul } from "./src/components/mdx-components/ul";
import { LI as li } from "./src/components/mdx-components/li";
import { HR as hr } from "./src/components/mdx-components/hr";
import { Code as code } from "./src/components/mdx-components/code";
import { Figure } from "./src/components/mdx-components/figure";
import { Snippet } from "./src/components/mdx-components/snippet";
import { Caption } from "./src/components/mdx-components/caption";
import { Callout } from "./src/components/mdx-components/callout";
import { YouTube } from "./src/components/mdx-components/youtube";
import { Ref, FootNotes, FootNote } from "./src/components/mdx-components/footnotes";
import { Blockquote as blockquote } from "./src/components/mdx-components/blockquote";
import MediaGrid from "./src/components/mdx-components/MediaGrid";
import { CldImage } from "next-cloudinary";
import { ArticleMetaTags } from "./src/components/mdx-components/ArticleMetaTags";
import MintOnZora from "./src/components/MintOnZora";
import Cast from "./src/components/mdx-components/cast";

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
    CldImage,
    ArticleMetaTags,
    MintOnZora,
    Cast
  };
}