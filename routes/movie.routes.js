module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
 
    var router = require("express").Router();
    
    router.get("/", movies.findAllMovies);
    router.get("/:id", movies.findOne);
    router.get("/:id/shows", movies.findShows);
    app.use('/api/movies', router);
};