/* eslint-disable react/jsx-key */
import { Button,  } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "./frames";
import { bannerImg } from "app/sitemap";
 
const handleRequest = frames(async (ctx) => {
  // if (ctx.pressedButton?.action === "post_redirect" && ctx.pressedButton?.index === 3) {
  //   return redirect("https://dylansteck.com");
  // }
  return {
    image: bannerImg,
    buttons: [
      <Button action="post" target={{pathname: "/blog", query: { name: "Blog" }}}>
        Blog
      </Button>,
       <Button action="post" target={{pathname: "/video", query: { name: "Video" }}}>
        Videos
       </Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;