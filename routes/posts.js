const express=require('express');
const router=express.Router();


const postsController = require('../controllers/posts_controller');

console.log('router loaded !!');

router.post('/create', postsController.create);

module.exports=router;
