/* eslint-disable react/jsx-key */
import { Button,  } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { videos } from "app/video/videos";
import { bannerImg, baseUrl } from "app/sitemap";


const sortedVideos = videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
 
const handleRequest = frames(async (ctx: any) => {
  let currentState: any = ctx.state;
  const name = ctx.searchParams.name;

  if (ctx.pressedButton?.action === "post_redirect") {
    return redirect(`${baseUrl}/video/${sortedVideos[currentState.count].id}`);
  }

  if(ctx.pressedButton?.index === 2 && name === "Next"){
    currentState = {count: currentState.count + 1}
    ctx.state.count = currentState.count;
  } else if(ctx.pressedButton?.index === 1){
    currentState = {count: 0}
    ctx.state.count = 0;
  }

  return {
    image: sortedVideos[currentState.count].banner,
    buttons: [
      <Button action="post" target={{pathname: "/", query: { name: "Menu" }}}>
        Menu
      </Button>,
       <Button action="post" target={{pathname: "/video", query: { name: "Next" }}}>
        Next
       </Button>,
      // <Button action="post_redirect">
      //   View Video
      // </Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;