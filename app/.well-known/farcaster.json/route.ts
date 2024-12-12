import { appUrl, iconImg } from "../../sitemap";

export async function GET() {
  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjYxNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDVFNzlGNjkwY2NENDIwMDdENUEwYUQ2NzhDRDQ3NDc0MzM5NDAwRTMifQ",
      "payload": "eyJkb21haW4iOiJkeWxhbnN0ZWNrLmNvbSJ9",
      "signature": "MHg3ZWQ3OGZiNmE4NDkwYTZiNTUxNWI3NjY2NTlmMTZmMzkzMmUyMmUwYWY0M2Q0NTY3MWM4OGMxMTc1NGFlNTk4MmIwMGQ0ZWRiM2Y0Mjg0NzkxNGYwMTI4ZjE0NDE1YjEzYWM5NGY3MTMwMGJkNzY2MGE3ZTEyZmRjZjNlY2I3OTFj"
    },
    frame: {
      version: "0.0.1",
      name: "Dylan Steck",
      iconUrl: iconImg,
      splashImageUrl: iconImg,
      splashBackgroundColor: "#000000",
      homeUrl: appUrl,
    },
  };

  return Response.json(config);
}