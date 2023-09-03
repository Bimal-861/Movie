const { artists } = require("../models");
const db = require("../models");
const Artists = db.artists;

  exports.findAllArtists = (req, res) => {
    Artists.find()
        .then(data => {
          res.send({"artists": data});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Genres."
          });
        });
     };