# Gridview Analytics - Web

A Next.js SSR application to connect to the `gridview-analytics-api` service.

# Getting started

First, you need to create a local `.env` file. The expected environment variables are:

```
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
```

Next, unless you want to connect to the production server, you need to run the `gridview-analytics-api` service locally. The local API service runs on http://localhost:3001.

Then, run the following commands:

- `yarn install`
- `yarn dev`
- Open http://localhost:3000 on your browser

# Pro tips

- If you are adding a permanent route redirect, you must add to `next.config.js` and `/public/_redirects`
- If you are getting a React hydration error on application load, it is probably because you have a browser extension that modifies HTML. In my case, I had a dark mode plugin that once i disabled, made the application work again.
- The sitemap.xml is dynamically generated on https://api.gridviewanalytics.com/sitemap.xml. The /sitemap.xml url is rewritten to that URL in the _redirects file based on Netlify standards. Documentation here: https://docs.netlify.com/routing/redirects/rewrites-proxies/
