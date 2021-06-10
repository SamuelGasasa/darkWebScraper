const express = require("express");
const scraper = require("./scraper");

const app = express();
// const { titles, details, contents } =
// scraper().then(({ titles }) => console.log(titles));

app.get("/data", async (req, res) => {
  const data = await scraper();
  console.log(data);
  const regAuthor = /(?<=\bby\s)(\w+)/gm;
  const regDate = /(?<=\bat\s)(.*)(?=UTC)/gm;
  const author = [];
  const date = [];
  data.forEach((val) => {
    [val.author] = val.detail.match(regAuthor);
    val.date = val.detail.match(regDate) + " UTC";
  });
  //   data.detail.match(regAuthor);
  //   data.detail.match(regDate);
  res.send(data);
});

module.exports = app;
// console.log(titles);
