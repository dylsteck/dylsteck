---
title: 'Embedded apps'
publishedAt: '2025-10-20'
summary: 'An update on how app stores are forming inside of other apps, both in crypto and AI'
---

New tech paradigms require ways for end users to access them in order for their consumer usage to truly blow up, and both crypto and AI are getting this with their own embedded app stores. 

**In crypto:** [Base](https://base.org), [Farcaster](https://farcaster.xyz), [World](https://world.org), and [Telegram](https://telegram.org) have mini app platforms with direct wallet connections and [as wallets have been going social](/blog/when-wallets-meet-social) these mini apps help give users one place to find and do things in crypto.

**In AI:** [Anthropic](https://anthropic.com), [Google](https://google.com), and _especially_ [OpenAI](https://openai.com) have been trying to create the "app store" for how LLMs interact with your tools and personal data. From [ChatGPT Plugins](https://openai.com/index/chatgpt-plugins/) to [MCP servers](https://www.anthropic.com/news/model-context-protocol) to the most recent [ChatGPT Apps SDK](https://openai.com/index/introducing-apps-in-chatgpt/) and even [Instant Checkout](https://openai.com/index/buy-it-in-chatgpt/), these companies are trying to figure out what this connection looks like both for servers and user interfaces.

My day job is working on a mini app platform at Base with [Base app](https://base.app) and our suite of developer tools, and funny enough before this I was working on products for [Farcaster Frames](https://dtech.vision/farcaster/frames/), so for the past few years now I've been focused on embedded apps. In this post I want to go over what I've been seeing in these two ecosystems I've been watching closely, what I think they can actually learn from each other, and question if embedded apps are even the right model.

## Embedded everything

If you take a step back and look at what's happening in tech right now, there's a clean pattern: platforms are trying to become meta-platforms/app stores for third-party apps. It's not just about building super apps, it's about building the operating system layer for specific verticals.

This shift is happening for a few key reasons:

**1. App store friction**. Apple and Google's 30% tax and rigid review processes have pushed developers to look for other ways to distrubute their software. The EU's Digital Markets Act forcing Apple to allow alternative app stores is just the beginning(although we haven't seen that in effect yet), but that's just the begining. Developers want to distribute their apps on their terms and monetize their work: that's what the open web is supposed to be for!

The frustration here is real and visceral for builders. [Los](https://x.com/downloadlos) from [Danger Testing](https://x.com/dangertesting), who ships an app "at the speed of culture" every week, recently got hit with the "Guideline 4.2 - Design - Minimum Functionality" rejection in an Apple App Store review—a catch-all that essentially means "we decided this shouldn't exist but won't tell you why." After working for 6 days straight on an app, he got a rejection saying it was "not app like."

<Tweet id="1976701536643252487" />

What's wild is that AI coding tools have made it easier than ever to build apps—Los and teams like Danger Testing are proof of this. But the gatekeepers haven't caught up. We're in this bizarre moment where AI has democratized creation but distribution is still controlled by "non shipper losers" (Los's words, not mine) who've never built anything themselves. 

This is exactly why embedded apps are exploding—they route around the damage. You can't reject a Telegram mini app. You can't tell someone their Frame "isn't app-like." The distribution is permissionless.

**2. Context is king**: When you open a mini app in Telegram or a Frame in Farcaster, it already knows who you are. No more sign-up flows, no more connecting wallets, no more OAuth dances. The app just works because it inherits the platform's context.

**3. Network effects on steroids**: When someone shares a mini app in a group chat or social feed, everyone can instantly use it. No app store links, no downloads, no friction. Just tap and go.

## Crypto's embedded ecosystem

The crypto world has been particularly aggressive about building embedded app platforms, and it makes total sense. When your users already have wallets and your platform is built on open protocols, mini apps become a natural extension.

### Telegram's TON revolution

Telegram's integration with the TON blockchain has created one of the most successful crypto mini app ecosystems we've seen. Games like Hamster Kombat and Notcoin have brought millions of users into crypto without them even realizing it. Users tap on their screens, earn tokens, and suddenly they're participating in a global financial system.

What makes Telegram's approach so powerful is that it doesn't feel like crypto. It feels like playing games with your friends. The wallet, the blockchain, the complexity—it's all abstracted away.

### Farcaster Frames v2

Frames v2 took the concept of embedded apps and made them truly social. Unlike v1 which was essentially interactive posts, v2 frames are full web apps that live inside the client. They can access your social graph, send you notifications, and process transactions—all while feeling like a native part of the experience.

The magic is in how frames spread. Someone uses a frame, it shows up in their feed, their friends see it and can instantly try it. No permissions, no installs, just instant access to functionality. It's the most frictionless app distribution I've seen.

### World App's vision

World (formerly Worldcoin) is building mini apps with a unique twist: verified humanity. Every mini app knows you're a real person, not a bot, which opens up entirely new use cases. Imagine social apps where you know everyone is real, or voting systems where each person truly gets one vote.

### Base App's creator economy

At Base, we're building mini apps that put creators first. Every interaction can be monetized, every post can become a content coin, and creators can earn directly from their audience. The mini apps aren't just tools—they're economic primitives that creators can compose together to build their own businesses.

## AI's interface problem

While crypto has been building embedded app ecosystems around wallets and social graphs, AI companies have been trying to solve a different problem: how do you give LLMs access to your tools and data without compromising security or user experience?

### The evolution from plugins to apps

OpenAI's journey here is fascinating. They started with ChatGPT Plugins—essentially APIs that ChatGPT could call. But plugins had a fundamental problem: they were invisible. Users didn't know what was available or when to use them.

Then came GPTs (custom ChatGPT configurations), which were better but still felt disconnected. You had to navigate to a specific GPT, losing your context in the process.

Now we're seeing the next evolution: proper apps with UIs. The recent ChatGPT Canvas is a glimpse of this future—instead of just text, you get a full interface for working with documents. And with rumors of an app store and SDK coming, OpenAI is clearly betting that embedded apps are the answer.

### Anthropic's MCP approach

Anthropic took a different path with the Model Context Protocol (MCP). Instead of apps with UIs, MCP focuses on giving Claude standardized access to external tools and data sources. It's more developer-focused but incredibly powerful—imagine your AI assistant being able to directly query your database, read your local files, or control your development environment.

The beauty of MCP is that it's an open protocol. Anyone can build MCP servers, and any AI can potentially use them. It's the Linux philosophy applied to AI tools.

### Google's scattered strategy

Google, despite having all the pieces (Gemini, Workspace, Android), hasn't quite figured out their embedded app story. They have extensions for Gemini that can access Workspace apps, but it feels more like traditional integrations than a true platform play. 

## What crypto and AI can learn from each other

These two ecosystems are solving similar problems but from different angles, and there's so much they could learn from each other.

### What AI can learn from crypto

**1. Social distribution is powerful**: Crypto mini apps spread through social channels. Someone uses an app, their friends see it, and suddenly everyone's using it. AI apps are still stuck in the "go to this website" paradigm.

**2. Tokens create alignment**: In crypto, mini apps can have their own tokens that align users, developers, and platforms. Imagine if every AI app had a token that rewarded users for providing good training data or developers for building useful tools.

**3. Composability is key**: Crypto apps compose naturally—one app's output becomes another's input. AI tools are still largely siloed. MCP is a step toward fixing this, but crypto's been doing it for years.

### What crypto can learn from AI

**1. Natural language is the ultimate interface**: You don't need to learn how to use ChatGPT—you just talk to it. Crypto apps still require users to understand concepts like gas fees, slippage, and liquidity pools.

**2. Context understanding**: AI excels at understanding what users want even when they can't articulate it perfectly. Crypto apps tend to be very literal—you need to know exactly what you want to do.

**3. Progressive disclosure**: AI interfaces start simple and reveal complexity as needed. Crypto apps often throw all the complexity at users immediately.

## Is this even the right model?

Here's the thing that keeps me up at night: are embedded apps even the right abstraction?

When I think about [the Internet OS I wrote about](/blog/internet-os), the dream isn't to have a million mini apps inside other apps. It's to have data and functionality that flows seamlessly between contexts. The app boundaries shouldn't matter.

Maybe what we really want isn't embedded apps but embedded capabilities. Not "open the Spotify mini app" but "play music" and the system figures out how. Not "open the Uniswap frame" but "swap tokens" and it happens inline.

The current embedded app model still maintains the artificial boundaries between apps. You're still context switching, just within a smaller container. What if instead of embedding apps, we embedded functions? What if every piece of content, every message, every post could have latent capabilities that activate based on context?

## The platform lock-in problem

There's also a darker side to embedded apps that we need to talk about: platform lock-in. When your app only exists inside Telegram or ChatGPT or Base App, you're completely dependent on that platform. They can change the rules, take a cut of your revenue, or shut you down entirely.

This is where crypto's approach has an advantage. Because these platforms are built on open protocols, there's at least the theoretical possibility of portability. A Farcaster Frame could potentially run in any client that supports the protocol. A Base mini app could work anywhere that supports the same wallet standards.

But AI platforms are looking increasingly closed. Each has its own SDK, its own distribution model, its own monetization strategy. We might be trading the Apple/Google duopoly for an OpenAI/Anthropic/Google oligopoly.

## Where we go from here

Despite my concerns, I'm incredibly bullish on embedded apps as a transitional technology. They're training wheels for a future where functionality is truly ambient and contextual.

In the near term, I expect to see:

1. **Convergence of approaches**: Crypto apps adding AI capabilities, AI apps adding token incentives. The lines will blur quickly.

2. **New monetization models**: Not just subscriptions or ads, but microtransactions, token rewards, and value sharing between apps, users, and platforms.

3. **Cross-platform standards**: Just as we have web standards, we'll need embedded app standards. MCP is a start, but we need more.

4. **Better authoring tools**: Right now building embedded apps requires deep platform knowledge. We need tools that let anyone create mini apps as easily as they create content.

5. **Privacy-preserving personalization**: Embedded apps will need to be deeply personalized but also respect privacy. Expect innovations in local processing and zero-knowledge proofs.

## The bigger picture

Embedded apps aren't just about better distribution or lower fees. They're about fundamentally rethinking how software works in an age of AI and crypto.

We're moving from a world of destinations (go to this app) to a world of capabilities (do this thing). From isolated data silos to composable services. From one-size-fits-all interfaces to personalized, contextual experiences.

The winners won't be the platforms with the most mini apps. They'll be the ones that make the boundaries between apps disappear entirely. Where using software feels less like opening an app and more like having a conversation or casting a spell.

That future might not look like embedded apps at all. But embedded apps are how we'll get there—one mini app, one frame, one plugin at a time.