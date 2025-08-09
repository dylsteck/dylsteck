import { appUrl, bannerImg, iconImg } from "../../sitemap";

export async function GET() {
  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjYxNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDVFNzlGNjkwY2NENDIwMDdENUEwYUQ2NzhDRDQ3NDc0MzM5NDAwRTMifQ",
      "payload": "eyJkb21haW4iOiJkeWxhbnN0ZWNrLmNvbSJ9",
      "signature": "MHg3ZWQ3OGZiNmE4NDkwYTZiNTUxNWI3NjY2NTlmMTZmMzkzMmUyMmUwYWY0M2Q0NTY3MWM4OGMxMTc1NGFlNTk4MmIwMGQ0ZWRiM2Y0Mjg0NzkxNGYwMTI4ZjE0NDE1YjEzYWM5NGY3MTMwMGJkNzY2MGE3ZTEyZmRjZjNlY2I3OTFj"
    },
    frame: {
      version: "1",
      name: "Dylan Steck",
      subtitle: "The homepage of Dylan Steck",
      tagline: "The homepage of Dylan Steck",
      description: "The homepage of Dylan Steck, an engineer at Base building products onchain",
      iconUrl: iconImg,
      splashImageUrl: iconImg,
      splashBackgroundColor: "#000000",
      homeUrl: appUrl,
      heroImageUrl: bannerImg,
      ogImageUrl: bannerImg,
      ogTitle: "Dylan Steck",
      ogDescription: "The homepage of Dylan Steck, an engineer at Base building products onchain",
      noindex: false,
      primaryCategory: "news-media",
      requiredChains: [],
      requiredCapabilities: ['actions.ready'],
      canonicalDomain: "dylansteck.com",
      tags: ["dylsteck", "blog", "news", "media", "homepage"]
    },
    "baseBuilder": {
        "allowedAddresses": ["0x8342A48694A74044116F330db5050a267b28dD85"],
    }
  };

  return Response.json(config);
}