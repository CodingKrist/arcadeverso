const cloudinary = require("../middleware/cloudinary");
const Posts = require('../models/Posts')

module.exports = {
    getProfile: async (req, res) => {
        try {
          const posts = await Posts.find({ user: req.user.id });
          res.render("profile.ejs", { posts: posts, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
          const posts = await Posts.find().sort({ createdAt: "desc" }).lean();
          res.render("feed.ejs", { posts: posts });
        } catch (err) {
          console.log(err);
        }
    },
    getPost: async (req, res) => {
      try {
        const post = await Posts.findById(req.params.id);
        res.render("posts.ejs", { posts: post, user: req.user });
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
            res.redirect('/feed')
        }catch(err){
            console.log(err)
        }
    },
    
    likePost: async (req, res) => {
      try {
        await Posts.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
        console.log("Likes +1");
        res.redirect(req.query.currentUrl || '/');
      } catch (err) {
        console.log(err);
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
