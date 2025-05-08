---
title: 'Universal React'
publishedAt: '2024-10-22'
summary: 'A brief overview of some of the most exciting developments in the world of Universal React, what the main benefits/downfalls of those are, and what I think this all means for React developers'
---

I was first going to call this piece "Universal Apps" but I realized that what I really wanted to write about is Universal *React*. React is everywhere now: powering all sorts of websites, extending its use cases to universal apps(mobile, desktop, and even VR) with React Native, and now running on the server with React 19 and server components. And while it's an exciting time to be in that devs can build highly reactive apps across platforms with a lot more ease, there's also a lot of complication that comes with the ecosystem moving around so quickly.

Here's a brief overview of some of the most exciting developments in the world of Universal React, what the main benefits/downfalls of those are, and what I think this all means for React developers:

## Top Developments
*Note: in no way do I think these are the **only** top developments in the React/Universal React ecosystem, these are just some developments that I want to highlight, as I think they tell an interesting story together about Universal React.*
### React Native
First released in 2015, React Native replaced a bunch of HTML5 that Facebook had been using and instead replaced it with a version of React that could use the background process to render native UI elements. As React Native continued to strengthen over the first few years of its release, it became a great solution to the problem of having to maintain two codebases for iOS and Android, as well as other quality of live improvements for developers. 

As React Native has improved and also expanded to work across Windows and macOS on desktop (which Microsoft has built out), and even the web, React Native itself has become its own universal platform -- no matter how much of that stack developers end up using. Two great examples of this are that on one hand React Native can power a full-stack application such as Twitter, and on the other hand it can power full-stack apps in completely new environments, such as the new Instagram for Meta Quest which was built with React Native for Windows.

React Native added this missing glue where developers could port existing code and knowledge to mobile platforms. Little did they know it at the time, but the creators of React Native paved the way for two major developments in the React/wider developer communities:
1. It made it even easier for developers to create(and especially get started) building mobile apps. Especially as the developer tools got better and native library compatibility grew, most developers were able to init and run an app that worked on Android and iOS simulators/devices in a matter of a few minutes or so.
2. It started to pave the way towards truly universal apps with developments from React Native Web to React Native for Windows/Mac and other tools like Expo/EAS. React Native is now at a point where there are tools to create mature cross-platform apps, as well as new developments on the way that will make that experience even more seamless and widespread.

