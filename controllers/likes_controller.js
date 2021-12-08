const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.toggleLike = async function(req, res){
    try{

        //likes/toggle/?id=abcdef&type=Post
        let Likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            Likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            Likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //ccheck if like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        //if like already exists then delete it
        if(existingLike){
            Likeable.likes.pull(existingLike._id);
            Likeable.save();

            existingLike.remove();
            deleted = true

        }else{
            //make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            Likeable.likes.push(newLike._id);
            Likeable.save();
        }

        return res.json(200,{
            message: "Request Successful!",
            data: {
                deleted: deleted
            }
        });

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal server error'
        })
    }
}