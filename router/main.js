const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");

var dir = process.cwd();
var facebook = require(path.join(dir, "/lib/facebook"));

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get("/", (req, res) => {
    try {
        res.render("index", {
            url: ""
        });
    } catch (e) {
        res.render("invalid", {
            message: e.message
            , url: ""
        });
    };
});

router.post("/facebook", async (req, res) => {
    var url = req.body.url;
    if (!url) return res.redirect("/");
    try {
        var fb = new facebook(url);
        var mek = await fb.getInfo();
        
        res.render("facebook", {
            title: mek.videoTitle
            , video_url: mek.videoUrl
            , size: mek.videoSize
            , url: url
        });
    } catch (e) {
        res.render("invalid", {
            message: e.message
            , url: url
        });
    };
});

router.get("/:page", (req, res) => {
    try {
        res.render("invalid", {
            message: "Halaman yang kamu ikuti mungkin sedang rusak atau tak tersedia"
            , url: ""
        });
    } catch (e) {
        res.render("invalid", {
            message: e.message
            , url: ""
        });
    };
});

module.exports = router;
