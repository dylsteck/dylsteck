export type GalleryItem = {
    title: string;
    type: GalleryItemType;
    url: string;
    imageUrl: string;
};

export enum GalleryItemType {
    article = "Article",
    nft = "NFT",
    paper = "Paper",
    product = "Product",
    video = "Video",
}

export type GalleryItems = {
    name: string;
    description: string;
    id: string;
    articleSlug: string;
    items: GalleryItem[]
}

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
              imageUrl: 'media/embark-dynamic-documents-for-making-plans.png',
            },
            {
              title: 'Why GPT-3.5 is (mostly) cheaper than Llama 2',
              type: GalleryItemType.article,
              url: 'https://cursor.sh/blog/llama-inference',
              imageUrl: 'media/why-gpt-3.5-is-mostly-cheaper-than-llama2.png',
            },
            {
              title: 'Invisible Details of Interaction Design',
              type: GalleryItemType.article,
              url: 'https://rauno.me/craft/interaction-design',
              imageUrl: 'media/invisible-details-of-interaction-design.png',
            },
            {
              title: 'Make Ethereum Cypherpunk Again',
              type: GalleryItemType.article,
              url: 'https://vitalik.eth.limo/general/2023/12/28/cypherpunk.html',
              imageUrl: 'media/make-ethereum-cypherpunk-again.png',
            },
            {
              title: 'Spellburst: A Node-based Interface for Exploratory Creative Coding with Natural Language Prompts',
              type: GalleryItemType.paper,
              url: 'https://arxiv.org/abs/2308.03921',
              imageUrl: 'media/spellburst-a-node-based-interface-for-exploratory-creative-coding-with-natural-language-prompts.png',
            },
            {
              title: 'AppAgent: Multimodal Agents as Smartphone Users',
              type: GalleryItemType.paper,
              url: 'https://arxiv.org/abs/2308.03921',
              imageUrl: 'media/appagent-multimodal-agents-as-smartphone-users.png',
            },
            {
              title: 'Embracing Irrelevancy for Progress',
              type: GalleryItemType.video,
              url: 'https://www.youtube.com/live/tK5xI7PiCSY?si=V6BWg22abVJrPuHy&t=1575',
              imageUrl: 'media/embracing-irrelevancy-for-progress.png',
            },
            {
              title: 'Alex Labossiere Intervew with Keith Rabois',
              type: GalleryItemType.video,
              url: 'https://www.youtube.com/watch?v=S9by0kQ12aI',
              imageUrl: 'media/alex-labossiere-interview-with-keith-rabois.jpg',
            },
            {
              title: 'Zora x Warpcast',
              type: GalleryItemType.nft,
              url: 'https://opensea.io/assets/zora/0x4afa7992f876225cda4d503d0d1a3125348ce35b/1',
              imageUrl: 'media/zora-x-warpcast.png',
            },
            {
              title: 'Game 5',
              type: GalleryItemType.nft,
              url: 'https://opensea.io/assets/ethereum/0xdf5b19c367b4f3369e3fce60cbbac41a2d63b937/20',
              imageUrl: 'media/game5-nft.png',
            },
            {
              title: 'v0',
              type: GalleryItemType.product,
              url: 'https://v0.dev',
              imageUrl: 'media/v0-dev.png',
            },
            {
              title: 'Warpcast',
              type: GalleryItemType.product,
              url: 'https://warpcast.com',
              imageUrl: 'media/warpcast-brave-pwa.png',
            },
            {
              title: 'Neynar',
              type: GalleryItemType.product,
              url: 'https://neynar.com',
              imageUrl: 'media/neynar-website.png',
            },
            {
              title: 'Interface',
              type: GalleryItemType.product,
              url: 'https://interface.social',
              imageUrl: 'media/interface-dot-social.png',
            },
            {
              title: 'Titles',
              type: GalleryItemType.product,
              url: 'https://titles.xyz',
              imageUrl: 'media/titles-ai-powered-creative-tools-for-remixing-and-publishing-cryptomedia.png',
            },
            {
              title: 'Zora',
              type: GalleryItemType.product,
              url: 'https://zora.co',
              imageUrl: 'media/zora-website.png',
            },
            {
              title: 'ChatGPT and the gpt-4-turbo API',
              type: GalleryItemType.product,
              url: 'https://openai.com',
              imageUrl: 'media/openai-website.png',
            },
            {
              title: 'LangChain Memory',
              type: GalleryItemType.product,
              url: 'https://python.langchain.com/docs/integrations/memory',
              imageUrl: 'media/langchain-memory.png',
            },
            {
              title: 'pgvector',
              type: GalleryItemType.product,
              url: 'https://github.com/pgvector/pgvector',
              imageUrl: 'media/pgvector-github.png',
            },
            {
              title: 'Apple Vision Pro',
              type: GalleryItemType.product,
              url: 'https://www.apple.com/apple-vision-pro/',
              imageUrl: 'media/apple-vision-pro-website.png', 
            },
            {
              title: 'Tab',
              type: GalleryItemType.product,
              url: 'https://mytab.ai/',
              imageUrl: 'media/tab-avi-schiffmann-website.png', 
            },
            {
              title: 'Humane AI Pin',
              type: GalleryItemType.product,
              url: 'https://hu.ma.ne',
              imageUrl: 'media/humane-ai-pin-website.png', 
            },
            {
              title: 'Privy Embedded Wallets',
              type: GalleryItemType.product,
              url: 'https://www.privy.io/features/wallets',
              imageUrl: 'media/privy-embedded-wallets.png', 
            },
            {
              title: 'Base and Onchain Summer',
              type: GalleryItemType.product,
              url: 'https://onchainsummer.xyz',
              imageUrl: 'media/onchainsummer-website.png', 
            },
            {
              title: 'Perplexity',
              type: GalleryItemType.product,
              url: 'https://perplexity.ai',
              imageUrl: 'media/perplexity-ai-website.png', 
            },
            {
              title: 'LlamaIndex',
              type: GalleryItemType.product,
              url: 'https://llamaindex.ai',
              imageUrl: 'media/llamaindex-website.png', 
            },
            {
              title: "Rainbow's Chrome Extension",
              type: GalleryItemType.product,
              url: 'https://chromewebstore.google.com/detail/rainbow/opfgelmcmbiajamepnmloijbpoleiama',
              imageUrl: 'media/rainbow-chrome-extension.png', 
            },
            {
              title: 'iris.fun',
              type: GalleryItemType.product,
              url: 'https://iris.fun',
              imageUrl: 'media/iris-fun-website.png', 
            },
            {
              title: 'Dot by New Computer',
              type: GalleryItemType.product,
              url: 'https://new.computer',
              imageUrl: 'media/dot-new-computer-website.png', 
            },
            {
              title: 'Family',
              type: GalleryItemType.product,
              url: 'https://family.co',
              imageUrl: 'media/family-wallet-website.png', 
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
              imageUrl: 'media/casterscan-v1-website.jpg',
            },
            {
              title: 'Farcaster Kit',
              type: GalleryItemType.product,
              url: 'https://farcasterkit.com',
              imageUrl: 'media/farcasterkit-v1-website.png',
            },
            {
              title: 'Litecast',
              type: GalleryItemType.product,
              url: 'https://github.com/dylsteck/litecast',
              imageUrl: 'media/litecast-v1-mockups.png',
            },
            {
              title: 'PurpleDAO Homepage',
              type: GalleryItemType.product,
              url: 'https://purple.construction',
              imageUrl: 'media/purple-website-redesign-2023.png',
            },
            {
              title: 'Group Purple',
              type: GalleryItemType.product,
              url: 'https://www.party.app/party/0x6eee24de6f3806b0d53fa1fe7052dd2979e123ef',
              imageUrl: 'media/group-purple-on-party-website.png',
            },
            {
              title: 'Web3 Sign a PDF with Tayyab Hussain',
              type: GalleryItemType.product,
              url: 'https://github.com/dylsteck/eth-pdf-signature',
              imageUrl: 'media/web3-sign-a-pdf-website.png',
            },
            {
              title: 'Timeline(a Cortex demo)',
              type: GalleryItemType.product,
              url: 'https://twitter.com/Dylan_Steck/status/1714785040478183888',
              imageUrl: 'media/cortexTimelineMockup.png',
            },
            {
              title: '2022 Recap',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/2022-recap',
              imageUrl: 'media/2022Recap.png',
            },
            {
              title: 'Next in Tech - Jan. 28, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-jan-28-2023',
              imageUrl: 'media/NextInTechJan282023.png',
            },
            {
              title: 'User AI-gency',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/user-ai-gency',
              imageUrl: 'media/UserAIgency.png',
            },
            {
              title: 'Next in Tech - Feb. 4, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-feb-4-2023',
              imageUrl: 'media/NextInTechFeb42023.png',
            },
            {
              title: 'Building a Digital Garden',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/building-a-digital-garden',
              imageUrl: 'media/BuildingADigitalGarden.png',
            },
            {
              title: 'Next in Tech - Feb. 11, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-feb-11-2023',
              imageUrl: 'media/NextInTechFeb112023.png',
            },
            {
              title: `The Boom of Farcaster${apostraphae}s Developer Community`,
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/the-boom-of-farcasters-developer-community',
              imageUrl: 'media/TheBoomOfFarcastersDeveloperCommunity.png',
            },
            {
              title: 'Next in Tech - Feb. 18, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-feb-18-2023',
              imageUrl: 'media/NextInTechFeb182023.png',
            },
            {
              title: 'Next in Tech - Mar. 4, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-mar-4-2023',
              imageUrl: 'media/NextInTechMar42023.png',
            },
            {
              title: 'Internet OS',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/internet-os',
              imageUrl: 'media/InternetOS.png',
            },
            {
              title: 'The Wallet of Tomorrow',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/the-wallet-of-tomorrow',
              imageUrl: 'media/TheWalletOfTomorrow.png',
            },
            {
              title: 'Next in Tech - Mar. 20, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-mar-20-2023',
              imageUrl: 'media/NextInTechMar202023.png',
            },
            {
              title: 'Next in Tech - Mar. 25, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-mar-25-2023',
              imageUrl: 'media/NextInTechMar252023.png',
            },
            {
              title: 'Next in Tech - Apr. 1, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-apr-1-2023',
              imageUrl: 'media/NextInTechApr12023.png',
            },
            {
              title: 'Product Launch NFTs',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/product-launch-nfts',
              imageUrl: 'media/ProductLaunchNFTs.png',
            },
            {
              title: 'Next in Tech - Apr. 8, 2023',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/next-in-tech-apr-8-2023',
              imageUrl: 'media/NextInTechApr82023.png',
            },
            {
              title: 'Shifting Directions',
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/shifting-directions',
              imageUrl: 'media/ShiftingDirections.png',
            },
            {
              title: `Focus on What Doesn${apostraphae}t Scale`,
              type: GalleryItemType.article,
              url: 'https://open.substack.com/pub/dylsteck/p/focus-on-what-doesnt-scale',
              imageUrl: 'media/FocusOnWhatDoesntScale.png',
            },
            {
              title: 'Internet OS',
              type: GalleryItemType.video,
              url: 'https://youtu.be/IpbvRUdLY_U?si=2YaBZ3MuHcQxgOsW',
              imageUrl: 'media/InternetOS.png',
            },
            {
              title: 'Cortex N&W Update - Apr. 24',
              type: GalleryItemType.video,
              url: 'https://youtu.be/eP-R45cngoA?si=9VFXELiQCtezzE6T',
              imageUrl: 'media/cortex-n-and-w-update-apr-24-23-yt-thumbnail.png',
            },
            {
              title: 'Thoughts on LLMs Shaping our Future',
              type: GalleryItemType.video,
              url: 'https://youtu.be/GarUfO9ARf4?si=7vLZcO4Bd8rhBQKz',
              imageUrl: 'media/thoughts-on-llms-shaping-our-future-yt-thumbnail.jpg',
            },
            {
              title: 'Casterscan Video Update',
              type: GalleryItemType.video,
              url: 'https://youtu.be/jgixEy4X72A?si=zUf-aqqGgcniQ4tk',
              imageUrl: 'media/casterscan-video-update-yt-thumbnail.jpg',
            },
            {
              title: 'FIP-2 Primer',
              type: GalleryItemType.video,
              url: 'https://youtu.be/1UFqZ7nHs1I?si=-QtwDsx8yFKM_XEu',
              imageUrl: 'media/fip2_primer-yt-thumbnail.png',
            },
            {
              title: `Reaction To Balaji${apostraphae}s Cloud Cartography Comments on MoZ`,
              type: GalleryItemType.video,
              url: 'https://youtu.be/OgBcDJNXMzs?si=damTfAwdGfkgfi89',
              imageUrl: 'media/reaction-to-balaji-cloud-cartography-moz-yt-thumbnail.jpg',
            },
            {
              title: 'AI Wearable Wars',
              type: GalleryItemType.video,
              url: 'https://youtu.be/e_xLZTxCLcY?si=4A4mtP4oUVrttoCq',
              imageUrl: 'media/ai-wearable-wars-yt-thumbnail.png',
            },
            {
              title: '10/18 Updates: Timeline and Farcaster Kit',
              type: GalleryItemType.video,
              url: 'https://youtu.be/0jLV0_03H68?si=nQeYnfOLgjt1qWwK',
              imageUrl: 'media/10-18-updates-timeline-farcasterkit-yt-thumbnail.jpg',
            },
            {
              title: 'Purple Season 1 in 96 Seconds',
              type: GalleryItemType.video,
              url: 'https://youtu.be/jSCAyiOHTXM?si=zr85qq_yJqrzRPxL',
              imageUrl: 'media/purple-season-1-in-96-seconds-yt-thumbnail.jpg',
            },
            {
              title: 'Introducing Farcaster Kit',
              type: GalleryItemType.video,
              url: 'https://youtu.be/ITzUr3haE8I?si=naCal0RWIlSgfjcQ',
              imageUrl: 'media/introducing-farcasterkit-yt-thumbnail.png',
            },
            {
              title: 'OpenAI Dev Day Recap',
              type: GalleryItemType.video,
              url: 'https://youtu.be/9CIryp5RkPg?si=4nHaYe1WBMdzOTfR',
              imageUrl: 'media/openai-dev-day-recap-yt-thumbnail.jpg',
            },
            {
              title: 'Product Launch NFTs',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/eth:0xc9723c1383b76e4155941db94c89fbbcbe862c05',
              imageUrl: 'media/ProductLaunchNFTs.png',
            },
            {
              title: 'Introducing Casterscan',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/eth:0x326b7a73624a08005614979c0852211c0bce15d6',
              imageUrl: 'media/introducing-casterscan-nft.gif',
            },
            {
              title: 'zorb in the sky',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/zora:0x1df87873824bebdd58e89e2bb3f8502491829894',
              imageUrl: 'media/zorb-in-the-sky-nft.png',
            },
            {
              title: 'Celebrate Casterscan v2',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/base:0xfb097e5579cca171a443935c8469ff2fa5f27c19',
              imageUrl: 'media/celebrate-casterscan-v2-nft.png',
            },
            {
              title: 'Purple Season 1 in 96 Seconds',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/zora:0x4cf66994ca43a27c3b28e05032e350af59c70b50/1',
              imageUrl: 'media/purple-season-1-in-96-seconds-yt-thumbnail.jpg',
            },
            {
              title: 'Purple Strategy Group Community Questions',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/base:0xed66a3cb41f32d9cdb56b086e51f11472ff4c8ce/1',
              imageUrl: 'media/purple-strategy-group-community-questions-nft.png',
            },
            {
              title: 'A Bunch of NeR(d)F by Kismet Casa for ENERGY',
              type: GalleryItemType.nft,
              url: 'https://zora.co/collect/zora:0x2b1a039a4b74b89f95fd05403e7d1d4478bed04a',
              imageUrl: 'media/a-bunch-of-nerdf-kismet-casa-energy-nft.png',
            },
            {
              title: 'Glimpse (internship)',
              type: GalleryItemType.product,
              url: 'https://glimpse.surf',
              imageUrl: 'media/glimpse-extension-banner.png',
            },
            {
              title: 'Double Down (fellowship)',
              type: GalleryItemType.product,
              url: 'https://double-down.com/',
              imageUrl: 'media/double-down-vc-banner.png',
            },
          ]
    }
]