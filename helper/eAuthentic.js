module.exports = {
    eAuthentic: function(req, res, next) {

        if(req.isAuthenticated()){
            return next();
        }
        
        res.redirect("/");
    }
}