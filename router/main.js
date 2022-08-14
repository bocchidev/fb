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
const router = express.Router();

router.get("/", (req, res) => {
    try {
        res.render("index");
    } catch(e) {
        res.redirect('/');
    };
});

router.get("/:page", (req, res) => {
    try {
        res.render("nopage");
    } catch(e) {
        res.redirect('/');
    };
});

module.exports = router;