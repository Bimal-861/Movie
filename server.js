
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/movie.routes")(app);

require("./app/routes/genre.routes")(app);

require("./app/routes/artist.routes")(app);

require("./app/routes/user.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "Movie booking application" });
});

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. http://localhost:8085`);
});