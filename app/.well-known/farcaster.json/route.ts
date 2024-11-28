import { appUrl, iconImg } from "../../sitemap";

export async function GET() {
  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjYxNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDVFNzlGNjkwY2NENDIwMDdENUEwYUQ2NzhDRDQ3NDc0MzM5NDAwRTMifQ",
      "payload": "eyJkb21haW4iOiJ3d3cuZHlsYW5zdGVjay5jb20ifQ",
      "signature": "MHg5ZDEzODdhODkxMTk5YzliMDg3ZDhiZWZlMTNjYTk1ZGU5NGU0MTJhNmMzMDIwMzg3YzUwZjllNGIyNTM3NDliMmExZDg3MTJjYWRhMTQyZTg0NzM4NjA0NjNkM2I0YzczMGZiODM0MDZjMWEwZmEwZWM4NzQ5ZThhZjI2Zjk4ODFi"
    },
    frame: {
      version: "0.0.0",
      name: "Dylan Steck",
      iconUrl: iconImg,
      splashImageUrl: iconImg,
      splashBackgroundColor: "#000000",
      homeUrl: appUrl,
    },
  };

  return Response.json(config);
}