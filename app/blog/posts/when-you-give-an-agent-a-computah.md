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

This is really all about what's next. And before I go deeper, one thing I'll call out is that every time the models get better, it will increase the scope of what's possible. And so I would expect that to happen, and I would expect people to plan for that to happen and how adventurous they get with what they build.

Right now, a lot of these apps have been rooted in sort of skeumorphisms, building in things that people remember and where we are today. That's why we're building on top of the chat UI, we're still in the desktop, we're still showing certain things that are again remixes of where we are today, pushed further, you know, in the this desktop app style, but definitely remixes with references to where we are today. And I think, at least from a visual standpoint, the next phase is moving beyond those into something that's completely new. Maybe that means there's no chat at all, maybe it looks different, but I think overall the interfaces will become completely new.

<Tweet id="2084990137180590572" />

<Tweet id="2087224798078517251" />

The interface may still be slightly grounded in things from today, but I think the Cloudflare OS product is a great step in this direction, where it's more geared towards building a bunch of different things and sharing it with other people and becoming a source of truth. And I think that putting the interface stuff aside for a second, it is that centralized in the cloud, but also shareable and configurable source of truth that is going to become the next architectural change. What's also cool is because these are built on Cloudflare workers, the agent can control multiple different processes and I think having multiple different options for compute and computing environments will be really important for agents as well.

But the things I'm mentioning are still a little grounded in today, so let's push it a little bit further. 

On the interface side, whether it's through apps or through entirely new operating systems, I think the way things look is going to change rapidly. The reason I bring up operating systems is because that encompasses everything else that we see and interact with. And so if you're able to reconstruct the interface at the core layer, you know, really from the ground up, then you can do a lot of interesting stuff. And maybe that doesn't mean an entire kernel. Although I have actually seen some pretty cool glimpses of people making, you know, new Linux operating systems. For example, I think we're just going to see a lot of rewriting. And that rewriting is going to be more of a malleable control center. One where the UI is focused on pulling everything out of all these different places using familiar tools but then adapting on the fly to just show what you need. Maybe it means we're in a world where there aren't apps and they're just services. Maybe we're in a world where the apps become something that you make yourself or their one-time use. But I think it means that it will be h really blended towards what it is you need to do and it does not need to be so static any more. Maybe there's really nothing that's static about it at all.

And I think on the back end, it's really about building a digital brain basically. Almost imagine a supercomputer for your agent and agentic memory. This is scattered across a lot of different places and a lot of the big labs are trying to create ultra connected accounts. And some of those properties are lives in the cloud so that the agent can control it and it's always on for you. Has connection to your different accounts, has some sort of memory, access to different tools, remote being again a really big piece here but they don't all fully have it and I think there's going to be a souped up version it's also going to be able to access a bunch of different compute having one machine is a great start, but I think agents ultimately want to be able to run kind of wherever, have these dynamic properties and also maybe some structuring in terms of the things it's stored. Again, like the brain and the runtime for the agent and we've seen some glimpses of it, but imagine just a extremely souped up one and the goal is to meet your personal needs.

I'd also say that, like always, my guess is that this will happen incrementally. Like on the interface layer, it's kind of incrementally moved us away from this. But that's fine, because there will still be people who are experimenting with the really wacky things, and as these tools get better and people iterate, the thing that could seem wacky could end up clicking and become the next thing, and I'm sure we're much closer to that than we are further away. I also imagine that the multiplayer layer will get important and that voice will continue to get even more important, especially on mobile where you can make an experience that's truly ambient.


1) maybe some raw notes in daily notes
2) PKM thing
3) Most important, FIND SECTION OF THIS ARTICLE TO TALK ABOUT V8 ISOLATE VS SANDBOX VS PERSISTENT VM ETC
ui stuff too, like television, def shit here

<Tweet id="2084797163079417998" />

Agree with above tweet almost wonder if skills should just be a codified action, never would’ve believed skill would just be English but obv for now it makes sense
