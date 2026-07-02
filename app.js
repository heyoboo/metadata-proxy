const fetch = require("node-fetch");
var express = require('express');
var bodyParser = require('body-parser');
const fs = require("fs");
var app = express();

let htmlContent = fs.readFileSync(__dirname + "/views/index.html", "utf8");

app.get("/", function(req, res) {
  let html = htmlContent

  const injectMetadata = async () => {
    // this won't work becuase the link to fetch in production is confidential so i just show the example with comments
    // const url = "https://example.com"
    // const response = await fetch(url, {
    //   method: "GET",
    //   mode: "cors",
    // });
    // const res = await response.json();
    // use const { desc, icon, ... } = res, etc, for injection

    // TODO add try carch and 404
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
