const express = require("express");
const handlebars  = require("express-handlebars");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
require("../models/user");
const User = mongoose.model("users");
require("../models/item");
const Item = mongoose.model("items");
const {eAuthentic} = require("../helper/eAuthentic");




router.get("/",(req, res) => {
    res.render("layouts/login");
});

router.get("/admin",  (req, res) => {

    Item.find().lean().then((items) => {
        res.render("layouts/admin", {items: items})
    }).catch((err) => {
        console.log(err);
    })
    
});



router.get("/itens", (req, res) => {
    Item.find().then((items => res.json(items)));
    console.log(res);
    
});

router.post("/item", (req, res) => {
    
    const name = req.body[0].name;
    Item.findOne({name: name}).then((item => res.json(item)));
    
});

router.post("/adduser", (req, res) => {

    const us = req.body[0].user;
    const psw = req.body[0].password;

    User.findOne({user: us}).then((user) => { 
        
        
        if(!user){
            const NewUser = mongoose.model("users");

            new NewUser ({
            user: req.body[0].user,
            password: req.body[0].password


            }).save(function(err, obj) {
                if (err){
                    res.send(err);
                } else{
                    res.json({ message: 'Cadastro Criado Com Sucesso!', type:0 });
                }
            });
        
        }
        if(user){
            res.json({ message: 'Usuário Já existente, Por favor insira outro!', type:1});
        }
        
    })

    
});

router.post("/lognow", (req, res) => {

    var usu = req.body[0].user;
    var psw = req.body[0].password;
    
    
    User.findOne({user: usu}).then((user) => { 
        
        
        if(!user){
            res.json({ message: 'Usuário Não Encontrado!', type:0, token:null });
        }
        
        if(user.password == psw && user.user == usu){
            res.json({ message: 'Logado Com Sucesso!', type:1, token:"@app-Token" });
        } else {
            res.json({ message: 'Erro!', type:2, token:null });
        }
        
    })
});

router.post("/logged",(req, res, next) => {
    
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)
});

router.post("/logout",(req, res) => {
    req.logOut();
    res.redirect("/");
});


module.exports = router;