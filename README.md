# Metadata Proxy

A lightweight Express service that solves Open Graph limitations for a
React single-page app, without requiring a full SSR migration.

## The problem

Social apps (WhatsApp, iMessage, Discord, etc.) generate link previews by
reading Open Graph (`og:*`) meta tags from a page's HTML. A React SPA
serves the same static `index.html` for every route, so every shared link
— regardless of what it actually points to — produces the same generic
(or empty) preview. There's no per-page title, description, or thumbnail.

## Approach

The standard fix is server-side rendering, so I evaluated SSR-based
options first. For this use case, a full framework migration (e.g. to
Next.js) was disproportionate to the problem — the SPA didn't need SSR
everywhere, just correct metadata on shared links.

Instead, I designed a lightweight redirection proxy: incoming requests
are matched to a template, the relevant metadata is resolved server-side,
and the placeholders in that template are replaced with real values
before the page is served. Social crawlers see fully-populated Open Graph
tags; the rest of the app stays a client-rendered SPA.

## How it works

1. A request comes in for a given link/route.
2. The server loads an HTML template (`views/index.html`) containing
   placeholder tokens (`__TITLE__`, `__OG_IMAGE__`, etc.).
3. It resolves the data for that specific link in two steps — the query
   string carries just enough to look up an initial record, which is then
   combined with a second value to fetch the final data — and injects the
   result into the placeholders. (In production this hits internal APIs;
   the exact lookup scheme is intentionally not detailed here, and this
   repo stubs the step out with hardcoded values.)
4. The finished HTML is sent to the client. When a social app crawls the
   link, it renders a proper preview instead of the SPA's generic one.

## Try it

Paste this link into a social app's message box (WhatsApp, iMessage, etc.)
and watch it generate a preview:

https://redirect.bzquick.com/_c?demo@bzquick.com?Bakery2023

![Example preview](./assets/screenshot.jpg)

## Running locally

```bash
npm install && npm start
```

The server runs on `http://localhost:3000` (or `$PORT` if set).

> **Note:** Running it locally lets you inspect the HTML/meta tags in a
> browser or via `curl`, but social apps can't crawl `localhost` — their
> link-preview bots need a publicly reachable URL. To actually see a
> preview generated from your local server, expose it first with
> something like `ngrok http 3000` (or an Nginx reverse proxy), then
> paste the resulting public URL into a social app.

## Status / known gaps

This is a working prototype, not the production version:

The real implementation resolves metadata via internal APIs; that logic
  is stubbed out here with hardcoded values (see `app.js`).

## Stack

Node.js, Express, React (consuming app)
