const mongoose = require("mongoose");

const PasteSchema = mongoose.Schema({
  authur: String,
  content: String,
  title: String,
  date: Date,
});

module.exports = mongoose.model("Paste", PasteSchema);
