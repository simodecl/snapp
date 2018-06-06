const express = require('express');
const router = express.Router();
const authRouter = express.Router();
const auth = require('./providers/auth')();

/*
Controllers
*/
const authController = require('./controllers/authController');
const blogController = require('./controllers/blogController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');

/*
Routes
*/
router.get('/blogs', blogController.get_blogs);
router.get('/blogs/:id', blogController.get_blog);
router.get('/categories', categoryController.get_categories);
router.get('/categories/:id', categoryController.get_category);
//router.get('/posts', auth.authenticateJwt(), postController.get_posts);// Securing the end-point to-do
router.get('/posts', postController.get_posts);
router.get('/posts/:postId', postController.get_post);
router.get('/posts/vm/create', postController.post_create_get);
router.post('/posts', postController.post_create_post);
router.get('/posts/:postId/update', postController.post_update_get);
router.put('/posts/:postId', postController.post_update_put);
router.delete('/posts/:postId', postController.post_delete_delete);
router.patch('/posts/:postId/softdelete', postController.post_softdelete_patch);
router.patch('/posts/:postId/softundelete', postController.post_softundelete_patch);
router.post('/signup', authController.user_create_post);
authRouter.post('/local', authController.user_auth_local_post);
authRouter.post('/facebook', authController.user_auth_facebook_post);
router.use('/auth', authRouter);

module.exports = router;