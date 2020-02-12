const express = require("express");
const Mongoose = require("mongoose");

const PORT = 3000;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Mongoose.connect("mongodb://localhost/bookschallenges", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then("Konek Bosqu")
  .catch("Belum Konek Bosqu");

require("./app/routes/books.js")(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
