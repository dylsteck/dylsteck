/* eslint-disable react/jsx-key */
import { Button,  } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "./frames";
import { SITE_BANNER } from "app/articles/utils";
 
const handleRequest = frames(async (ctx) => {
  if (ctx.pressedButton?.action === "post_redirect") {
    return redirect("https://dylansteck.com");
  }
  return {
    image: SITE_BANNER,
    buttons: [
      <Button action="post" target="/articles">
        Articles
      </Button>,
       <Button action="post" target="/notes">
        Notes
       </Button>,
      <Button action="post_redirect">
        View Site
      </Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;