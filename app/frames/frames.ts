import { State } from "app/types";
import { createFrames } from "frames.js/next";
 
export const frames = createFrames<State>({
  initialState: {
    count: 0,
  },
  basePath: "/frames",
});