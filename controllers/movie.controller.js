const { movies } = require("../models");
const db = require("../models");

const Movies = db.movies;


exports.findAllMovies = (req, res) => {
  console.log(req.query.status);
  if(req.query.status == undefined)
  {
    Movies.find()
      .then(data => {
        res.send({"movies":data});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Movies."
        });
      });
   }
   else
   {
      let status = req.query.status;
      var conditionToCheck = null;
     
      if(status == "RELEASED")
      {
        conditionToCheck = { released: true }

        if(req.query.title!=undefined)
        {
          conditionToCheck = { released: true , title: req.query.title}
        }
      }
      else if(status == "PUBLISHED")
      {
        conditionToCheck = { published: true }
      }
     console.log(conditionToCheck);

     movies.find(conditionToCheck)
        .then(data => {
          res.send({"movies":data});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving movies."
          });
        });   
   }
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    movies.find({movieid: id}) 
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Movie with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Movie with id=" + id });
      });
  };


  exports.findShows = (req, res) => {

    const id = req.params.id;
  
    movies.find({movieid: id}) 
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Movie with id " + id });
        else 
        {
          res.send(data[0].shows);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Shows for movie with id=" + id });
      });

      
}