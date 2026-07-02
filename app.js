const fetch = require("node-fetch");
var express = require('express');
var bodyParser = require('body-parser');
const fs = require("fs");
var app = express();

let htmlContent = fs.readFileSync(__dirname + "/views/index.html", "utf8");

app.get("/", function(req, res) {
  let html = htmlContent

  const injectMetadata = async () => {
    // Production resolves metadata in two steps:
    // 1. Destructure the relevant params off req.query
    // 2. Fetch #1 resolves the first param to an initial record
    // 3. Fetch #2 uses that result + the second param to get the final
    //    data used to populate the tags below
    //
    // const { param1, param2 } = req.query
    // const first = await fetchStep1(param1)
    // const data = await fetchStep2(first, param2)
    // const { desc, icon } = data
    //
    // These hit internal APIs that aren't reachable outside our infra
    // (and the exact lookup scheme is intentionally not detailed here),
    // so this is a stand-in example using hardcoded values.
    const desc = 'some description'
    const icon = 'https://img.freepik.com/free-vector/simple-vibing-cat-square-meme_742173-4493.jpg'
    html = html.replace("__TITLE__", desc);
    html = html.replace("__DESCRIPTION__", desc);
    html = html.replace("__ICON__", icon);
    html = html.replace("__OG_SITE_NAME__", desc);
    html = html.replace("__OG_TITLE__", desc);
    html = html.replace("__OG_DESCRIPTION__", desc);
    html = html.replace("__OG_ICON__", icon);

    res.send(html)
  }
  injectMetadata()
});

module.exports = app;
