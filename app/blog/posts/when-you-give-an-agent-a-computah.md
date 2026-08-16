---
title: 'When you give an agent a computah'
publishedAt: '2026-08-17'
summary: 'When you give an agent a computah'
---

We've all figured out that coding agent harnesses(eg. Claude Code, Codex, OpenCode etc) are one of if not the most powerful ways to use LLMs. We've also figured out how powerful it can be for the agent to control its own computer because:
- Agents are getting better at using the tools that control computers(whether that's CLIs, scripts, or computer use tools). A computer gives an agent a file system, browser, and apps; all of which agents now know how to control. 
- The computer acts as a headless execution environment. If your agent controls a computer in the cloud, you can say goodbye to your lid half open laptop! And if you want to parallelize your work, you can even give each agent its own computer independently.

In this piece I want to talk about where things were beforehand, how agents have evolved, and what I think the next execution environment for agents could be.

### The stone ages

I remember using the research previews of GPT-3 and ChatGPT where there wasn't even any concept of tool calling or reaching external knowledge outside of the model's training data(which was also super limited!). It seemed quite far fetched at the time that the model could be trained to let it use tools / access knowledge outside of the initial training data set. But ever since GPT-4 and the first set of tool calls & external plugins, it's been off to the races.

The initial challenges I remember facing when trying to do more with the first set of LLMs and tool calls were:

1. Loading the tool with enough capabilities that it could be powerful, and how you give it the right scoped credentials to safely run(or to run at all)
2. Not bloating the context window, which can still be a problem these days but feels a lot more solved nowadays with a combo of: much larger context windows, auto compaction, and storing logs(eg. the full chat, tool call results and other info) in flat files the LLM can reference.
3. Similar to the above, another key issue was making sure to not bloat the model with a large selection of tool calls available. This can also still be a challenge today, but in the past if you gave the model more than a handful of tool calls it seemed to *severely* degrade. Two things I think greatly improved this are:
	1. A much simpler set of extremely high quality tools built into the models and their harnesses, especially the read/write file tool calls that have emerged as running an agent on a laptop has become a very common/powerful practice
	2. Tools like [Executor](https://executor.sh), MCP gateways, or [Code Mode](https://blog.cloudflare.com/code-mode/) that either dynamically load the right tools into the context window — or even cooler, expose all of those tools as code that the agent can execute(since agents are quite good at writing code and read/write tools are the core of new agent harnesses)

Even with the challenges listed above, I think it's clear that at this time the main issue was the models just not being good enough. Yes the usage of ChatGPT was exploding and people were already finding some cool things to build on the API. But compared to where we are today, it’s easy to see that the improvements in model capability have created step-function unlocks for entirely new use cases. Even looking at some of the most recent model, Opus 4.5 for example(which I'll talk about more later) was one of the first models to show that agents can code quite well... and autonomously! Without these unlocks, the early ChatGPT and set of LLM releases would only make us imagine what could possibly be next.

### The road to today

A few things happened on the road to the present day. And I’ll tell this part a bit more through the lens of a developer, both since I am a developer and because I believe agentic coding led to many of the innovations that the rest of AI has benefitted from(since the paradigms behind agentic coding unlocked so many learnings that have been generalized).

Even though some developers probably started by trying to get snippets from ChatGPT(maybe by pasting in snippets of files), it seems like using AI for coding *really* kicked off with Cursor. In particular their Tab model, which gave you an accurate autocomplete response for any line of code you were on, was very impressive and ahead of its time. What helped Cursor's usage take off after Tab was their right side chat, which would go a step further and actually propose or make changes on your files directly. This concept combined with their vector embeddings of your codebase made for an experience that felt wildly ahead of anything else at the time. 

<Tweet id="2016771167135420622" />

For a good while it seemed like Cursor had a sizable lead here and that the right side chat UI would be the standard, but that was until Claude Code came out and changed both how we work with AI and how it *could* start pushing us further away from a traditional IDE. And while Claude Code was already garnering some real traction beforehand, the release of Opus 4.5 really started to show how good agents could be at completing large chunks of coding work fully on their own. Much deeper context and much better code could now be completed over a *much* larger time frame, where as beforehand agents wouldn't run for as long and would often involve a lot of back and forth. Over the holidays at the end of last year in particular it seemed like the hype around these agent harnesses & new Anthropic models really started to take off, and this year we've already gone from agent harnesses being the standard to whole new non-IDE interfaces and standards like cloud environments for agents.

This all led us to where we are today, which I would still call the era of [Agentic workspaces](/blog/agentic-workspaces). With developers rarely writing code by hand or looking in a traditional IDE([our team was even told to delete the IDE!](https://x.com/linear/status/2087191891846520840)), many developers transitioned to the terminal and some started using(or making) their own post-IDE interfaces. That’s what you see today with the Codex, Claude, Conductor, and even OpenCode & T3 Code desktop apps. 

While there are some people who definitely still use agent CLIs in the terminal, I think all these non-IDE desktop apps are signs there's a new experience people are looking for. That's something I've been running into myself at work. I want one place to manage all the agents I have running, run terminal commands, test changes out in the browser, and review changes(whether it's a diff or a full PR). Another thing these apps have started to embrace are remote environments, which give the agent a sandboxed environment to run in *and* (more importantly) let the agent run on its own without having to keep your laptop open.

And one of the things that made that possible was [ACP](https://agentclientprotocol.com/get-started/introduction)(Agent Client Protocol)by Zed, which creates a simple transport layer so anyone can build interfaces on top of harnesses without needing a ton of custom setup. That all made it possible to have super desktop apps that encompass chat, sub agents, the terminal, code review, and even browser/computer use. 

<Tweet id="2044847117043388444" />

The browser/computer use piece in particular is quite interesting because, instead of companies making their own agentic browsers(like OpenAI’s Atlas), they’ve found more success building in-app solutions that still have really great capabilities. In particular OpenAI’s macOS computer use, powered/built by the Sky Software team they acquired(that had originally built the Shortcuts app at Apple), is very impressive. And quickly going back to how we were talking about the shift of developers going from the terminal to a new(non-IDE) desktop app, part of the reason the computer and browser use could be helpful is that it also helps serve non-coders who are just doing their every day tasks with browsers and desktop apps. If agents can get good at that work, the reach of these agent harnesses could start to reach past developers with enough work.

So that's how we landed up with coding agent harnesses that work well controlling computers, but where's this all going and how will these tools reach more people?

### The next environment

This is where I think there's so much room to innovate in the future, especailly making interfaces that help every day people and not just coders. It's also worth noting before going deeper that as the models themselves get better, their new capabilities will unlock features we couldn't have conceived beforehand(or at least that they'd come so quickly). I'm going to break this part into two sections: the next architecture and the next set of interfaces.

#### Architecture

For quite a while, the main architecture backing LLM-powered apps was just a single server powering a web app - where the server would call the chat endpoints from the model provider(which in turn would talk to the GPUs powering the models). The agentic harnesses started to shift that by making requests directly from your computer, which was important because your computer was acting as the execution environment(eg. the harnesses rely on read/write/bash tools that execute on your computer). But as time has gone on, more investment has gone both into remote execution environments(eg. using a cloud computer instead of your laptop) and new types of environments(eg. virtual file systems and v8 isolates). 

<Tweet id="2081498476970725735" />

Nathan Flurry from Rivet, who has been doing great work in this space both with [agentOS](https://agentos-sdk.dev) and [Secure Exec](https://secureexec.dev), recently wrote a piece above that I think captures this problem well. The main motivations for these new environments are:
- Getting workloads off your laptop, so you don't need to keep it open all the time and aren't constrained by your machine's memory(which can easily get exhausted by running agents)
- Having secure, scoped environments with just enough permissions so that it can't do too much wrong. even [Docker](https://github.com/docker/docker-agent) is working on this!
- To consider if the tradeoffs of booting up a full machine for a coding agent is worth it. many providers have indeed made it even faster to create a sandbox, but a v8 isolate is compelling since it can boot in a few milliseconds compared to a few hundred milliseconds(at best) for a container

I also wouldn't say there's one clear winner, and while I do actually really like the idea of using v8 isolates I do think agents controlling their own computers is quite a powerful primitive, for two main reasons.
- A v8 isolate/virtual sandbox can do a lot, but it can't run most software applications. Whether it's Codex's computer use or using something like [agent-browser](https://agent-browser.dev/) to drive a browser in a VM, having an agent control software is extremely powerful. It's especially powerful for tools where there aren't a ton of SDKs/ways to build on top of them, and so the agent can use the app like a human can.
- While many agents will use ephemeral sandboxes that get booted up then destroyed after usage, there's also something to be said about agents having persistent computers they can continue to control without them having to be destroyed each time. One team I like building in this direction is [Zo Computer](https://www.zo.computer/), which gives you your own EC2 instance under the hood and then has many different interfaces you can use to build anything on top of it(eg. an API, a well-polished desktop/web app, and messaging interfaces). Having a persistent computer means it can also do things like store your files and host services.

So I'm sure that both the v8 isolate/virutal environment type approach and the full machine/sandbox approach will continue to flourish(and maybe a v8 isolate makes sense for a more ephemeral use case, like an agent that just runs as part of your CI), but I will personally say that I'd lean a bit more towards a proper machine being the solution here. And this is only something that's taken off over the past year or so, so over time I'm sure this development process will only get better. Whichever it ends up being, my guess is the theme will be having agents run in remote environments over your laptop.

However the architecutre gets sorted out, I think what's clear is that everyone wants one persistent backend that: acts as their digital brain, securely stores the credentials to their different services/can use their services, and can act on its own(whether that's an automation on a cron job or something even more autonomous). One anology I've been using is imagine it's essentially a suped up iCloud that can run/be stored in whatever environment you want to - except it would be bound to an environment and actually take actions.

#### Interfaces

Right now, a lot of these apps have been rooted in skeumorphisms, using references that people remember from where we are today. That's why we're building on top of the chat UI, our laptops are still using the same desktop metaphor that's been around for 50+ years, etc. And while I think these incremental changes have been great for doing even more with the tools we have, I think the in the near future we'll be creating radically new interfaces that are custom tailed to what we need to do & make the absolute most of the latest advancements in AI.

I want to quickly highlight three examples that, while they still root themselves in existing metaphors, start to break out into a new direction and give us a glimpse of hwere things are going in the future.

**1. Cloudflare OS**

<Tweet id="2084990137180590572" />

[Cloudflare OS](https://os.cloudflare.app) is an internal AI chat tool for your team that doesn't just have a regular LLM chat, but features a bunch of tools so that you and your team can collaboratively build things together. This includes: asking questions with answers that are backed by your team's internal data sources, creating docs/sheets/slides, building full blown apps or dashboards, and creating workflows. Similarly at Coinbase, we have an internal tool called [Forge](https://www.coinbase.com/blog/coding-had-a-concurrency-problem-how-mux-helped-solve-it) for parallel coding/using workflows and have been living in a [post-IDE world](https://x.com/linear/status/2087191891846520840). 

But I think the way Cloudflare's approaching this is great because it gives everyone across the team, including more non-technical teammembers, one tool and shared brain; and while it can certainly be used for building customer-facing products/artifacts, I'd imagine the bigger unlock here is being able to use it so that non-technical teammates can build things/automate parts of their workflows that they wouldn't have been able to otherwise. I like how this changes both what their teammembers can do and where they do their work, and I'm sure that more teams will have shared tools like this going forward.

**2. Grok Bot**

<Tweet id="2087224798078517251" />

Many teams have been personal agent platforms, but I think Grok Bot is building in a unique direction that I could honestly see being something others would want to copy. The idea is that the user creates custom agents for different tasks, sets up connectors & credentials so the agents have tools they're able to use, and each agent has its own cloud computer to do these tasks. The app is just a left side chatbar(similar to iMessage) of all your agents, with the chat + live view of the agent's computer on the right side. What I think's unique isn't just how each agent has its own computer, but how they're going after custom agents. Different projects(probably the most notable one being OpenClaw) have built tooling that lets people have their own custom agents, but in my opinion a lot of them either didn't stick/weren't effective enough or took way too much setup to get right. 

It's also worth noting that a big reason of why this product seems so good is the recently acquired Cursor team, who played a big part in this product's development and are starting to use everything they've learned building tools for developers to branch out to more general purpose tools. If the tool is actually good enough that you can treat it like a real teammate without having to 'babysit' the agent to get what you want, then I think(especially, again, for more non-coding use cases) that the way the average person works will really start to change.

**3. Television**

When folks started to use agent harnesses they'd just use the terminal, and honestly that's where a lot of folks still use them. But what's motivated the rise of these super desktop apps has been getting work out of the terminal and also giving the developer the tools they need to do all their work in one place. Instead of jumping between the terminal for their agent session, an IDE/GitHub for viewing diffs and PRs, and the browser for testing their work, they can use one of these desktop apps to do all their work in one place. But one thing that I feel is still missing is how you view the agent's session and the artifacts coming out of it. Even if we have all these other tools I listed above in these super apps, we still need to navigate through the chat history and artifacts to make sense of what the agent's doing.

<Tweet id="2061900965251604956" />

That's why this Television really caught my eye, and similar ideas of how to better visualize what an agent is doing have been on my mind for quite a while now. While I haven't gotten a chance to use it yet, the idea behind Television is to give people a visual representation/GUI of what their agent's doing instead of relying on chat transcripts. My understanding is that agents are given skills for how to create visual artifacts for Television, and then they're rendered per task/session. For example if your agent is keeping track of a todo list/plan and editing coding files, instead of seeing an agent session you'd see the todo list and files(or output) visually rendered as nice cards on a screen. 

With agents becoming more remote and ambient, I think this metaphor can extend really well to non-coding work. Yes it's a great thing for agents to run in the background, but just like when you use any piece of software you want to see what's going on. What I like about this so much is how it gives a glimpse of how much agents really let us explore new interfaces for how we work. The desktop metaphor(with windows, icons, menus, the pointer, and your desktop itself) has been around for 50+ years, was a skeumorphism for physical desktops as a way to accustom people to how they can use computers, and honestly has barely been changed at all. While the desktop metaphor has been long overdue for a change and this could've been done for a while, I think agents give us a great chance to do so - and are so powerful that it really lets imagination run wild re: what's possible here.  

----

I'd also be remiss if I didn't bring up voice, which means a set of interfaces(maybe mobile?) even more ambeint - with less visual options in favor of your voice being the driver for your agent to take whatever actions you need it to behind the scenes. The GPT Realtime models in particular are getting really powerful but are under utilized, so I'm excited to see both how they get used and also this rumored OpenAI x Jony Ive device that's supposedly coming out pretty soon.

So while change will continue to happen incrementally, I think the future of agents is one of the most exciting times to think about and build for. What makes me even more bullish on this is that it's clear the tools are already good enough to power a shift - new interfaces and a much larger TAM of possible users. The tools I listed above are glimpses in that direction, but given how quickly this space evolves I wouldn't be surprised if the tools we use look radically different in the next 12-18 months(and if the shift starts to take shape by the end of the year). 

For anyone who's loved computing and malleable software for a while, the time we're living in literally feels like a dream. The infrastructure for the tools we use aren't nearly as rigid as they once were beforehand. Walled gardens don't seem like as big of a deal, especially when you can run an agent that unlocks data that couldn't have been beforehand or moves it elsewhere entirely. And while anyone can still create anything they want today if they put time into learning the new tools, the next set of interaces will make creation become something that everyone's doing all the time(eg. instead of static interfaces, tools will let us make custom environments for every little detail we want to tailor to our own lives). It really is a great time to build - and to give your agent a computah.