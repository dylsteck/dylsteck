---
title: 'Agentic workspaces'
publishedAt: '2026-02-09'
summary: 'Agentic workspaces'
---

The best agentic interface right now isn't an app anyone designed — it's Claude Code being used across terminal tabs for things it was never built for. AI tooling is moving so fast that we're already getting glimpses of what the next generation of interfaces for working with agents could look like.

Recently Claude announced [Cowork](https://claude.com/blog/cowork-research-preview), a new version of the Claude Desktop app that extends the same agent harness powering Claude Code to everyday, non-coding tasks. Through a set of connectors (which seem to be [MCP servers](https://modelcontextprotocol.io)), along with browser and file/OS access in the Claude desktop app, Cowork can help you get things done on your computer. I think Anthropic has been on the money here, both with trying to build ways for agents to talk to users' data and building strong agentic interfaces in response to latent demand.

This idea of an agent being used as an all-in-one productivity tool that can access your things has been on my mind a lot recently, as I've been trying to build my own prototypes for how that could work. But what I didn't anticipate would come so quickly is the need for an interface to orchestrate agents. Over the past two weeks, just from my own programming flow, it's become obvious that the future isn't one agent doing things for you and then reviewing in the IDE — it's coordinating many agents in parallel, all within one place. That's the interface that's missing, and I think it's going to be huge.

I wanted to share a bit about how big of an opportunity this is, why it's something I've been tracking, and some of the trials and errors of building toward it.

## The interest

There's a concept called latent demand — when the market shows you it wants something before the solution actually exists. That's exactly what's happening with Claude Code right now. While Claude Code was originally built with engineers in mind, because it's such a good agent harness and it's good at using computers, folks discovered it could work for non-coding tasks as well. This was even taken to the extreme by ClawdBot (now [OpenClaw](https://openclaw.ai)), a project which gives Claude Code its own computer (eg. with a Mac Mini or VPS) so you can have an always-on assistant you can text.

These tools weren't built for this. But the fact that people are bending them to do it anyway is a pretty clear signal: there's demand for a generalized agent interface that bundles all of these capabilities together.

What makes this even more interesting is that models are getting really good at computer use — and projects like OpenClaw and [Zo Computer](https://zo.computer) take that to its logical conclusion by giving an agent full access to its own machine. The computer and file system become the operating environment under the hood, giving the agent both the tools and the runtime to actually execute. I could see that pattern leading to entirely new AI-native runtimes for managing agents and users' applications.

On the coding side, the first shift was to be able to use agents at all -- and using IDEs like Cursor to complete the feedback loop by responding in the sidebar chat or checking the diff manually. And then another big shift was the ability to have background agents to fire off work when you're not around -- whether that's with Cursor/Claude Code in the cloud or tagging agents in context like with Slack or Linear(where you can literally go from task delegation to an agent). But extremely quickly(even in the past few weeks) it's become very clear that agent orchestration is going to be the next wave.

Look at [this tweet from Amp Code for example](https://x.com/AmpCode/status/2019447473127702812), they're deprecating their sidebar extensions for editors like VSCode/Cursor because they believe the shift will go away from having a sidebar and IDE to environments meant to doing work across multiple agents(even [long-running agents](https://x.com/mntruell/status/2011562190286045552)). Or [Nathan Flurry's demo](https://x.com/NathanFlurry/status/2019528889643725176) of using [OpenCode](https://opencode.ai) as a universal coding agent control layer across Claude Code, Codex, and Amp — with an HTTP API for sandboxed agents. Many engineers(myself included) have even started building bespoke "agent control centers" for themselves just out of necessity.

<Tweet id="2019447473127702812" />

This isn't a new obsession for me. What got me into tech as a teenager was trying to make a browser (or OS or workspace) that I could organize more — one where everything I was doing was at my fingertips and linked. That's what [Cortex](https://www.withcortex.com) was always about: how do you take all of your data, all of your context, and make it usable and connected?

With agents, that old dream suddenly has teeth. If you can give an agent access to your data and your computer, you don't need to manually wire everything together anymore. The agent *is* the connective tissue. So a lot of what I've been thinking about with Cortex — how to get my data, structure it, and make it actionable — maps directly onto this new world of agents controlling computers. And it's that background that makes me think the opportunity here is even bigger than most people realize.

## The opportunity

So what does this actually look like? When agents can work in parallel, the interface problem becomes: how do you see everything that's happening, steer it, and keep it all in one place? That's a fundamentally different design challenge than a chat sidebar or an IDE with AI bolted on. It needs to be a command center.

There are early attempts. Codex gives you a dashboard for parallel coding tasks. OpenCode blends chat with code diffs. But I think these are still v1 — they're oriented around individual sessions, not around the *work itself*. The interface should be organized by what you're trying to get done, not by which agent you're talking to.

And this pattern extends way beyond code. Imagine checking in on your morning and having agents that already gathered your emails, calendar updates, and notifications — and instead of jumping between five apps, you're steering it all from one place. The same need — a unified place to orchestrate agents doing real work — applies to research, scheduling, writing, operations, all of it. The interface for coordinating coding agents is just the first draft of what will eventually become the interface for coordinating agents doing *anything*. Once you have that, you're not building a dev tool anymore. You're building a new OS layer.

## The trials and errors

I've been circling this idea in different forms for the past few months. The first serious attempt was through Cortex: a desktop app that aggregates data from different sources — Farcaster, browser history, banking transactions, my Obsidian vault — into a unified timeline backed by local SQLite. The idea was simple: pull your data out of all the apps it's siloed in, store it locally so you own it, and give it a shape that's useful. A chronological log of everything turned out to be a surprisingly good unifying metaphor — a Farcaster cast, a browser history entry, a bank transaction, and a markdown note all fit naturally into the same timeline.

<Cast url="https://farcaster.xyz/dylsteck.eth/0x36edb39a" />

I also experimented with a fork of [Min Browser](https://github.com/minbrowser/min) to see what it would look like if the browser itself became the organizing interface — adding a history timeline, note capture while browsing, and session management. The tension between the two approaches ("pull data out of apps and build your own interface" vs. "make the browser the interface") was useful even if I didn't fully resolve it. Both taught me that the hard part isn't the UI — it's getting your data connected and structured in the first place. Once you have that, agents can actually do things with it. I will also note it seems browser use is continuing to get a lot better in the latest models, so I expect that could become handy down the line.

That realization shifted my focus with Cortex. Instead of trying to build the big unified interface, what mattered more was the data layer and the SDK for agents — getting your data ready so agents can actually use it on your computer. The interface would come, but the foundation had to be right first. And I think the ecosystem is converging on the same idea — as [Rhys Sullivan put it](https://x.com/RhysSullivan/status/2019937547020038184), agents don't just need CLIs or MCPs, they need typed SDKs where you can gate permissions per function and let the model understand inputs and outputs natively.

Around the same time, I built [Ship](https://github.com/dylsteck/ship), a personal background coding agent inspired by [Ramp's Inspect](https://builders.ramp.com/post/why-we-built-our-background-agent). The idea: spin up a sandboxed cloud environment with [E2B](https://e2b.dev), clone a repo, and let an agent work on it autonomously while you do other things — then check back later. It's a Next.js dashboard on top of OpenCode with a Cloudflare Workers backend, where you kick off a task and messages stream in real-time via SSE. Building it taught me a lot about the local vs. cloud split — ephemeral sandboxes are great for fire-and-forget tasks, while persistent local setups are better for ongoing work. I'm sure those learnings will converge, but Ship gave me a feel for what the cloud side of agent coordination looks like in practice.

<video src="https://github.com/user-attachments/assets/8ca7aa09-9004-4d4d-8d83-d086403afa63" controls></video>

Then at work, the need for an agent coordination interface came up organically. It started simple — a dashboard to organize the different coding agent sessions I have going, built on top of OpenCode. Inspired by [Amelia Wattenberger's posts](https://x.com/Wattenberger/status/2019069182378213674) about having everything you need in one place instead of jumping between terminals and apps, it was just a list of chats organized by repo.

<Tweet id="2019069182378213674" />

But it kept expanding. After talking with teammates about their daily workflows, we landed on the Linear ticket as the atomic unit instead of the chat session. A ticket can have multiple PRs and chats. Agents can create and assign tickets. Even random one-off PRs get a temporary ticket. It's just a better primitive for tracking everything that's happening.

From there, each page started filling out:
- **Ticket view**: open chats and their PRs, outstanding todos (respond to an agent, failing CI, unresolved comments), project context, side notes.
- **Project view**: project doc, all tickets and deadlines, resources and summaries sourced from past chats.
- **Chat view**: the full conversation, a summary, todos, and the linked PR.

Two principles kept emerging: you should be able to do *everything* within this one app without jumping to others, and you should be able to have multiple things going in parallel in the same interface. Parallelized work plus unified interface — that combination is the real unlock, and it's actually doable now.

Between the work dashboard teaching me what coordination interfaces need and Cortex teaching me what data infrastructure agents require, the outline of something bigger started to take shape — something beyond a coding dashboard or a data aggregator, closer to that vision I've been chasing since I was a teenager, but with the tech to actually pull it off.

Imagine an app running locally or in a sandbox — a meta-layer UI that sits in a container and controls a computer. Instead of apps and windows as the primary unit, everything is task-based and comes to you. You open it up in the morning and agents have already gathered your emails, notifications, and updates. You ask questions, give direction. The UI renders little app interfaces on the fly — custom homepages for each thing that needs your attention. "Wanting to go to an app" becomes the exception, not the rule.

The whole thing would be task-based and fluid — but built for a world where agents can actually do the work. And underneath it, the computer and file system become the runtime, the same way projects like OpenClaw showed that giving an agent its own machine lets it truly execute. The difference is the interface: not a terminal, not a chat window, but something designed from scratch for coordinating agents and getting things done.

Each attempt taught me something. The timeline is a good unifying metaphor. Local-first data ownership matters. Performance matters more than you think. And the biggest lesson: identify the most cutting-edge and performant ways to use agents today, and build the right abstractions around that.

What's different now is that the threads are finally converging. At work I'm building the coordination interface. On my own I'm building the data layer. And for the first time, the models are capable enough that the vision I've had since I was a teenager — a single environment where everything you're doing is at your fingertips, linked, and actionable — is actually within reach. The next thing I want to build is that task-based agent OS: the container that ties it all together. I'm going to keep building toward it.