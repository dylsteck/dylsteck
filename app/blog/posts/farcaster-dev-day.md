---
title: 'Farcaster Dev Day'
publishedAt: '2024-09-27'
summary: 'A recap from the inaugural Farcaster Dev Day in Venice Beach, CA.'
---

Yesterday was the inaugural Farcaster Developer Day, an event I was glad to have been able to attend and think was needed as a time for developers to re-group and focus on the tasks ahead for the protocol & its growing ecosystem. Before I go further into my recap/analysis of the event, I want to give a huge shout-out to [Ted](https://warpcast.com/ted) for organizing the entire event and doing an amazing job executing as always; I'd also be remiss if I didn't give a shout-out to [Warpcast](https://warpcast.com)/[Merkle](https://merklemanufactory.com/) for sponsoring the event and being so open to answering our questions all throughout!

## Main Panel
The highlight of the developer day was a ~2.5 hour panel/presentation that [Dan](https://warpcast.com/dwr.eth) and [Varun](https://warpcast.com/v) ran. The panel centered around the topics the developers in the room thought were most important(from a pre-filled survey), that way the conversation could let Warpcast bring up their stances on those topics and could also let the developers in the room chime in on thoughts relating to their own products. Below is an overview of the topics and conversations that were brought up -- if you want the skim, you can check out [this cast thread](https://warpcast.com/dylsteck.eth/0xf6219673) and [this tweet thread](https://x.com/Dylan_Steck/status/1839351273973575950).

### Growth
- Based on the survey, consensus top priority for the group
- Top growth priorities: channels, frames, retention, hubs
- Scaling big thing here too, making sure network doesn't fall over if we 10x etc
#### Channels
- Today: membership, core channel UX refresh, APIs
	- re: API, everything but channel creation will have day one APIs
- Up next: better casting in a channel/casting experience in a channel(maybe rushed for some folks), decentralization
	- This new change should get us *closer* to decentralization -- POV from Warpcast is: get the UX change solid, get onboarding really great, and *then* decentralize it
		- The current model proposed is relatively straightforward to decentralize
- Trying to get channel changes out by next week(potentially Thurs or Fri)
	- Some people launching too like [Hypersub](https://hypersub.withfabric.xyz/), if you're building for this tell Dan
	- Want to get right set of users in channels on day one
- Good convo with [Jason from Airstack/Moxie](https://warpcast.com/betashop.eth) on what channels could look like, having people "come for the community and stay for the Warpcast" not the other way around
	- and re: how it would drive growth from [Zach from FC Marketplace](https://warpcast.com/zd)
		- Probably not massive growth right on launch but if you play the game it can have an opportunity to drive growth
			- Like Discord for 2021 NFTs at the time, needed it for that "job"
	- [Tim from Bracket.game](https://warpcast.com/tldr): do we have the people we need to grow channels rn or no
		- Dan: we have the people right now, ideally if you put the effort in you can get a good bit out of it
			- like directory not from a company but more soverign(made Microsoft ActiveDirectory example)
			- Jason: you don't join Telegram for Telegram, you join *for* the community etc
				- Inviting friends to Warpcast not just for whole network, but to join this particular community
			- Dan: the key to driving growth for this == *you* are building a channel on farcaster
				- That influence of them joining as a member can change their algo feed etc, much easier way to join the network just through the channel
				- 'Channel entrepreneurs' making new default experiences for new users, higher likelihood of retention and also ROI of doing work to invite someone
		- Jason: top thing is need spam out, even if had spam filter wasn't always right fit and spam got in. if can use first version with membership to get spam out, biggest thing can overcome right now. Don't make it so easy for people to get back to where they're at, add all other people -- gotta make it clean and fix the problem. view the membership tickets as *really* valuable
			- Dan: 100% agree, went through [Automod](https://automod.sh/)/[Airstack](https://airstack.xyz) earlier and didn't even know the right rules when using it. gets to fact that this is hard
			- [Cassie](https://warpcast.com/cassie): if look at how some communities cozy corners outside Farcaster(like Hacker News), success comes from moderation but counter effect is news is from feed. will this content still show up in feed or mostly only in channel/shown to those members?
#### Frames
- Making frames better, adding mini apps(new experiments), transaction support
	- Whole lot of composer/cast action confusion etc, wanna simplify the LEGOs
	- Frames -- best way to get distribution for your app
		- Widget to put anywhere, on a site in a DC etc
	- Way to think about it / how they wanna simplify it
	- Simple use cases
		- Just take an action from a frame button etc, not a lot of interaction needed
	- Complex use cases
		- Launching an app from a CTA in the feed
			- Mini app click comes with authenticated FID that's not on other social media, ton of public info you can use to spruce up your original UX
		- Future iteration they'd like to explore: ability to pass a transaction back into Warpcast and get a frame UX
			- eg. they'll generate the transaction flow, you don't have to go through the clunky wallet connect step, etc
			- Rebrand to have frames, apps, transaction(no more lean stack, FAT stack lol)
				- Like how your Apple app can be an app but be compliant with widgets etc
	- *Wanna see people build mini apps, the more people wanna do that the more it'll indicate they should make it a priority*
	- Me: thoughts on explorer page and different ways to show frames?
	- Dan: explore page not getting used much right now but could/will def update to show things like recently shown/interacted frames, maybe bookmarks, boost/search apps
		- You don't go to the App Store to read the editorial you see things in a feed/in context, but also def helpful to go back and be like "whats that app i just used"
		- so will but maybe not focus right now and harder to get focus on surface areas that don't have red buttons or hot content
	- Zach: thoughts on frames being shown outside Warpcast?
	- Varun: like SIWF can come and things take time, but also frame renderers are hard to use and mini apps might be a better way to use smth(or even to launch/use a frame). maybe if so more folks would build frame clients etc(me: will have to think on this more/what the ROI would be)
		- also need mobile too
	- [Will from Syndicate](https://warpcast.com/will): mental modal for where mini apps end and clients start?
	- Dan: great entry point(maybe not for like [Supercast](https://supercast.xyz) unless its top of funnel like schedule), anything where trying to drive *DAU* behavior -- even if have mini app goal should be download your actual app(not PWA), native experience will drive your DAU. other interesting thing, apple is sensitive to things that aren't IAP, if you're doing your complex payment in another app via a link, its hard for apple to enforce or even look into, lot of things that can progressively be shown in the app.
		- personal note: almost like some of the legos are *Warpcast* legos where you use Warpcast as your bridge to do certain things that are annoying with compliance, DevEx, etc
			- like with this Apple IAP skirt example
	- Tim from Bracket: if the main frame value prop is one click pay in feed, when bringing in non crypto natives to a channel then how do they get onboarded(no way to get them mm/rainbow), ways to expand wallets for new crypto users, connect to wallet providers etc -- critical use case for them
	- Dan: Huge project on this and def. need feedback, the world is moving to embedded wallets. Is it with Coinbase and session keys or is it a Farcaster primitive where even Coinbase/Rainbow could get a Farcaster session key? From a UX standpoint, this should all happen in background, just make a safe transaction. If I had to guess, in a year from now we'll have a clearer idea. Also can make good transaction but if you're not transacting/don't have a balance, it doesn't matter. Coinbase has 100 million KYC'd users with fiat bank account, if you can pull into smart wallet with minimal friction that's probably the future of the UX.
	- Cassie: If Apple says mini app isn't an acceptable term, whats the next term we'd try to use?
		- Dan: haven't thought that far lol, there are ways to highlight it in app without saying 'app'. Coinbase used to have to do dApp and changed it, can come up with a word. Use ChatGPT lol. One piece of advice with Apple: being very selective on how you show off the default UX gets you very far -- reviewers just use test account, they dont make another account, and crypto is such a small scale. Coinbase probably gets lot more scrutiny but at this/Farcaster/Warpcast stage you can be more aggressive about how you do things, probably ok until like 1000x scale
	- [Christopher from Unofficial](https://warpcast.com/christopher): User growth and using IAP for storage vs paying with tokens
		- Varun: converted 10x to 100x better with people going through flow, big no no from Apple too/don't love it. for Warpcast this has been best UX, very few people stuck on vs connect to another wallet

### Direct Casts
- DCs are stable, programable DCs are growing
	- Some great use cases for purchases, reminders(like streams), etc
- Short term focus: making improvements in programmability
- Long term focus: working on a plan for interoperability, likely 2025
	- If you think this is a top priority, reach out & this will help them prioritize. But for now there are a lot of competing priorities and this is probably still long term as other things are worked out
- [Max from Privy](https://warpcast.com/segall): what are the core performance things/bugs that need to get done before it can replace Telegram/Discord for crypto convos?
	- Varun: laser focused on the fact that if you start a convo on FC, it should stay in the DC universe (didn't really talk about performance but I know Gabriel and others are working on it)
		- Dan: basically everyone writes React/React Native so get to move quickly, lot of message apps are native & have been around for a while & are local -- wanna do it in right way where others in the ecosystem can easily use it too(and also some chats already on TG, playing the go forward game)
- Jason: plans to connect DCs to channels? then can also invite someone just to a dc group and thats how they get onto warpcast
	- Varun: have kicked it around but not explicitly on the roadmap, seems powerful though. intermediary step could be sending push notifications to your channel. 
- Cassie: privacy implications going fwd, making sure this is well organized
	- Varun: fairly nuanced problem bc in theory maybe an app could see your DCs but you didn't want them to, just gotta think through
- [Kevin from Neynar](https://warpcast.com/kevinoconnell): thoughts to programmatically receive DCs
	- Varun: next is read APIs, listen to new messages coming in and send messages coming out
		- great for customer support etc(LLMs do all this stuff and then I respond/organize manually)

### Reduce sign up costs
$1 signups by early next year
- Blocker is spam -- need to solve new problems when we lower costs
- Warpcast can subsidize onboarding costs for *non-spammy* users
- Interested in talking about legitimate signup subsidies, but need to make sure it's non spammy users
- Reach out to Warpcast on this, still thinking through & no full framework here
- Also separately [Horsefacts](https://warpcast.com/horsefacts.eth) is working on a v1 solution(and more in the future) that'll make it easier to use an account on Warpcast that you made on another client like Supercast
- Daniel from Bountycaster: what should this look like from a dev perspective, how do we sign new users up?
- Varun: thinking in context of apps that already onboard users(you're willing to build the wallet, store the key etc)
	- sign up first 1k users, we'll cover costs and then after talk about what sort of non-spammy users can continue to be subsidized
- Dan: one thing is Neynar can create new accounts so reach out & then can also interface w Warpcast, also Privy has a pretty deep integration
	- when all in the corner and not talking to people it's probably frustrating vs trying to think through with teams that have infra and/or ideas
	- put in a lot of work to make signups permissionless and it added to the credible neutrality but not fully getting used, wanna have ongoing convos bc that's a big help for warpcast to org their priorities
- *Woj also just vouched for using Privy x Neynar for signups too, said it's pretty easy these days*
- Jason: think this is a Warpcast issue, need to be able to invite anyone to a channel and warpcast just shows me what i wanna see, there are a ton of airdrop farmers on twitter but i dont see them
	- dan: yeah we're working on multiple diff things, have tried a few things
- [Sahil from OpenRank](https://warpcast.com/sahil): global spam is good but not for a cozy corner, i wanna rank just those people. when surface for more channels opens up, we'll think more of spam as a social public good that can be filtered out, not just a clear correlation btw spam and quality content

### Hubs
Sync is improving, but has rough edges
- Sync needs a redesign, won't scale at current pace
	- New system introduces a level of ordering & concepts from blockchains to the sync model, won't have these classes of sync issues that'd get in the way
	- Large public GH discussion happening re: snapchain
		- https://warpcast.notion.site/Snapchain-Public-0e6b7e51faf74be1846803cb74493886
- Woj: as we scale to 1000x and there are more tradeoffs, whats the minimal assumption that will always be true about hubs throughout scaling?
	- Varun: everyone should be able to sync data and choose what to read/write. at some point too much data or you don't wanna store all of it, first step change will be specifying fids to sync on hubs(can still get single global hub though). second step change in next design is sharding, even at global validator level not every validator will store the network's data. still guarantee that if sync 1000 users you'll get it regardless of how sharded. so what matters? can pick size of network you want and get the data as long as you'll pay for the storage etc. also multiple writers from day one, neynar committed to do this, wanna ideally get to at least 10.

### Other Items
- More user data on the protocol -- eg. location data(new FIP for this)
- Sign In with Farcaster -- web, then multi-client
- Spam dataset -- Neynar and OpenRank working on solutions

**Note:** I don't have any comments on it but another *very* notable part of Farcaster Dev Day was the three hours of product demos that kept going because everyone was super interested in what everyone else was building! Some demos off the top of my head included [Supercast](https://www.supercast.xyz/), [Privy](https://www.privy.io), [Neynar](https://neynar.com), [Moxie](https://www.moxie.xyz/), [Eventcaster](https://events.xyz), [MBD](https://mbd.xyz/), [Moshicam](https://moshi.cam), [Rodeo](https://rodeo.club/), [Wildcard](https://wildcard.lol), [Trivia](https://warpcast.com/matthewfox/0x50f2bd44), [Buoy](https://buoy.club/), [Bracket.game](https://bracket.game), [Uno](https://warpcast.com/~/channel/uno), [Bountycaster](https://bountycaster.xyz), [Syndicate](https://syndicate.io), and many other great projects (I demo'd [Cortex blocks](https://warpcast.com/dylsteck.eth/0xcbc63ebd) as well :D). 

## Analysis

One thing I really enjoyed was the fact that today was very discussion based, which let me hear/see a bunch of different perspectives on topics. I think that plus some new roadmap/direction-based context gave me a new take on certain ideas or takes, such as:
- I think Warpcast is going to become a consumer developer resource in a similar way to how a lot of builders trust Coinbase to cover KYC, swapping, frontend components, and smart wallet(the whole stack basically). Instead of apps rolling out their own embedded wallets, I think it's going to make the most sense for Warpcast to have some sort of smart/embedded wallet that they're then able to set session keys and action API requests for.
- I'm bullish on the motivations behind new channel updates but I still don't see the incentive or transition steps for a channel owner to want to create something like a Hypersub or a fan token for their channel. Unless the token itself offers an explicit reward you want to get or you have a lot of conviction in its price and that's why you built/ran your community, then I don't see why a majority of channel owners wouldn't want to just add the existing members(with some slight moderation). With that being said, I do really agree with a point Jason made earlier about new Farcaster users being able to "come for the community and stay for the Warpcast".
- Different people will have different definitions of spam, but: 1) there's a good chance that some folks could reach consensus on some of those definitions after enough trial and error that would give both parties more confidence in whatever they agree to, and 2) there could actually be some good learnings or abnormalities that come out of spam. For example, Woj was talking about certain airdrop farmers on Supercast came just to airdrop farm but ended up staying because of the friends that they made on Farcaster.
- I think there's going to be even more exploration around both the limits of mini apps but also their placement in an app like Warpcast. Mini apps work well within the contexts they're presented, but right now you have to see a mini app deeplink in a feed for this to be true. However if mini apps become bridges between clients and apps, then there could be other surface areas for them to fit within clients. I'm sure there could also be a few experiments run on features such as the Warpcast Explore tab(Dan had mentioned something about showing recently interacted and/or favorited mini apps there).
- It seems like there might be a bit more emphasis/attention regarding bringing new(and maybe even non-crypto) users onto Farcaster and I think this is a great thing/great shift in attitude. This brings about a bunch of new problems to solve - an example is that one would want to solve both for a new user who's just interested in joining an existing Farcaster community and also for a new user who has zero crypto context/background. And while there are a lot of benefits to focusing on the existing community/users, crypto is so relatively small that it's hard to not think about the larger goal, especially when the LEGOs on Farcaster are getting so good that we *might* be close to a much more frictionless onboarding experience for net-new users.

I'll also add two more personal notes that aren't just focused on the technical conversations from today:
- The main reason I got excited about Farcaster was the idea that if this goes well, the Internet wouldn't just have a permissionless social protocol but also a set of building blocks that can be used for a variety of crypto and non-crypto use cases(that interoperability drew me in). To see that both the prospect of a credibly neutral town square/social network *and* a set of developer LEGO blocks are still alive and well make me excited for what developers will continue to have at their disposal going forward. And people like Merkle and the folks who showed up on Dev Day seem to be truly aligned towards making sure this all gets done in the right way, with first principles, lean startup movement/shipping and an overall long-term mindset. 
- If anything, I'm glad to have attended(and to be on Farcaster) for the community. To me it really does mean so much. This is a community of extremely genuine and kind people who have created this special place -- and tech or not the fact that I can get together with these folks for big events and share ideas/sentiments over the same interests is a really wholesome and rewarding thing to be a part of. I'll always try to go to as many in real life Farcaster events as I can(especially big time ones like this) because of how much the community aspect of this protocol means to me personally.

Thanks again to everyone who read this and/or has shared one of my threads, I really enjoy being able to live report on different events and this one was a real pleasure to attend!