### Expo & Expo Router
[Expo](https://expo.dev) as a framework and EAS as a product are two backbones that myself and many other mobile developers rely on, and that make development so much easier.  Expo is a framework for making Android and iOS apps(with web support as well), and among many other things here are its key advantages:
- [Expo Router](https://docs.expo.dev/router/introduction), which is a file-based router(built on top of React Navigation) and makes it easy to organize your static and dynamic routes. Especially if you're used to web frameworks like Next.js, this will be easy to learn and use. I'm also personally excited for [RSC support for Expo Router](https://www.youtube.com/watch?v=djhEgxQf3Kw) and am a big fan of all of the open work [Evan Bacon](https://x.com/Baconbrix) and the team do on it.
- Expo's suite of built-in plugins and Expo-compatible plugins, which make using native tools and libraries so much easier than having to go into a manual Xcode or Android Studio project. And if I ever do need to go into one of those tools/use prebuild mode, Expo makes it all a lot easier to manage.
- [Expo Go](https://expo.dev/go), a mobile app where I can either scan a QR code from my computer's dev server or run a dev version of a app pushed to my EAS account. This is so handy for being able to test live apps on my actual device with hot-reloading, I rely on it all of the time.
- [EAS](https://expo.dev/eas), a development platform for staging and pushing versions of your app either to internal testing or to the App Store/Google Play Store. Particularly because of how painfully annoying it can be uploading an app to an app store manually, EAS solves a real problem and honestly fills a gap that I don't really see other folks building. If you're a web developer or again happen to be a Next.js developer, you can think of EAS as your Vercel(deployment platform/management).

![Expo dev mobile client](https://res.cloudinary.com/dz3c2rl2o/image/upload/v1729565765/media/expo-dev-client-example-24.png)

To me Expo is a must if you're making a React Native app, and honestly a must in the vast majority of cases that you want to make any mobile app. I also expect to see Expo as a growing/big part of the Universal React stack.
### React 19 & Server Components
Back in April, the React team announced the [React 19 release candidate](https://react.dev/blog/2024/04/25/react-19) with a bunch of new changes, but the main changes had to do with the shift to the server and the paradigm shift that comes with Server Components. Here's a quick overview of the top features from React 19, why they're important, and where (if at all) they fit into the world of Universal React:
#### Server Components
Server Components are one of the largest pattern changes that React has seen in a while. While server-side rendering isn't fully new either to React or web development in general, this takes server rendering in React even further. The TLDR here is that you can fetch data/await functions _and_ return React on the server. Many frameworks like Next.js are even making server components the default. Some of the benefits of rendering your React code on the server are:
- SEO -- you can ensure that your server bundle is better optimized for crawling from LLMs and other services.
- Initial page loads -- since all of the data you need is fetched on the server, initial loads are a lot faster on the client.
- LLMs -- you can use RSCs to have LLM tools or chatbots return React components back with their server response, making for rich user experiences.

![A React Server Component diagram from Vercel](https://res.cloudinary.com/dz3c2rl2o/image/upload/v1729565846/media/react-server-component-vercel-diagram-2024.png)
#### Actions
Actions in React 19 bring server interactivity closer to the developer. These are server-side functions that can be triggered directly from the client. With Actions, you no longer need to rely on separate API endpoints to handle data mutations or form submissions. Instead, you can define functions that live alongside your React components, allowing for better code organization and fewer round-trips between the client and server. This results in a more efficient process for managing user interactions like form submissions or button clicks, as they can now be handled directly in the server-side component.

#### Server Actions
Server Actions take the idea of Actions a step further by letting you execute server-side logic without requiring a full page reload or an external API call. Whether it's making a database query or running complex business logic, Server Actions handle this entirely on the server, keeping sensitive operations off the client. This means less overhead for managing the client-server interaction, and it allows you to maintain a clean separation of concerns, with all the heavy lifting happening in the server components.

#### How does this relate to Universal React?
With Universal React, the goal is to create components that can run both on the server and the client. Server Components and Server Actions fit into this vision by allowing you to offload more work to the server without sacrificing client-side interactivity. However, it’s worth noting that some aspects of mobile development may still rely more heavily on client-side rendering, especially when it comes to highly interactive features or offline-first functionality. But with the rise of Server Components, even mobile applications can benefit from the server-driven model in terms of performance and scalability, while keeping the user experience seamless.

Note: if you want to dive deeper on React Server Components, I highly recommend the following articles:
- [Making Sense of React Server Components by Josh Comeau](https://www.joshwcomeau.com/react/server-components/)
- [Understanding React Server Components by Alice Alexandra Moore at Vercel](https://vercel.com/blog/understanding-react-server-components-57brjqQf27QFQaFFm27gZ9)
- [React for Two Computers by Dan Abramov](https://www.youtube.com/watch?v=ozI4V_29fj4)
	- this is a ReactConf talk, not an article, but I *highly* recommend watching this

### Tamagui & One.js
Then finally there's a project and set of developers that I'm also super excited about, the [Tamagui](https://tamagui.dev) team. Tamagui is a project I first started using a little over a year ago and it's *such* a powerful library for building proper UI libraries across platforms. The team also worked at [Uniswap](https://app.uniswap.org) previously and implemented Tamagui across their mobile, web, and Chrome extension apps -- so to me there's more than enough proof to show that the framework is battle tested. Some of the top features its developers rave about are the theming systems, how easy it is to use their components and custom styling shorthands, easy responsiveness, animations, and much more. 

![Tamagui website](https://res.cloudinary.com/dz3c2rl2o/image/upload/v1729565945/media/tamagui-website-2024.png)

And a few weeks ago the founder of Tamagui, [Nate Wienert](https://x.com/natebirdman), unveiled an exciting new project they'd been working on: [One](https://onestack.dev), a universal React framework with an exciting approach of building a cross-platform framework directly as a single-app Vite plugin. The framework has a lot of features that caught my eye, such as:
- setting routing globally and per-page to be either a SPA, SSG, SSR, or even a [Hono](https://hono.dev)-backed API route
- typed file-system routing
- built-in Tamagui support
- upcoming support for [Zero](https://zerosync.dev/), a new local-first sync solution for Postgres
- note: as a fun testament to how One always runs in production(moreso on web than mobile right now), check out how it's already powering the new Tamagui website

Part of the reason I wanted to bring it up is that this framework excited me so much that I'm building a production universal app with it despite the framework still being in beta. A month or so ago I wrote about [how I was building Notion-style blocks for Farcaster](https://dylansteck.com/blog/cortex-one-pager), and as a small update I've used some of my learnings from this time to instead focus on a channels-first client for onboarding and personalizing community experiences on Farcaster -- and I'm building the mobile and web versions of the app as a single app folder using One. Even though there are a few small features that it'd be helpful to have a bit more support for(one that comes to mind is being able to add middleware to the Hono instance), the overall DevEx is so much more manageable than wrangling the massive and slow setup that can sometimes be a universal app. I've found One to be very promising as I've been using it for Cortex and intend to keep using it to launch the mobile and web versions.

![Cortex Web and Mobile with One](https://res.cloudinary.com/dz3c2rl2o/image/upload/v1729565567/media/cortex-web-and-mobile-one-oct-24.png)
I'm also excited to see the continued growth both of Tamagui and One, as I know not only that One is still a lot newer(we haven't even seen Zero yet, that'll be cool!) but also that now Nate and some of the team have left Uniswap to work on Tamagui and One full time. And I'll say again from a developer experience that especially Tamagui(since I've used it more and it's more widespread) is such a helping hand for making robust mobile and cross-platform interfaces. 

## Outlook
Sooo... what does all of this mean for developers? In my eyes, only good things! React continues to be one of the best ways to teach new programmers how to code and build apps, while also empowering experienced engineers to create apps that run anywhere — whether on web, mobile, desktop, or even VR. With the advancements we've seen, from React Native and Expo to cutting-edge frameworks like One and Tamagui, developers now have access to tools that bridge platforms and unify the development process in ways that were unimaginable a few years ago.

The real power of Universal React lies in its ability to let developers focus on building the best possible user experiences without worrying about the nuances of each platform. By using a common framework like React, paired with the right tools, you can write your app once and have it work across multiple platforms — while still getting access to native libraries and APIs. This is a shift from just thinking about React as a frontend tool for the web to recognizing its role as a universal framework for application development, no matter where the app is running. These tools aren’t just about making development faster or more efficient — they’re laying the groundwork for a new era of truly universal app development.