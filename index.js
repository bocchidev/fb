/**
 * I LOVE GURA
 * I LOVE GURA
**/

var axios = require('axios');
var readline = require('readline');
var cheerio = require('cheerio');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan url video Facebook: ', async (url) => {
    try {
        if (/(www|m).facebook/.test(url)) { 
            var mbasic = url.replace("www.facebook", "mbasic.facebook") || url.replace("m.facebook", "mbasic.facebook");
            var html = await axios({
                method: "get",
                url: mbasic
            });
            var $ = cheerio.load(html.data);
            var video = $('div[class="ca"]').children('a').attr('href'); 
            var video = video.split('?src=')[1];
            var title = $('meta[property="og:title"]').attr("content");
            console.dir({
                author: "Sandy Sayang Gura",
                status: 200,
                title: title,
                video: decodeURIComponent(video)
            });
        }
        else if (/fb.watch/.test(url)) {
            var html_ = await axios({
                method: "get",
                url: url
            });
            var _$ = cheerio.load(html_.data);
            var uri = _$('meta[property="og:url"]').attr("content");
            var mbasic = uri.replace("www.facebook", "mbasic.facebook") || url.replace("m.facebook", "mbasic.facebook");
            var html = await axios({
                method: "get",
                url: mbasic + '?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C-GK2T&refsrc=deprecated&ref=sharing&_rdr'
            });
            var $ = cheerio.load(html.data);
            var video = $('div[class="l"]').children("a").attr("href");
            var video = video.split('?src=')[1];
            var title = $('meta[property="og:title"]').attr("content");
            console.dir({
                author: "Sandy Sayang Gura",
                status: 200,
                title: title,
                video: decodeURIComponent(video)
            });
        }
        else {
            console.table({
                author: "Sandy Sayang Gura",
                status: 406,
                message: "Unsupported URL!"
            });
        };
    } catch (e) {
        console.table({
            author: "Sandy Sayang Gura",
            status: 500,
            message: e.message
        });
    };
    rl.close();
});

/**
 * DEEZ NUTS
 * DEEZ NUTS
**/