module.exports = mongoose => {
    const Movie = mongoose.model(
        "movie",
        mongoose.Schema(
          {
            movieid : {type: Number},
            title: String,
            published:Boolean,
            released: Boolean,
            poster_url : { type: String, default: 'https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg' },
            trailer_url : { type: String, default: 'https://www.youtube.com/watch?v=MTdpHs6HWwM' },
            wiki_url : { type: String, default: 'https://www.mongodb.com/mern-stack' },
            release_date : {type:String},
            publish_date : {type:String},
            duration : { type: Number, default: 60 , min : 0, max: 1200 },  
            critic_rating : { type: Number, default: 4.0 },  
            story_line: String,
            artists : {type: Array},
            genres : {type: Array},
            shows:Array
          },
          { timestamps: true }
        )
      );
    
      return Movie;
    };