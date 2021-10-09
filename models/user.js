const { Console } = require("console");
const mongoose = require("mongoose");
const conMongo = "mongodb+srv://matheuscaet:mongopassword20092021@cluster0.cfpvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(conMongo).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Error: " + err);
});

const userSchema = mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
    /*active: {
        type: Number,
        require: true
    }*/
});



// Model User

mongoose.model("users", userSchema);
/*
const NovoUser = mongoose.model("users")

new NovoUser ({
    user: "admin",
    password: "password@123"
}).save().then(() => {
    console.log("Succes Add")
}).catch((err) => {
    console.log("Error: " + err)
}) */