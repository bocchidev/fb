/**
 * This script using mbasic.facebook.com, which means you have to login first.
 * If url not found, automatically create file '.txt' in this directory (for testing).
 * @sandypratama
 **/
var axios = require("axios");
var cheerio = require("cheerio");
var fs = require("fs");
var size = require("./filesize");

var facebook = class {
  constructor(url) {
    this.url = url;
  };

  async getInfo() {
    try {
      var url = this.url;
      if (/(www|m).facebook/.test(url)) {
        var mbasic = url.replace("www.facebook", "mbasic.facebook") || url.replace("m.facebook", "mbasic.facebook");
        var html = await axios({
          method: "get"
          , url: mbasic + '?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C-GK2T&refsrc=deprecated&ref=sharing&_rdr'
        });
        var $ = cheerio.load(html.data);
        var videoData = /fbcdn.net/.test($('meta[property="og:video:url"]')
            .attr("content")) ? $('meta[property="og:video:url"]')
          .attr("content") : $('div[class="ca"]')
          .children('a')
          .attr('href') || $('div[class="cb"]')
          .children('a')
          .attr('href') || $('div[class="cc"]')
          .children('a')
          .attr('href') || $('div[class="cd"]')
          .children('a')
          .attr('href');
        if (/redirect/.test(videoData)) var videoData = videoData.split('?src=', 2)[1];
        if (!/fbcdn.net/.test(videoData)) {
          var fileName = Number(new Date) + ".txt";
          await fs.writeFile(fileName, html.data, (err) => { if (err) throw err });
          return console.log(`URL not found, creating file ${fileName} in ${__dirname}`);
        };
        var videoUrl = decodeURIComponent(videoData);
        var results = {
          videoTitle: $('meta[property="og:title"]')
            .attr("content")
          , videoUrl: "https://video.xx.fbcdn.net/" + videoUrl.split("fbcdn.net/")[1]
          , videoSize: await size.getSizeFromUrl(videoUrl)
        };
        return results;
      } else if (/fb.watch/.test(url)) {
        var html_ = await axios({
          method: "get"
          , url: url
        });
        var _$ = cheerio.load(html_.data);
        var uri = _$('meta[property="og:url"]')
          .attr("content");
        var mbasic = uri.replace("(web|www).facebook", "mbasic.facebook");
        var html = await axios({
          method: "get"
          , url: mbasic + '?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C-GK2T&refsrc=deprecated&ref=sharing&_rdr'
        });
        var $ = cheerio.load(html.data);
        var videoData = /fbcdn.net/.test($('meta[property="og:video"]')
            .attr('content')) ? $('meta[property="og:video"]')
          .attr('content') : $('div[class="l"]')
          .children("a")
          .attr("href");
        if (/redirect/.test(videoData)) var videoData = videoData.split('?src=', 2)[1];
        if (!/fbcdn.net/.test(videoData)) {
          var fileName = Number(new Date) + ".txt";
          await fs.writeFile(fileName, html.data, (err) => { if (err) throw err });
          return console.log(`URL not found, creating file ${fileName} in ${__dirname}`);
        };
        var videoUrl = decodeURIComponent(videoData);
        var results = {
          videoTitle: $('meta[property="og:title"]')
            .attr("content")
          , videoUrl: "https://video.xx.fbcdn.net/" + videoUrl.split("fbcdn.net/")[1]
          , videoSize: await size.getSizeFromUrl(videoUrl)
        };
        return results;
      } else if (/web.facebook/.test(url)) {
        var mbasic = url.replace("web.facebook", "mbasic.facebook");
        var html = await axios({
          method: "get"
          , url: mbasic
        });
        var $ = cheerio.load(html.data);
        var videoData = $('div[class="widePic"]')
        .children("a")
        .attr("href");
        if (!/fbcdn.net/.test(videoData)) {
          var fileName = Number(new Date) + ".txt";
          await fs.writeFile(fileName, html.data, (err) => { if (err) throw err });
          return console.log(`URL not found, creating file ${fileName} in ${__dirname}`);
        };
        if (/video_redirect/.test(videoData)) var videoData = videoData.split('?src=', 2)[1];
        var videoUrl = decodeURIComponent(videoData);
        var results = {
          videoTitle: $('meta[property="og:title"]')
            .attr("content")
          , videoUrl: "https://video.xx.fbcdn.net/" + videoUrl.split("fbcdn.net/")[1]
          , videoSize: await size.getSizeFromUrl(videoUrl)
        };
        return results;
      } else {
        return "Invalid URL!";
      };
    } catch (e) {
      return e;
    };
  };
};

module.exports = facebook;