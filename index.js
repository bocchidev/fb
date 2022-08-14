const sandy = require("./package.json");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    try {
        res.render("index", {
            versi: sandy.version
        });
    } catch(e) {
        res.redirect('/');
    };
});

var axios = require("axios");
var cheerio = require("cheerio");
var headers = {
    'Cookies': 'datr=ICj1YiPVYCsGsEl6cGcAjbDF; sb=ICj1YsShjxv_-mydoB9F0esW; locale=id_ID; fr=0e5ZRK9qBpWwhpMS8.AWXkGHdqcIu5TQDhNvQIjAIypnk.Bi9Sgg.21.AAA.0.0.Bi9ShY.AWVzll2wNxI; c_user=100046948100614; xs=11%3AEH-ulMpTJJ3uTA%3A2%3A1660233817%3A-1%3A10721; m_pixel_ratio=1.75; x-referer=eyJyIjoiL2dyb3Vwcy81MTcwNzE4MDAyOTYyMDI5Lz9yZWY9Z3JvdXBfYnJvd3NlIiwiaCI6Ii9ncm91cHMvNTE3MDcxODAwMjk2MjAyOS8%2FcmVmPWdyb3VwX2Jyb3dzZSIsInMiOiJtIn0%3D; wd=412x757',
    'User-Agent': 'Mozilla/5.0 (Mobile; rv:48.0; A405DL) Gecko/48.0 Firefox/48.0 KAIOS/2.5',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101"',
    'sec-ch-ua-platform': 'Android',
    'sec-ch-ua-mobile': '?1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
};

app.get("/download", async (req, res) => {
    var url = req.query.url;
    if (!url) return res.render("nopage", {
        url: url,
        alrt: 'Invalid URL!'
    });
    try {
        if (/(www|m).facebook/.test(url)) { 
            var mbasic = url.replace("www.facebook", "mbasic.facebook") || url.replace("m.facebook", "mbasic.facebook");
            var html = await axios({
                method: "get",
                url: mbasic + '?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C-GK2T&refsrc=deprecated&ref=sharing&_rdr',
                headers: headers
            });
            var $ = cheerio.load(html.data);
            var video = /fbcdn.net/.test($('meta[property="og:video:url"]').attr("content")) ? $('meta[property="og:video:url"]').attr("content") : $('div[class="ca"]').children('a').attr('href') || $('div[class="cb"]').children('a').attr('href') || $('div[class="cc"]').children('a').attr('href') || $('div[class="cd"]').children('a').attr('href');
            if (/redirect/.test(video)) var video = video.split('?src=', 2)[1];
            var title = $('meta[property="og:title"]').attr("content");
            if (!/fbcdn.net/.test(video)) res.render("nopage", {
                alrt: 'Video not found, may be private',
                url: url
            });
            return res.render("fb", {
                video_url: decodeURIComponent(video),
                url: url,
                title: title ? title : $("title").html()
            });
        }
        else if (/fb.watch/.test(url)) {
            var html_ = await axios({
                method: "get",
                url: url
            });
            var _$ = cheerio.load(html_.data);
            var uri = _$('meta[property="og:url"]').attr("content");
            var mbasic = uri.replace("web.facebook", "mbasic.facebook");
            var html = await axios({
                method: "get",
                url: mbasic + '?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C-GK2T&refsrc=deprecated&ref=sharing&_rdr',
                headers: headers
            });
            var $ = cheerio.load(html.data);
            var video = /fbcdn.net/.test($('meta[property="og:video"]').attr('content')) ? $('meta[property="og:video"]').attr('content') : $('div[class="l"]').children("a").attr("href");
            if (/redirect/.test(video)) var video = video.split('?src=', 2)[1];
            var title = $('meta[property="og:title"]').attr("content");
            if (!/fbcdn.net/.test(video)) res.render("nopage", {
                url: url,
                alrt: 'Video not found, may be private'
            });
            return res.render("fb", {
                video_url: decodeURIComponent(video),
                url: url,
                title: title ? title : $("title").html()
            });
        }
        else {
            return res.render("nopage", {
                url: url,
                alrt: 'Invalid URL!'
            });
        };
    } catch (e) {
        res.render("nopage", {
            url: url,
            alrt: e.message
    });
    };
});

app.get("/:page", (req, res) => {
    try {
        res.redirect('/');
    } catch(e){
        res.redirect('/');
    };
});

app.listen(PORT, () => {
	console.log("Started server on http://localhost:5000");
});