const puppeteer = require("puppeteer");

/**
 * Require the cheerio library.
 */
const cheerio = require("cheerio");

async function main() {
  const browser = await puppeteer.launch({
    /**
     * Use the default headless mode (don't show the browser).
     */
    headless: true,
    args: ["--proxy-server=socks5://127.0.0.1:9050"],
  });

  const page = await browser.newPage();

  await page.goto("http://nzxj65x32vh2fkhk.onion/all");

  // // await page.waitForSelector("h4");
  // // page.$();
  // // let element = await page.$("h4");
  // // let value = await page.evaluate((el) => el.textContent, element);
  // // console.log(value);
  // const text = await page.evaluate(() =>
  //   Array.from(
  //     document.querySelectorAll(".col-sm-6"),
  //     (element) => element.textContent,
  //   ),
  // );

  // console.log(text);
  // // console.log(text[1]);
  // // console.log(text[2]);

  /**
   * Get page content as HTML.
   */

  const content = await page.content();

  /**
   * Load content in cheerio.
   */
  const $ = cheerio.load(content);

  /**
   * Create an array to save the article titles.
   */
  const titles = [];
  const details = [];
  const dates = [];
  const contents = [];
  let data = [];
  /**
   * Access `storylink` class. slice() is used to access
   * only he first 5 HTML elements that have `storylink` class.
   * We iterate each of those 5 elements using each() method.
   */

  $("body")
    .find("div > h4")
    .each((idx, elem) => {
      /**
       * Get the inner HTML which corresponds to the title in text format.
       */
      const title = $(elem).text();
      data.push({ title: title });

      /**
       * Push the title in titles array.
       */
      titles.push(title);
    });
  $(".row")
    .find(".pre-footer >.row")
    .each((idx, elem) => {
      const detail = $(elem).text();
      details.push(detail);
      data[idx].detail = detail;
    });

  $(".row")
    .find("ol")
    .each((index, elem) => {
      const text = $(elem).text();
      contents.push(text);
      data[index].content = text;
    });
  // data = [{ title: [...titles], content: [...contents] }];
  // console.log(data);
  // console.log(data.length, details.length, contents.length);
  // data.push({
  //   titles: [...titles],
  //   details: [...details],
  //   content: [...contents],
  // });

  // const post = $(".row");
  // post.cl
  // post.find();
  // post.find("li").each((index, elm) => {});
  // post.find();
  // post.each((index,elm)=>{

  // })
  // post.console.log(post);
  // console.log(post.find("ol").text());

  browser.close();
  const regAuthor = /(?<=\bby\s)(\w+)/gm;
  const regDate = /(?<=\bat\s)(.*)(?=UTC)/gm;
  const author = [];
  const date = [];
  data.forEach((val) => {
    [val.author] = val.detail.match(regAuthor);
    val.date = val.detail.match(regDate) + " UTC";
  });
  // return { titles, details, contents };

  /**
   * Log the array of titles.
  //  */
  // console.log(titles);
  // console.log(details);
  // console.log(contents);
  return data;
}
main();
module.exports = main;
// main();
// module.exports = main();
