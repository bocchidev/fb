/*
* I LOVE GURA
* I LOVE GURA
*/

var axios = require('axios');
var readline = require('readline');
var cheerio = require('cheerio');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan url video Facebook: ', async (url) => {
    try {
        var mbasic = url.replace("www.facebook", "mbasic.facebook") || url.replace("m.facebook", "mbasic.facebook");
        var html = await axios({
            method: "get",
            url: mbasic
        });
        var $ = cheerio.load(html.data);
        var image = $('div[class="cb"]').children('img').attr('src');
        var video = $('div[class="ca"]').children('a').attr('href'); 
        var video = video.split('?src=')[1];
        var title = $('meta[property="og:title"]').attr("content");
        console.dir({
            author: "Sandy Sayang Gura",
            status: 200,
            title: title,
            image: image,
            video: decodeURIComponent(video)
        });
    } catch (e) {
        console.table({
            author: "Sandy Sayang Gura",
            status: !/(www|m).facebook/.test(url) ? 406 : 404,
            message: !/(www|m).facebook/.test(url) ? "Invalid URL!" : "Video not found!"
        });
    };
    rl.close();
});

/*
* I LOVE GAWR
* I LOVE GURA
*/
