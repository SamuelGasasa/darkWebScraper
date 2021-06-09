const express = require("express");
const scraper = require("./index");

const app = express();
const { titles, details, contents } = scraper();

console.log(titles);
