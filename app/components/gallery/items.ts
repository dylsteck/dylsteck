import { GalleryItems, GalleryItemType } from "app/types";

const apostraphae = `'`;

export const allGalleryItems: GalleryItems[] = [
    { 
        name: 'Best of 2023',
        description: 'My favorite products, content, and writing from 2023',
        id: '2023-recap-best',
        articleSlug: '2023-recap',
        items: [
            {
              title: 'Embark: Dynamic documents for making plans',
              type: GalleryItemType.article,
              url: 'https://www.inkandswitch.com/embark/',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/embark-dynamic-documents-for-making-plans.png',
            },
            {
              title: 'Why GPT-3.5 is (mostly) cheaper than Llama 2',
              type: GalleryItemType.article,
              url: 'https://cursor.sh/blog/llama-inference',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/why-gpt-3.5-is-mostly-cheaper-than-llama2.png',
            },
            {
              title: 'Invisible Details of Interaction Design',
              type: GalleryItemType.article,
              url: 'https://rauno.me/craft/interaction-design',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/invisible-details-of-interaction-design.png',
            },
            {
              title: 'Make Ethereum Cypherpunk Again',
              type: GalleryItemType.article,
              url: 'https://vitalik.eth.limo/general/2023/12/28/cypherpunk.html',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/make-ethereum-cypherpunk-again.png',
            },
            {
              title: 'Spellburst: A Node-based Interface for Exploratory Creative Coding with Natural Language Prompts',
              type: GalleryItemType.paper,
              url: 'https://arxiv.org/abs/2308.03921',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/spellburst-a-node-based-interface-for-exploratory-creative-coding-with-natural-language-prompts.png',
            },
            {
              title: 'AppAgent: Multimodal Agents as Smartphone Users',
              type: GalleryItemType.paper,
              url: 'https://arxiv.org/abs/2308.03921',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/appagent-multimodal-agents-as-smartphone-users.png',
            },
            {
              title: 'Embracing Irrelevancy for Progress',
              type: GalleryItemType.video,
              url: 'https://www.youtube.com/live/tK5xI7PiCSY?si=V6BWg22abVJrPuHy&t=1575',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/embracing-irrelevancy-for-progress.png',
            },
            {
              title: 'Alex Labossiere Intervew with Keith Rabois',
              type: GalleryItemType.video,
              url: 'https://www.youtube.com/watch?v=S9by0kQ12aI',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/alex-labossiere-interview-with-keith-rabois.jpg',
            },
            {
              title: 'Zora x Warpcast',
              type: GalleryItemType.nft,
              url: 'https://opensea.io/assets/zora/0x4afa7992f876225cda4d503d0d1a3125348ce35b/1',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/zora-x-warpcast.png',
            },
            {
              title: 'Game 5',
              type: GalleryItemType.nft,
              url: 'https://opensea.io/assets/ethereum/0xdf5b19c367b4f3369e3fce60cbbac41a2d63b937/20',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/game5-nft.png',
            },
            {
              title: 'v0',
              type: GalleryItemType.product,
              url: 'https://v0.dev',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/v0-dev.png',
            },
            {
              title: 'Warpcast',
              type: GalleryItemType.product,
              url: 'https://warpcast.com',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/warpcast-brave-pwa.png',
            },
            {
              title: 'Neynar',
              type: GalleryItemType.product,
              url: 'https://neynar.com',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/neynar-website.png',
            },
            {
              title: 'Interface',
              type: GalleryItemType.product,
              url: 'https://interface.social',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/interface-dot-social.png',
            },
            {
              title: 'Titles',
              type: GalleryItemType.product,
              url: 'https://titles.xyz',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/titles-ai-powered-creative-tools-for-remixing-and-publishing-cryptomedia.png',
            },
            {
              title: 'Zora',
              type: GalleryItemType.product,
              url: 'https://zora.co',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/zora-website.png',
            },
            {
              title: 'ChatGPT and the gpt-4-turbo API',
              type: GalleryItemType.product,
              url: 'https://openai.com',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/openai-website.png',
            },
            {
              title: 'LangChain Memory',
              type: GalleryItemType.product,
              url: 'https://python.langchain.com/docs/integrations/memory',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/langchain-memory.png',
            },
            {
              title: 'pgvector',
              type: GalleryItemType.product,
              url: 'https://github.com/pgvector/pgvector',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/pgvector-github.png',
            },
            {
              title: 'Apple Vision Pro',
              type: GalleryItemType.product,
              url: 'https://www.apple.com/apple-vision-pro/',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/apple-vision-pro-website.png', 
            },
            {
              title: 'Tab',
              type: GalleryItemType.product,
              url: 'https://mytab.ai/',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/tab-avi-schiffmann-website.png', 
            },
            {
              title: 'Humane AI Pin',
              type: GalleryItemType.product,
              url: 'https://hu.ma.ne',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/humane-ai-pin-website.png', 
            },
            {
              title: 'Privy Embedded Wallets',
              type: GalleryItemType.product,
              url: 'https://www.privy.io/features/wallets',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/privy-embedded-wallets.png', 
            },
            {
              title: 'Base and Onchain Summer',
              type: GalleryItemType.product,
              url: 'https://onchainsummer.xyz',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/onchainsummer-website.png', 
            },
            {
              title: 'Perplexity',
              type: GalleryItemType.product,
              url: 'https://perplexity.ai',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/perplexity-ai-website.png', 
            },
            {
              title: 'LlamaIndex',
              type: GalleryItemType.product,
              url: 'https://llamaindex.ai',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/llamaindex-website.png', 
            },
            {
              title: "Rainbow's Chrome Extension",
              type: GalleryItemType.product,
              url: 'https://chromewebstore.google.com/detail/rainbow/opfgelmcmbiajamepnmloijbpoleiama',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/rainbow-chrome-extension.png', 
            },
            {
              title: 'iris.fun',
              type: GalleryItemType.product,
              url: 'https://iris.fun',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/iris-fun-website.png', 
            },
            {
              title: 'Dot by New Computer',
              type: GalleryItemType.product,
              url: 'https://new.computer',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/dot-new-computer-website.png', 
            },
            {
              title: 'Family',
              type: GalleryItemType.product,
              url: 'https://family.co',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/family-wallet-website.png', 
            },
          ]
    }, 
    {
        name: '2023 Recap',
        description: 'Every project and piece of content I launched or helped work on this year',
        id: '2023-recap-portfolio',
        articleSlug: '2023-recap',
        items: [
            {
              title: 'Casterscan (v1 with Yash Karthik)',
              type: GalleryItemType.product,
              url: 'https://casterscan.com',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/casterscan-v1-website.jpg',
            },
            {
              title: 'Farcaster Kit',
              type: GalleryItemType.product,
              url: 'https://farcasterkit.com',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/farcasterkit-v1-website.png',
            },
            {
              title: 'Litecast',
              type: GalleryItemType.product,
              url: 'https://github.com/dylsteck/litecast',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/litecast-v1-mockups.png',
            },
            {
              title: 'PurpleDAO Homepage',
              type: GalleryItemType.product,
              url: 'https://purple.construction',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/purple-website-redesign-2023.png',
            },
            {
              title: 'Group Purple',
              type: GalleryItemType.product,
              url: 'https://www.party.app/party/0x6eee24de6f3806b0d53fa1fe7052dd2979e123ef',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/group-purple-on-party-website.png',
            },
            {
              title: 'Web3 Sign a PDF with Tayyab Hussain',
              type: GalleryItemType.product,
              url: 'https://github.com/dylsteck/eth-pdf-signature',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/web3-sign-a-pdf-website.png',
            },
            {
              title: 'Timeline(a Cortex demo)',
              type: GalleryItemType.product,
              url: 'https://twitter.com/Dylan_Steck/status/1714785040478183888',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/cortexTimelineMockup.png',
            },
            {
              title: '2022 Recap',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/2022-recap',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/2022Recap.png',
            },
            {
              title: 'Next in Tech - Jan. 28, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-jan-28-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechJan282023.png',
            },
            {
              title: 'User AI-gency',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/user-ai-gency',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/UserAIgency.png',
            },
            {
              title: 'Next in Tech - Feb. 4, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-feb-4-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechFeb42023.png',
            },
            {
              title: 'Building a Digital Garden',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/building-a-digital-garden',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/BuildingADigitalGarden.png',
            },
            {
              title: 'Next in Tech - Feb. 11, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-feb-11-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechFeb112023.png',
            },
            {
              title: `The Boom of Farcaster${apostraphae}s Developer Community`,
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/the-boom-of-farcasters-developer-community',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/TheBoomOfFarcastersDeveloperCommunity.png',
            },
            {
              title: 'Next in Tech - Feb. 18, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-feb-18-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechFeb182023.png',
            },
            {
              title: 'Next in Tech - Mar. 4, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-mar-4-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechMar42023.png',
            },
            {
              title: 'Internet OS',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/internet-os',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/InternetOS.png',
            },
            {
              title: 'The Wallet of Tomorrow',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/the-wallet-of-tomorrow',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/TheWalletOfTomorrow.png',
            },
            {
              title: 'Next in Tech - Mar. 20, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-mar-20-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechMar202023.png',
            },
            {
              title: 'Next in Tech - Mar. 25, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-mar-25-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechMar252023.png',
            },
            {
              title: 'Next in Tech - Apr. 1, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-apr-1-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechApr12023.png',
            },
            {
              title: 'Product Launch NFTs',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/product-launch-nfts',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/ProductLaunchNFTs.png',
            },
            {
              title: 'Next in Tech - Apr. 8, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-apr-8-2023',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/NextInTechApr82023.png',
            },
            {
              title: 'Shifting Directions',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/shifting-directions',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/ShiftingDirections.png',
            },
            {
              title: `Focus on What Doesn${apostraphae}t Scale`,
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/focus-on-what-doesnt-scale',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/FocusOnWhatDoesntScale.png',
            },
            {
              title: 'Internet OS',
              type: GalleryItemType.video,
              url: 'https://youtu.be/IpbvRUdLY_U?si=2YaBZ3MuHcQxgOsW',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/InternetOS.png',
            },
            {
              title: 'Cortex N&W Update - Apr. 24',
              type: GalleryItemType.video,
              url: 'https://youtu.be/eP-R45cngoA?si=9VFXELiQCtezzE6T',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/cortex-n-and-w-update-apr-24-23-yt-thumbnail.png',
            },
            {
              title: 'Thoughts on LLMs Shaping our Future',
              type: GalleryItemType.video,
              url: 'https://youtu.be/GarUfO9ARf4?si=7vLZcO4Bd8rhBQKz',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/thoughts-on-llms-shaping-our-future-yt-thumbnail.jpg',
            },
            {
              title: 'Casterscan Video Update',
              type: GalleryItemType.video,
              url: 'https://youtu.be/jgixEy4X72A?si=zUf-aqqGgcniQ4tk',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/casterscan-video-update-yt-thumbnail.jpg',
            },
            {
              title: 'FIP-2 Primer',
              type: GalleryItemType.video,
              url: 'https://youtu.be/1UFqZ7nHs1I?si=-QtwDsx8yFKM_XEu',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/fip2_primer-yt-thumbnail.png',
            },
            {
              title: `Reaction To Balaji${apostraphae}s Cloud Cartography Comments on MoZ`,
              type: GalleryItemType.video,
              url: 'https://youtu.be/OgBcDJNXMzs?si=damTfAwdGfkgfi89',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/reaction-to-balaji-cloud-cartography-moz-yt-thumbnail.jpg',
            },
            {
              title: 'AI Wearable Wars',
              type: GalleryItemType.video,
              url: 'https://youtu.be/e_xLZTxCLcY?si=4A4mtP4oUVrttoCq',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/ai-wearable-wars-yt-thumbnail.png',
            },
            {
              title: '10/18 Updates: Timeline and Farcaster Kit',
              type: GalleryItemType.video,
              url: 'https://youtu.be/0jLV0_03H68?si=nQeYnfOLgjt1qWwK',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/10-18-updates-timeline-farcasterkit-yt-thumbnail.jpg',
            },
            {
              title: 'Purple Season 1 in 96 Seconds',
              type: GalleryItemType.video,
              url: 'https://youtu.be/jSCAyiOHTXM?si=zr85qq_yJqrzRPxL',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/purple-season-1-in-96-seconds-yt-thumbnail.jpg',
            },
            {
              title: 'Introducing Farcaster Kit',
              type: GalleryItemType.video,
              url: 'https://youtu.be/ITzUr3haE8I?si=naCal0RWIlSgfjcQ',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/introducing-farcasterkit-yt-thumbnail.png',
            },
            {
              title: 'OpenAI Dev Day Recap',
              type: GalleryItemType.video,
              url: 'https://youtu.be/9CIryp5RkPg?si=4nHaYe1WBMdzOTfR',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/openai-dev-day-recap-yt-thumbnail.jpg',
            },
            {
              title: 'Product Launch NFTs',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/eth:0xc9723c1383b76e4155941db94c89fbbcbe862c05',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/ProductLaunchNFTs.png',
            },
            {
              title: 'Introducing Casterscan',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/eth:0x326b7a73624a08005614979c0852211c0bce15d6',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/introducing-casterscan-nft.gif',
            },
            {
              title: 'zorb in the sky',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/zora:0x1df87873824bebdd58e89e2bb3f8502491829894',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/zorb-in-the-sky-nft.png',
            },
            {
              title: 'Celebrate Casterscan v2',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/base:0xfb097e5579cca171a443935c8469ff2fa5f27c19',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/celebrate-casterscan-v2-nft.png',
            },
            {
              title: 'Purple Season 1 in 96 Seconds',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/zora:0x4cf66994ca43a27c3b28e05032e350af59c70b50/1',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/purple-season-1-in-96-seconds-yt-thumbnail.jpg',
            },
            {
              title: 'Purple Strategy Group Community Questions',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/base:0xed66a3cb41f32d9cdb56b086e51f11472ff4c8ce/1',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/purple-strategy-group-community-questions-nft.png',
            },
            {
              title: 'A Bunch of NeR(d)F by Kismet Casa for ENERGY',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/zora:0x2b1a039a4b74b89f95fd05403e7d1d4478bed04a',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/a-bunch-of-nerdf-kismet-casa-energy-nft.png',
            },
            {
              title: 'Glimpse (internship)',
              type: GalleryItemType.product,
              url: 'https://glimpse.surf',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/glimpse-extension-banner.png',
            },
            {
              title: 'Double Down (fellowship)',
              type: GalleryItemType.product,
              url: 'https://double-down.com/',
              imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/double-down-vc-banner.png',
            },
          ]
    },
    { 
      name: 'Best of 2024',
      description: 'My favorite products, content, and writing from 2024',
      id: '2024-recap-best',
      articleSlug: '2024-recap',
      items: [
          {
            title: 'Embark: Dynamic documents for making plans',
            type: GalleryItemType.article,
            url: 'https://www.inkandswitch.com/embark/',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704142855/media/embark-dynamic-documents-for-making-plans.png',
          }
        ]
  }, 
  {
      name: '2024 Recap',
      description: 'Every project and piece of content I launched or helped work on this year',
      id: '2024-recap-portfolio',
      articleSlug: '2024-recap',
      items: [
          {
            title: 'Cortex Chat',
            type: GalleryItemType.product,
            url: 'https://withcortex.com',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736054222/media/cortex-farcaster-chat-jan-25.png',
          },
          {
            title: 'Electronic',
            type: GalleryItemType.product,
            url: 'https://github.com/dylsteck/electronic',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736180348/media/electronic-fc-electron-client-jan-25.png',
          },
          {
            title: 'FarHack',
            type: GalleryItemType.product,
            url: 'https://farhack.xyz',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736182292/media/farhack-software-ss-jan-25.png'
          },
          {
            title: 'FarHack Summer',
            type: GalleryItemType.nft,
            url: 'https://zora.co/collect/base:0x23311dcce74f21ddc932bbfb2bac973a17404436/1',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736182943/media/farhack-summer-may-24.jpg'
          },
          {
            title: 'Icebreaker Recbot',
            type: GalleryItemType.product,
            url: 'https://github.com/icebreakerlabs/cartographer',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736184126/media/icebreaker-recbot-ss-jan-25.png'
          },
          {
            title: 'Litecast Web',
            type: GalleryItemType.product,
            url: 'https://github.com/dylsteck/litecast-web',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736182551/media/litecast-web-ss-jan-24.png'
          },
          {
            title: 'Litesparks',
            type: GalleryItemType.product,
            url: 'https://github.com/dylsteck/litesparks',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736182292/media/litesparks-ss-jan-25.png'
          },
          {
            title: 'Neynar Frame Studio (past work)',
            type: GalleryItemType.product,
            url: 'https://neynar.com/nfs',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736183784/media/neynar-frame-studio-ss-jan-25.png'
          },
          {
            title: 'Neynar React SDK (past work)',
            type: GalleryItemType.product,
            url: 'https://github.com/neynarxyz/react',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736183922/media/neynar-react-storybook-ss-jan-25.png'
          },
          {
            title: 'FramePG',
            type: GalleryItemType.product,
            url: 'https://github.com/fundpg/framepg',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736182853/media/framepg-ss-mar-24.png'
          },
          {
            title: '👏 net 👏 new 👏 social 👏 experiences 👏 on 👏 farcaster',
            type: GalleryItemType.nft,
            url: 'https://zora.co/collect/base:0x39c0317e48aeaf6869799848b75e57df9326e915/1',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736183076/media/net-new-social-experiences-on-farcaster-mar-24.jpg'
          },
          {
            title: 'Based Purple NFT',
            type: GalleryItemType.nft,
            url: 'https://zora.co/collect/base:0xae156ea16ec0ed683fd1eaad0b63b1b6bf3980d2/1',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736183208/media/based-purple-nft-mar-24.jpg'
          },
          {
            title: 'Farcaster Fever',
            type: GalleryItemType.nft,
            url: 'https://zora.co/collect/base:0x8298d2fc9c57104d2d4ed7e6efaa61d0ea11e47f/1',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736183323/media/farcaster-fever-mar-24.png'
          },
          {
            title: 'The Hub ep1 with guest co-host @samuellhuber.eth',
            type: GalleryItemType.nft,
            url: 'https://zora.co/collect/base:0x1e1b92d8277b8634b67b55efa619d765948a7a44/1',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736183511/media/the-hub-thumbnail-oct-24.jpg'
          },
          {
            title: 'The Hub ep2 with guest co-host @kevinoconnell',
            type: GalleryItemType.nft,
            url: 'https://zora.co/collect/base:0x1e1b92d8277b8634b67b55efa619d765948a7a44/2',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1736183511/media/the-hub-thumbnail-oct-24.jpg'
          },
          {
            title: 'Universal React',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/universal-react',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1729569683/media/universal-react-oct-22-24.png',
          },
          {
            title: 'Farcaster Dev Day',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/farcaster-dev-day',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1727418648/media/farcaster-dev-day-sept-27-24.png',
          },
          {
            title: 'Cortex One Pager',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/cortex-one-pager',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1725492120/media/cortex-one-pager-sept-4-24.png',
          },
          {
            title: 'Riffing on React Server Components',
            type: GalleryItemType.video,
            url: 'https://dylansteck.com/video/riffing-on-react-server-components',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1721684061/media/riffing-on-react-server-components.png',
          },
          {
            title: 'Free FIP-2',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/free-fip-2',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1719520174/media/free-fip-2-og-image.png',
          },
          {
            title: 'Crypto Super App',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/crypto-super-app',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1716068782/media/crypto-super-app-og-image.png',
          },
          {
            title: 'FarCon and FarHack 2024',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/farcon-and-farhack-2024',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1715483513/media/farcon-and-farhack-2024-og-image.png',
          },
          {
            title: 'The Pendant Problem',
            type: GalleryItemType.video,
            url: 'https://dylansteck.com/video/the-pendant-problem',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1715543714/media/the-pendant-problem-video-cover.jpg',
          },
          {
            title: 'Thoughts on building a Farcaster client',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/thoughts-on-building-a-farcaster-client',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1706147355/media/thoughts-on-building-a-farcaster-client-og-image.png',
          },
          {
            title: 'Onchain Nucleus',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/onchain-nucleus',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1705785983/media/onchain-nucleus-og-image.png',
          },
          {
            title: '2023 Recap',
            type: GalleryItemType.article,
            url: 'https://dylansteck.com/blog/2023-recap',
            imageUrl: 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1705785983/media/2023-recap-og-image.png',
          }
        ]
  }
]