---
title: 'Embedded apps'
publishedAt: '2025-10-21'
summary: 'An update on how app stores are forming inside of other apps, both in crypto and AI'
---

New tech paradigms require ways for end users to access them in order for their consumer usage to truly blow up, and both crypto and AI are getting this with their own embedded app stores. 

**In crypto:** [Base](https://base.org), [Farcaster](https://farcaster.xyz), [World](https://world.org), and [Telegram](https://telegram.org) have mini app platforms with direct wallet connections and [as wallets have been going social](/blog/when-wallets-meet-social) these mini apps help give users one place to find and do things in crypto.

**In AI:** [Anthropic](https://anthropic.com), [Google](https://google.com), and _especially_ [OpenAI](https://openai.com) have been trying to create the "app store" for how LLMs interact with your tools and personal data. From [ChatGPT Plugins](https://openai.com/index/chatgpt-plugins/) to [MCP servers](https://www.anthropic.com/news/model-context-protocol) to the most recent [ChatGPT Apps SDK](https://openai.com/index/introducing-apps-in-chatgpt/) and even [Instant Checkout](https://openai.com/index/buy-it-in-chatgpt/), these companies are trying to figure out what this connection looks like both for servers and user interfaces.

My day job is working on mini apps at Base with [Base app](https://base.app) and our suite of developer tools, and funny enough before this I was working on products for [Farcaster Frames](https://dtech.vision/farcaster/frames/), so for the past few years now I've been focused on embedded apps. In this post I want to go over what I've been seeing in these two ecosystems I've been watching closely, what I think they can actually learn from each other, and question if embedded apps are even the right model.

## Embedded everything

If you take a step back and look at what's happening in tech right now, there's a clean pattern: platforms are trying to become meta-platforms/app stores for third-party apps. It's not just about building super apps, it's about building the operating system layer for specific verticals.

This shift is happening for a few key reasons:

**1. App store friction**. Apple and Google's 30% tax and rigid review processes have pushed developers to look for other ways to distrubute their software. The EU's Digital Markets Act forcing Apple to allow alternative app stores is just the beginning(although we haven't seen that in effect yet), but that's just the begining. Developers want to distribute their apps on their terms and monetize their work: that's what the open web is supposed to be for!

The frustration here is real and being felt by builders who increasingly need to distrubte software in an era where the time to production is dropping rapidly. [Los](https://x.com/downloadlos) from [Danger Testing](https://x.com/dangertesting), who ships an app "at the speed of culture" every week, recently got hit with the "Guideline 4.2 - Design - Minimum Functionality" rejection in an Apple App Store review—a catch-all that essentially means "we decided this shouldn't exist but won't tell you why." After working for 6 days straight on an app, he got a rejection saying it was "not app like."

<Tweet id="1976701536643252487" />

What's wild is that AI coding tools have made it easier than ever to build apps—teams like Danger Testing are proof of this. But there's a mismatch between how fast you can create and how long approval takes. We're in this moment where AI has democratized creation, but the traditional review process wasn't designed for this velocity -- or as Los puts it, the "non shipper losers" haven't caught up yet.

This is exactly why embedded apps are exploding—they route around the bottleneck. Mini apps on Farcaster and Base deploy instantly and just work. The distribution matches the creation speed.

**2. Context is king**. When you open a mini app in Farcaster or Base, it already knows who you are. Your wallet is auto connected and mini app sessions have the context of: who you are, where you opened the mini app from, your onchain interactions, and your social graph.

This isn't just about convenience -- it fundamentally changes what's possible. Because the mini app knows where you opened it from, it can adapt its interface based on whether you're coming from a post, a group chat, or browsing the app directory. Your onchain interactions mean it can offer personalized experiences without asking questions—a DeFi mini app knows your positions, an NFT mini app knows your collection. Your social graph turns every mini app into a multiplayer experience by default. Compare that to a traditional app where you're a blank slate until you manually recreate all this context through forms, OAuth flows, and permission grants that most users abandon halfway through.

ChatGPT is trying to build a similar experience for using your everyday apps right inside of a chat -- especially with their most recent announcements of their Apps SDK and Instant Checkout. With these updates, ChatGPT isn't just using MCP servers to connect to apps but it's also rendering UI from other apps right inside of the chat so you don't have to go anywhere. They also recognize the importance of these actions taking place in an embedded context, and they're trying to figure out the best form factor so that you ultimately end up using ChatGPT for most things you want to do(like your new OS).

**3. Network effects on steroids**: When someone shares a mini app in a group chat or social feed, everyone can instantly use it. No app store links, no downloads, no friction. Just tap and go. 

On Base, mini apps spread through the social feed and group chats in Base App, where your wallet is already connected and your friends can see what you're doing. The friction between discovery and usage basically disappeared.

In AI, this same dynamic is starting to emerge. When ChatGPT introduces a new feature or GPT, it's immediately available to all users—no update required, no new download. The platform updates, and everyone has access. Imagine if every time you shared an AI workflow or custom GPT, your friends could instantly try it in their own context with their own data, just like how mini apps work in Farcaster and Base. That's the promise of embedded AI apps -- distribution at the speed of conversation.

## Crypto's embedded ecosystem

In consumer crypto there has been one goal on everyone's mind: get more users and drive more usage towards apps and protocols. The latest trend, which seems to be the convergence of this goal, is wallets adding social graphs and social apps adding wallets. 

The effects of this shift are:

- It makes each wallet/social app feel more like an everything app: one place to discover, trade, and share
- It has led to the rise of open app stores/platforms within these apps, notably the Farcaster mini app spec that Base has also been building on top of, which brings apps developers are building even closer to users and removes distribution friction
<br/>

<Cast url="https://farcaster.xyz/dylsteck.eth/0xb87cf233" />

### Everything apps

The convergence is happening from both sides. Wallets like Base and Zapper are adding social feeds, showing you what your friends are trading and minting. Social apps like Farcaster are adding wallets, making every interaction potentially economic.

What makes this powerful is how much context collapses and as you find things throughout the app you can just engage in them. Whether it's a coin your friend just bought, a trending app, a livestream, or a new creator, everything's just one tap away.

Base App is a clear example of this convergence. Open it and you see a social feed, but every post can become a content coin. There's an entire app store-like tab dedicated to surfacing top mini apps. Group chats are not only fully secure using XMTP, but with agents and mini apps they become engaging group chats with your friends. It's simultaneously a social app, a wallet, a marketplace, and an app store -- the type of "everything app" that crypto has been trying to build, finally making sense because all the pieces (social graph, onchain identity, embedded apps) came together at once.

This is what the [crypto super app](/blog/crypto-super-app) was supposed to be. Not one company building every feature, but an open protocol stack where social and economic naturally interweave. Where the feed isn't just content but actions you can take. Where your wallet isn't just an asset list but a social identity.

### App platforms

The second effect is that these everything apps needed an app store model, but not Apple's app store. They needed permissionless distribution where apps inherit context and spread socially.

Enter Farcaster mini apps. The spec is quite simple: a web app with a manifest file that declares its identity and capabilities. That's the bare minimum for your app to work across any Farcaster client, including Base App, with access to the user's wallet, social graph, onchain history, and a [rich SDK](https://miniapps.farcaster.xyz) for building out your mini app.

Base builds on this foundation, using Farcaster mini apps as the core infrastructure in Base App. But we're adding layers specifically for the creator economy: gasless transactions via Paymaster so apps don't need users to hold ETH, content coins so every post can be an economic primitive, and deep integration with the Base L2 so onchain actions feel instant.

The developer experience is what makes this explosive. You build with normal web tech (HTML/CSS/JavaScript), deploy anywhere (your own domain, Vercel, wherever), and instantly have distribution through Farcaster's social graph and Base App's millions of users. Someone uses your mini app, it shows up in their feed, their friends see it and try it—social distribution without needing to build social features yourself. Plus with the rich functions in the mini app SDK, developers can easily:

- trigger wallet actions, no "connect wallet" needed
- build ways for to get apps shared and monetized
- even send notifications to re-engage users

And crucially: no app store review. No gatekeepers. No 30% tax. You could ship an app a week because there's no 2-7 day review process. Teams can use AI coding tools to go from idea to deployed mini app in hours. The velocity of experimentation and iteration is completely different than the traditional model. The platform becomes the distribution mechanism. Apps become social objects. And builders ship directly to users without intermediaries.

## AI's embedded ecosystem

While crypto has been building embedded app platforms around wallets and social graphs, AI companies are following a remarkably similar playbook: create an environment where apps live inside the platform(for now that's the chat interface), inherit context automatically, and bypass traditional distribution channels. Solving this has been and will continue to be one of the most important problems to solve. The winner isn't the app with the most users — it's the one that becomes so sticky you can't leave because everything lives there. ChatGPT has insane usage but hasn't become that glue yet.

### OpenAI's app store iteration

Ever since the rise of ChatGPT, OpenAI has tried multiple times to build the "app store for AI". ChatGPT Plugins launched but users didn't understand they were using them and they weren't too powerful. Similar story with custom GPTs.

Canvas mode was a step forward—a split view where chat lives alongside a live document or code editor. But it was still limited to OpenAI's built-in tools.

Now with the Apps SDK and Instant Checkout, OpenAI is seemingly getting closer to the embedded app vision. Developers can literally embed their apps in ChatGPT—full interactive interfaces that appear naturally in conversation. Ask "Spotify, make a playlist for my party" and a working Spotify interface appears inline with your context already loaded. If you're planning a trip, Booking.com surfaces with actual search results you can book without leaving the chat. The best part about it is that it's built on top of Anthropic's Model Context Protocol(MCP), so a lot of existing MCP servers are able to reposition themselves to work in ChatGPT.

The Instant Checkout integration shows how far this goes. You can buy products from Etsy and Shopify merchants without leaving ChatGPT, powered by the Agentic Commerce Protocol that OpenAI built with Stripe.

This is OpenAI's embedded apps play: ChatGPT becomes the environment where apps live, context flows automatically, and users discover apps through conversation instead of app stores. With 800 million users, developers can reach massive scale by building once and deploying directly into the chat. No review process, no 30% tax, just natural distribution through the AI orchestrating when to surface your app. We still have to see how much usage it gets, but of all the iterations I've seen from OpenAI over the past few years this one seems the most promising to turn ChatGPT into an everything app.

### Model Context Protocol

Anthropic took a different approach with the Model Context Protocol (MCP). Instead of focusing on consumer-facing interfaces like OpenAI(although they're still trying to drive more usage to Claude and build up their brand), they made a bet on building a standardized tool for LLMs to talk to external tools. And while it's still early, not only have many companies been building MCP servers, but there's also an increasing list of clients that support MCP.

With MCP, a server exposes resources (database records, file systems), tools (create ticket, run query), and specialized prompts. Any MCP-compatible client—Claude, Cursor, now even ChatGPT—can discover and use them. Agents can chain together calls to multiple MCP servers. One example flow I use a lot is querying an analytics/tracing MCP to look for information, scan across the codebase, and then use the Figma MCP to match designs.

From my own use, this feels much more effective than just LLM tool calling. The spec itself seems closer to what a future standard could look like. Because it's an open protocol, servers you build work across any compatible AI assistant. It's the same philosophy that makes Farcaster mini apps work across clients -- infrastructure that prevents platform lock-in. OpenAI adopting it for their Apps SDK is a strong signal that this could become the standard for how AI connects to the world.

## Conclusion

So are embedded apps the right model?

For crypto, it seems like this is a pretty good solution. The combination of embedded apps that have context(and can even send you push notifications), wallet connection, and social distribution is starting to work. The platform becomes the distribution mechanism, and that's letting builders ship, distribute, and earn faster than ever.

For AI, the answer is more nuanced. AI definitely needs a killer interface -- something ChatGPT is racing toward with Apps and Instant Checkout, trying to become the sticky consumer interface you never leave. But the real unlock for AI isn't just embedding everything in one chat interface, it's data interoperability and AI becoming embedded across all your apps.

The beauty of AI isn't always just ChatGPT doing everything, it's agents and tools like MCPs working together so you can also get more out of the apps you already use. Cursor is a specialized but relevant example where an existing tool(the IDE) was remixed to work extremely well with AI and other apps(MCPs), and now it's become so good that developers are more glued than ever to it. 

If I had to take one thing away from diving into embedded apps, it's one thing: if crypto and AI need new app platforms so bad that they're building their own, **it's probably time for the legacy app platforms to change**. That doesn't mean anything drastic will happen overnight or that we'll all suddenly start using new devices, but it tells me there'a real appetite for it to be easier to distribute apps, easier to monetize apps, and easier for there to be ecosystems where more apps can be complementary to each other(and even interoperable).

I'm hoping the common ground between these AI and crypto app platforms in service of the above takeaway is to **continue building for the open web**. One similarity I haven't fully highlighted yet is that the platform these AI and crypto apps run on is the web, and the web itself is an open platform anyone can publish to. That's what enables these embedded apps platforms that are being built in the first place! If the web continues to be at the center of these platforms, I'm optimistic these platforms would be encouraged to be more open just like the web itself which would be beneficial for all.