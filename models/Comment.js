const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model("Comment", CommentSchema);