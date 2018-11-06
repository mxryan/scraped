const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.engine(
  "handlebars", 
    exphbs ({
      defaultLayout: "main"
    })
);
app.set("view-engine", "handlebars");

mongoose.connect("mongodb://localhost/scraped_db", { useNewUrlParser: true });

app.get("/", (req, res)=>{
  res.render("index.handlebars");
});

app.get("/scrape", function(req, res) {
  axios.get("http://www.bbc.com/").then(function(response) {
    const $ = cheerio.load(response.data);
    $("h3.media__title").each(function(i, element) {
      console.log($(this).children("a"));
    });
    res.send("Scrape Complete");
  }).catch(err => {return console.log(err)});
});

app.post("/test/article", (req,res) => {
  db.Article.create(req.body).then(d => res.json(d)).catch(e => console.log(e));
})

app.listen(PORT, ()=>{
  console.log("yup im on");
})