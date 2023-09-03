module.exports = app => {
    const genres = require("../controllers/genre.controller.js");
    var router = require("express").Router();
    router.get("/", genres.findAllGenres);
    app.use('/api/genres', router);
    };