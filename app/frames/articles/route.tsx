/* eslint-disable react/jsx-key */
import { Button,  } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { SITE_BANNER, articles } from "app/articles/utils";
 
const handleRequest = frames(async (ctx) => {
  if (ctx.pressedButton?.action === "post") {
    ctx.state.count = ctx.state.count + 1;
  }
  return {
    image: articles[ctx.state.count ?? 0].banner,
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