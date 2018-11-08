const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    required: true,
    default: false
  },
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  note: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note"
  }]
});
module.exports = mongoose.model("Article", ArticleSchema);