/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // يسمح بكل الـ domains
      },
      // أو خلي القائمة اللي عندك زي ما هي
      { protocol: "https", hostname: "crests.football-data.org", pathname: "/**" },
      { protocol: "https", hostname: "platform.theverge.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.vox-cdn.com", pathname: "/**" },
      { protocol: "https", hostname: "www.cnet.com", pathname: "/**" },
      { protocol: "https", hostname: "assets.goal.com", pathname: "/**" },
      { protocol: "https", hostname: "static01.nyt.com", pathname: "/**" },
      { protocol: "https", hostname: "media.api-sports.io", pathname: "/**" },
      { protocol: "https", hostname: "ichef.bbci.co.uk", pathname: "/**" },
      { protocol: "https", hostname: "img.asmedia.epimg.net", pathname: "/**" },
      { protocol: "https", hostname: "images.skysports.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.images.express.co.uk", pathname: "/**" },
      { protocol: "https", hostname: "a.espncdn.com", pathname: "/**" },
      { protocol: "https", hostname: "s.yimg.com", pathname: "/**" },
      { protocol: "https", hostname: "img.redbull.com", pathname: "/**" },
      { protocol: "https", hostname: "cnn-arabic-images.cnn.io", pathname: "/**" },
      { protocol: "https", hostname: "i0.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "www.aljazeera.net", pathname: "/**" }
    ]
  }
};

export default nextConfig;