/**
 * hello 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 **/
const express = require("express");
const session = require("express-session");
const app = express();
const main = require("./router/main.js");
const PORT = process.env.PORT || 2006;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: "Aku Cinta Gura"
    , cookie: {
        maxAge: 30000
        , secure: true
    }
    , resave: false
    , saveUninitialized: true
}));
app.use("/", main);
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});