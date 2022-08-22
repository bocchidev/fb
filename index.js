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
const main = require("./router/main.js");
const facebook = require("./router/facebook.js");
const PORT = process.env.PORT || 80;
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use("/", main);
app.use("/facebook", facebook);

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
