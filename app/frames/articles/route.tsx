/* eslint-disable react/jsx-key */
import { Button,  } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { SITE_BANNER } from "app/consts";
import { articles } from "app/blog/articles/articles";

const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
 
const handleRequest = frames(async (ctx) => {
  let currentState = ctx.state;

  if (ctx.pressedButton?.action === "post_redirect") {
    return redirect(`https://dylansteck.com/articles/${sortedArticles[currentState.count].id}`);
  }

  if(ctx.pressedButton?.index === 2){
    currentState = {count: currentState.count + 1}
    ctx.state.count = currentState.count;
  } else if(ctx.pressedButton?.index === 1){
    currentState = {count: 0}
    ctx.state.count = 0;
  }

  return {
    image: sortedArticles[currentState.count].banner,
    buttons: [
      <Button action="post" target="/">
        Menu
      </Button>,
       <Button action="post" target="/articles">
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
