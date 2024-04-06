const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const postsController = require('../controllers/posts')
const { ensureAuth } = require("../middleware/auth");


router.get("/:id", ensureAuth, postsController.getPost);

router.post("/crearPost", upload.single("file"), postsController.crearPost);


//router.delete('/deletePost', postsController.deletePost)

//router.put('/markDoneTarea', postsController.markComplete)

module.exports = router