/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 **/
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/", async (req, res) => {
    var url = req.body.url;
    if (!url) return res.render("danger", {
        url: url,
        alrt: 'Invalid URL!'
    });
    try {
        if (/(www|m).facebook/.test(url)) {
            var mbasic = url.replace("www.facebook", "mbasic.facebook") || url.replace("m.facebook", "mbasic.facebook");
            var html = await axios({
                method: "get",
                url: mbasic + '?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C-GK2T&refsrc=deprecated&ref=sharing&_rdr'
            });
            var $ = cheerio.load(html.data);
            var video = /fbcdn.net/.test($('meta[property="og:video:url"]').attr("content")) ? $('meta[property="og:video:url"]').attr("content") : $('div[class="ca"]').children('a').attr('href') || $('div[class="cb"]').children('a').attr('href') || $('div[class="cc"]').children('a').attr('href') || $('div[class="cd"]').children('a').attr('href');
            if (/redirect/.test(video)) var video = video.split('?src=', 2)[1];
            var title = $('meta[property="og:title"]').attr("content");
            if (!/fbcdn.net/.test(video)) res.render("danger", {
                alrt: 'Video not found, may be private',
                url: url
            });
            return res.render("fb", {
                video_url: decodeURIComponent(video),
                url: url,
                title: title ? title : $("title").html()
            });
        } else if (/fb.watch/.test(url)) {
            var html_ = await axios({
                method: "get",
                url: url
            });
            var _$ = cheerio.load(html_.data);
            var uri = _$('meta[property="og:url"]').attr("content");
            var mbasic = uri.replace("web.facebook", "mbasic.facebook");
            var html = await axios({
                method: "get",
                url: mbasic + '?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C-GK2T&refsrc=deprecated&ref=sharing&_rdr'
            });
            var $ = cheerio.load(html.data);
            var video = /fbcdn.net/.test($('meta[property="og:video"]').attr('content')) ? $('meta[property="og:video"]').attr('content') : $('div[class="l"]').children("a").attr("href");
            if (/redirect/.test(video)) var video = video.split('?src=', 2)[1];
            var title = $('meta[property="og:title"]').attr("content");
            if (!/fbcdn.net/.test(video)) res.render("danger", {
                url: url,
                alrt: 'Video not found, may be private'
            });
            return res.render("fb", {
                video_url: decodeURIComponent(video),
                url: url,
                title: title ? title : $("title").html()
            });
        } else {
            return res.render("danger", {
                url: url,
                alrt: 'Invalid URL!'
            });
        };
    } catch (e) {
        res.render("danger", {
            url: url,
            alrt: e.message
        });
    };
});

router.get("/:page", (req, res) => {
    try {
        res.render("nopage");
    } catch (e) {
        res.redirect('/');
    };
});

module.exports = router;