import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta tags for SEO */}
        <meta
          name="description"
          content="vj0.live is a web-based tool that lets you generate live visual experiences using only simple prompts."
        />
        <meta
          name="keywords"
          content="vj0, live visuals, generative art, web-based tool, real-time animations"
        />
        <meta name="author" content="Tim Pietrusky" />

        {/* Open Graph meta tags for social media */}
        <meta
          property="og:title"
          content="generate live visual experiences with simple prompts"
        />
        <meta
          property="og:description"
          content="vj0.live is a web-based tool that lets you generate live visual experiences using only simple prompts."
        />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content="https://vj0.live" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="generate live visual experiences with simple prompts"
        />
        <meta
          name="twitter:description"
          content="vj0.live is a web-based tool that lets you generate live visual experiences using only simple prompts."
        />
        <meta name="twitter:image" content="/preview.png" />
        <meta name="twitter:site" content="@vj0live" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
