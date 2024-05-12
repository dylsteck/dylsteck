/* eslint-disable react/jsx-key */
import { Button,  } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { SITE_BANNER } from "app/articles/utils";
 
const handleRequest = frames(async (ctx) => {
  if (ctx.pressedButton?.action === "post_redirect") {
    return redirect("https://dylansteck.com");
  }
  return {
    image: SITE_BANNER,
    buttons: [
      <Button action="post" target="/">
        Menu
      </Button>,
       <Button action="post">
        Next
       </Button>,
      <Button action="post_redirect">
        View Article
      </Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;