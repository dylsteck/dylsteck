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
  const videoUrl = `${baseUrl}/video/${sortedVideos[currentState.count].id}`;

  if(name === "Next"){
    currentState = {count: currentState.count + 1}
    ctx.state.count = currentState.count;
  } else if(name === "Restart"){
    currentState = {count: 0}
    ctx.state.count = 0;
  } else if(name === "Menu"){
    currentState = {count: 0}
    ctx.state.count = 0;
  } 
  else if(name === "Back"){
    currentState = {count: currentState.count - 1}
    ctx.state.count = currentState.count;
  }

  return {
    image: sortedVideos[currentState.count].banner,
    buttons: currentState.count === 0 ? 
    [
      <Button action="post" target={{pathname: "/", query: { name: "Menu" }}}>
        Menu
      </Button>,
       <Button action="post" target={{pathname: "/video", query: { name: "Next" }}}>
        Next
       </Button>,
       <Button action="link" target={videoUrl}>Watch video</Button>
    ] : sortedVideos.length - 1 === currentState.count ? 
    [
      <Button action="post" target={{pathname: "/", query: { name: "Menu" }}}>
        Menu
      </Button>,
      <Button action="post" target={{pathname: "/video", query: { name: "Back" }}}>
        Back
      </Button>,
       <Button action="post" target={{pathname: "/video", query: { name: "Restart" }}}>
        Restart
       </Button>,
       <Button action="link" target={videoUrl}>Watch video</Button>
    ] : 
    [
      <Button action="post" target={{pathname: "/", query: { name: "Menu" }}}>
        Menu
      </Button>,
      <Button action="post" target={{pathname: "/video", query: { name: "Back" }}}>
        Back
      </Button>,
       <Button action="post" target={{pathname: "/video", query: { name: "Next" }}}>
        Next
       </Button>,
       <Button action="link" target={videoUrl}>Watch video</Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;