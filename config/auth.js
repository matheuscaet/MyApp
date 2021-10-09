const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

require("../models/user")
const User = mongoose.model("users")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: "user", passwordField: "password"},(user, password, done) => {
        User.findOne({user: user}).then((user) => {
            if(!user){
                return(done(null, false, {message: "This user not exists"}))
            }
                if(password == user.password){
                    return done(null, user)
                }
                else{
                    return(done(null, false, {message: "This user and password is not match"}))
                }
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        
        User.findById(id, (err, user) =>{
            done(err, user)
        })
        
    })
}