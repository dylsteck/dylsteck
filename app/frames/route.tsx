/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "./frames";
import { bannerImg, baseUrl } from "app/sitemap";
 
const handleRequest = frames(async (ctx) => {
  let currentState: any = ctx.state;
  const name = ctx.searchParams.name;
  if(name === "Menu" && currentState.count !== 0){
    currentState = {count: 0}
    ctx.state.count = 0;
  }
  return {
    image: bannerImg,
    buttons: [
      <Button action="post" target={{pathname: "/blog", query: { name: "Blog" }}}>
        Blog
      </Button>,
       <Button action="post" target={{pathname: "/video", query: { name: "Video" }}}>
        Videos
       </Button>,
       <Button action="link" target={baseUrl}>View site</Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;