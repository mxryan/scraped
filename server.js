// todo :
//  - update scrape route to delete all except where saved before scraping new guys
//  - update scrape route so that you cant pull duplicates
//  - view-index - make save btns dissapear after you save. user will have to go to save page to unsave them
//  - view-index: when save btn disappears replace with unsave
//  - view-save - make unsave btn or delete btn?
// **** ADD COMMENTING ABILITY 
// remove debuggin consolelogs

// less important: make shit more restful 
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view-engine", "handlebars");
mongoose.connect("mongodb://localhost/scraped_db", {
  useNewUrlParser: true
});

// main page
app.get("/", (req, res) => {
  db.Article.find().then(d => {
    console.log(d);
    res.render("index.handlebars", {
      articles: d
    })
  }).catch(e => console.log(e));
});

// saved articles page
app.get("/saved", (req, res) => {
  db.Article.find({
    saved: true
  }).then(d => {
    res.render("saved.handlebars", {
      articles: d
    })
  }).catch(e => console.log(e));
})

// scrape route
app.get("/api/scrape", function (req, res) {
  axios.get("https://www.cnn.com/health").then(function (response) {
    const $ = cheerio.load(response.data);
    $("li article").each(function (i, element) {
      const out = {}
      const section = $(this).find("h3.cd__headline a");
      out.link = "https://www.cnn.com" + section.attr("href");
      out.title = section.children("span.cd__headline-text").text();
      console.log(out);
      db.Article.create(out).then(d => {
        console.log(d);
      }).catch(e => {
        return console.log(e);
      });
    });
    res.redirect("/");
  }).catch(err => {
    return console.log(err)
  });
});

// delete all except where saved is true
app.get("/api/delete", (req, res) => {
  db.Article.deleteMany({
    saved: false
  }).then(d => {
    console.log(d);
    res.json(d);
  }).catch(e => {
    return console.log(e);
  })
});

// save an article of particular id
app.put("/api/save/:id", (req, res) => {
  db.Article.updateOne({
    _id: req.params.id
  }, {
    saved: true
  }).then(d => {
    console.log(d);
    res.json(d);
  }).catch(e => {
    console.log(e);
  })
});

app.put("/api/unsave/:id", (req, res) => {
  db.Article.updateOne({
    _id: req.params.id
  }, {
    saved: false
  }).then(d => {
    console.log(d);
    res.json(d);
  }).catch(e => {
    console.log(e);
  })
})


// route for posting comment
app.post("/api/comment/:articleID", (req, res) => {
  console.log("hit comment posting route");
  console.log(req.body);
  db.Comment.create(req.body).then(function (dbComment) {
    console.log(req.body);
    console.log(dbComment);
    return db.Article.findOneAndUpdate({
      _id: req.params.articleID
    }, {
      $push: {
        comment: dbComment._id
      }
    }, {
      new: true
    });
  }).then(function (dbArticle) {
    console.log(dbArticle);
    res.json(dbArticle);
  }).catch(function (err) {
    res.json(err);
  });
});

// route for associating comment with an article
app.get("/api/comment/:articleID", (req, res) => {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({
    _id: req.params.articleID
  }).populate("comment").then(function (dbArticle) {
    res.json(dbArticle);
  }).catch(function (err) {
    res.json(err);
  });
});

app.listen(PORT, () => {
  console.log("Server listening");
});