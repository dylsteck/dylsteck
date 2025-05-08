---
title: 'Cortex One Pager'
publishedAt: '2024-09-04'
summary: 'I'm building a new product called Cortex, Notion-style blocks for Farcaster data. Below is a one-pager on the concept and its progress.'
---

I'm building a new product called [Cortex](https://withcortex.com), Notion-style blocks for Farcaster data. Below is a one-pager on the concept and its progress:

### Motivation
As [Farcaster](https://farcaster.xyz) has grown, the amount of data tied to your profile has expanded. It’s no longer limited to just hub data -- now there's data from several ecosystem apps such as [Eventcaster](https://events.xyz) for events, [Bountycaster](https://bountycaster.xyz) for bounties, [Zora](https://zora.co) for mints, [Icebreaker](https://icebreaker.xyz) for connections, [Paragraph](https://paragraph.xyz) for articles, [Receipts](https://receipts.xyz) for workouts, [Unlonely](https://unlonely.app) for streams, and more. This data is scattered across different platforms, making it challenging for users to manage or interact with it in a cohesive way.

There’s a growing demand for better composability and interoperability between these apps. Many developers have stepped back from building full Farcaster clients because the ecosystem is fragmented or too niche to offer immediate business opportunities. However, there’s still a strong need for tools that enable users to make better use of their personal Farcaster data, even if they don’t want to commit to building entire clients.

Currently, apps like [Warpcast](https://warpcast.com) promote other apps through the Explore tab and experiment with different surfaces areas for apps(including composer actions and frames), but they don’t serve as a unified home for managing data and actions across these apps. What’s missing is an interface that can act as both a library for data and a place to execute actions, similar to how an operating system provides unified control across services.

For a focused community like Farcaster’s, having more seamless access to and integration between these data sources could greatly enhance user experience and productivity. As the ecosystem continues to grow, the need for tools that provide a more unified and composable way to engage with Farcaster data is becoming increasingly evident. By offering a central interface to manage and interact with this data, workflows would be streamlined, enabling users to fully capitalize on the ecosystem’s expanding potential.

### Concept
I've started building a set of **Notion-style blocks** designed for interacting with Farcaster-related data. They'll range all the way from Farcaster components like feeds, profiles, and frames to Icebreaker profile content to Zora mints to DAO auctions to composer actions or other embeddable mini-apps. The hope is that if I can create blocks that span enough use cases that I can test out a set of different interfaces that would make best use of these blocks. 

### Experiments
The first experiment I'm building was inspired by [a cast from Dan Romero about an idea](https://warpcast.com/dwr.eth/0xc05b0d94) for a Chrome extension that could show top Farcaster content in a sidebar. Inspired by that cast and [a 30 minute experiment I ran after reading it](https://warpcast.com/dylsteck.eth/0xa5290dba), I'm going to make a Chrome sidepanel extension that lets you vertically stack these blocks as if they're widgets. If you're a macOS user, imagine the widget stacking on your right sidebar but in your browser and filled with Farcaster-related data.

I want to center my attention on testing a small number of things in the first experiment so I can use whatever goes well to keep moving forward, but there are also certainly other experiment ideas I'm super excited to get to.

The main idea I want to get to and am bullish on with these blocks is a [v0.dev](https://v0.dev) or [Claude Artifacts](https://claude.ai)-style tool that can generate fully new Farcaster mini-apps with these blocks. Not only do I think that the underlying tech is getting so much better to the point where this is feasible, but I also think being able to type in suggestions/commands is a much more intuitive way to make or do something. 

### Next Steps

I'm hoping to get my first experiment(the Chrome sidepanel extension) out within the next week or so and I've also created this group chat where I'll be sharing progress & having conversations with those interested in the project -- feel free to [join here on Warpcast!](https://warpcast.com/~/group/CZHFhJi6dSfW8mw2PKi1RQ)