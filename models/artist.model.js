module.exports = mongoose => {
    const Artist = mongoose.model(
        "artist",
        mongoose.Schema(
          {
            artistid : {type: Number},
            first_name: String,
            last_name: String,
            wiki_url : { type: String, default: 'https://www.mongodb.com/mern-stack' },
            profile_url : { type: String, default: 'https://ik.imagekit.io/upgrad1/marketing-platform-assets/meta-images/home.jpg' },
            movies : {type: Array}
          },
          { timestamps: true }
        )
      );
    
      return Artist;
    };