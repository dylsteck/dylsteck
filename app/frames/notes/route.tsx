/* eslint-disable react/jsx-key */
import { Button,  } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { SITE_BANNER } from "app/consts";
import { notes } from "app/blog/notes/notes";
 
const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;

  if (ctx.pressedButton?.action === "post_redirect") {
    return redirect(`https://dylansteck.com/notes/${notes[currentState.count].id}`);
  }

  if(ctx.pressedButton?.index === 2){
    currentState = {count: currentState.count - 1}
    ctx.state.count = currentState.count;
  }
  else if(ctx.pressedButton?.index === 3 && currentState.count !== notes.length - 1){
    currentState = {count: currentState.count + 1}
    ctx.state.count = currentState.count;
  } else if(ctx.pressedButton?.index === 1){
    currentState = {count: 0}
    ctx.state.count = 0;
  }

  return {
    image: notes[currentState.count].banner,
    buttons: [
      <Button action="post" target="/">
        Menu
      </Button>,
       <Button action="post" target="/notes">
        Next
       </Button>,
      <Button action="post_redirect">
        View Note
      </Button>
    ]
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;