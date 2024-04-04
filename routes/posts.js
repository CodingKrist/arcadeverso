const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer");
const postsController = require('../controllers/posts')
const { ensureAuth } = require("../middleware/auth");


router.get('/', ensureAuth, postsController.getPost);

router.post('/crearPost', postsController.crearPost)

//router.delete('/deletePost', postsController.deletePost)

//router.put('/markDoneTarea', postsController.markComplete)

module.exports = router