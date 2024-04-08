const Comments = require("../models/Comments");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comments.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        userName: req.user.userName,
      });
      console.log("Comentario añadido");
      res.redirect("/posts/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
};

