const { Console } = require("console");
const mongoose = require("mongoose");
const conMongo = "mongodb+srv://matheuscaet:mongopassword20092021@cluster0.cfpvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(conMongo).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Error: " + err);
});

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    }
});



// Model Item

mongoose.model("items", itemSchema);
/*
const NewItem = mongoose.model("items")

new NewItem ({
    name: "item 1",
    desc: "A long description is a way to provide long alternative text for non-text elements, such as images"
}).save().then(() => {
    console.log("Succes Add 1")
}).catch((err) => {
    console.log("Error: " + err)
})

new NewItem ({
    name: "item 2",
    desc: "A long description is a way to provide long alternative text for non-text elements, such as images"
}).save().then(() => {
    console.log("Succes Add 2")
}).catch((err) => {
    console.log("Error: " + err)
})

new NewItem ({
    name: "item 3",
    desc: "A long description is a way to provide long alternative text for non-text elements, such as images"
}).save().then(() => {
    console.log("Succes Add 3")
}).catch((err) => {
    console.log("Error: " + err)
})
*/
