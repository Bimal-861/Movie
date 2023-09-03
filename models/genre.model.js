module.exports = mongoose => {
    const Genre = mongoose.model(
        "genre",
        mongoose.Schema(
          {
            genreid : {type: Number},
            genre: String
          },
          { timestamps: true }
        )
      );
    
      return Genre;
    };