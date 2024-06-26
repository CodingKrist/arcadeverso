const cloudinary = require("../middleware/cloudinary");
const Posts = require('../models/Posts')
const Comments = require("../models/Comments");

module.exports = {
    getProfile: async (req, res) => {
        try {
          const posts = await Posts.find({ user: req.user.id });
          res.render("profile.ejs", { posts: posts, user: req.user, currentPage: req.originalUrl });
        } catch (err) {
          console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
          const posts = await Posts.find().sort({ createdAt: "desc" }).lean();
          res.render("feed.ejs", { user: req.user, posts: posts, currentPage: req.originalUrl });
        } catch (err) {
          console.log(err);
        }
    },
    getPost: async (req, res) => {
      //console.log(req.user)
      try {
        const post = await Posts.findById(req.params.id);
        const comments = await Comments.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
        res.render("posts.ejs", { posts: post, user: req.user, currentPage: req.originalUrl, comments: comments });
      } catch (err) {
        console.log(err);
      }
    },
    crearPost: async (req, res)=>{
        try{
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(req.user)
            await Posts.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id,
                userName: req.user.userName,
            });
            console.log('Post publicado')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    
    likePost: async (req, res) => {
      //console.log(req.query.currentPage)
      try {
        await Posts.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
        console.log("Likes +1");
        const currentUrl = req.query.currentPage;
        res.redirect(currentUrl);
      } catch (err) {
        console.log(err);
      }
    },

    deletePost: async (req, res) => {
      console.log(req.params.id)
      try {
        // Find post by id
        let post = await Posts.findById({ _id: req.params.id });
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(post.cloudinaryId);
        // Delete post from db
        await Posts.deleteOne({ _id: req.params.id });
        console.log("Deleted Post");
        res.redirect("/profile");
      } catch (err) {
        res.redirect("/profile");
      }
    },

    // markComplete: async (req, res)=>{
    //     try{
    //         await Tareas.findOneAndUpdate({_id:req.body.tareaIdFromJSFile},{
    //             completa: true
    //         })
    //         console.log('Marcada Completa')
    //         res.json('Marcada Completa')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },

    // deletePost: async (req, res)=>{
    //     console.log(req.body.tareaIdFromJSFile)
    //     try{
    //         await Tareas.findOneAndDelete({_id:req.body.tareaIdFromJSFile})
    //         console.log('Tarea elimineada')
    //         res.json('Eliminada')
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
}    
