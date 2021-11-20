const User =  require('../models/user');

module.exports.profile=function(req,res){
    // return res.end('<h1>User profile</h1>');
    User.findById(req.params.id, function(err, user){
        res.render('user_profile',{
            title:"user profile",
            profile_user: user
        });
    });
}

//render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up',{
        title: "Codeial | Sign up"
    });
};

//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_in',{
        title: "Codeial | Sign in"
    });
};

//get the sign up data
module.exports.create =function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');  
        }
        if(!user){
           User.create(req.body, function(err,user){
               if(err){
                   console.log('error in creating user while signing up')
               }
               return res.redirect('/users/sign-in');
           }); 
        }else{
            return res.redirect('back');
        }
    });



}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');

}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}