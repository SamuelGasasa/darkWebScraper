require("dotenv").config();
const express = require("express");
const scraper = require("./scraper");
const mongoose = require("mongoose");
const Paste = require("./models/paste");

const app = express();
// const { titles, details, contents } =
// scraper().then(({ titles }) => console.log(titles));

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB Connected!!!");
  },
);
app.get("/data", async (req, res) => {
  const data = await scraper();
  data.forEach((val) => {
    const paste = new Paste({
      author: val.author,
      content: val.content,
      title: val.title,
      date: val.date,
    });
    paste.save().then((doc) => {
      console.log(doc);
    });
  });

  //   const regAuthor = /(?<=\bby\s)(\w+)/gm;
  //   const regDate = /(?<=\bat\s)(.*)(?=UTC)/gm;
  //   const author = [];
  //   const date = [];
  //   data.forEach((val) => {
  //     [val.author] = val.detail.match(regAuthor);
  //     val.date = val.detail.match(regDate) + " UTC";
  //   });
  //   data.detail.match(regAuthor);
  //   data.detail.match(regDate);

  res.send(data);
});

module.exports = app;
// console.log(titles);
