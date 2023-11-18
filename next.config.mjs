import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */

const config = {
   reactStrictMode: true,
   images: {
      domains: [
         "tmdb.org",
         "themoviedb.org",
         "images.tmdb.org",
         "api-production.s3.amazonaws.com",
      ],
   },
};

export default withPlaiceholder(config);
