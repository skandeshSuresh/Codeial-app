module.exports.profile=function(req,res){
    // return res.end('<h1>User profile</h1>');
    res.render('user_profile',{
        title:"user profile"
    });
}