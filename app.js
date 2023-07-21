const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Database related
mongoose.connect("mongodb://127.0.0.1:27017/to-do-list")
    .then(() => { console.log("Connected") })
    .catch(() => { console.log("Error") })

const itemsSchema = new mongoose.Schema({
    todo: String,
})

const item = mongoose.model("item", itemsSchema);


// middlewares
const app = express();
// set view engine
app.set('views', './views') // only required if we want to change name of views directory to any other name
// default directory it points is named views
app.set('view engine', 'ejs'); // tells our app to use ejs

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('css'));


// Get requests
app.get('/', (req, res) => {
    findAll().then((lists) => {
        res.render("list", { listHeading: "Today", newItem: lists }); //express looks into the folder views for the file list
    });
})

app.get('/work', (req, res) => {
    res.render("list", { listHeading: "Work List", newItem: WorkItems });
})

app.get('/about', (req, res) => {
    res.render("about");
})

// Post requests
app.post('/', (req, res) => {
    if (req.body.btn != "Work List") {
        if (!isspaces(req.body.newItem)) {
            item.create({ todo: req.body.newItem })
        }
        res.redirect("/");
    }
    else {
        if (!isspaces(req.body.newItem)) {
            WorkItems.push(req.body.newItem);
        }
        res.redirect("/work");
    }
})

app.post('/delete',(req,res)=>{
    SearchAndRemove(req.body.checkbox).then((list)=>{
        res.redirect("/")
    }).catch((err)=>{
        console.log(err.message)
        res.redirect("/")
    })
})


// Starting server
app.listen(3000, () => {
    console.log("server started at port 3000");
})


// Driver Functions

function isspaces(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] != " ") {
            return false;
        }
    }
    return true;
}

async function findAll() {
    let items = await item.find({});
    return items
}

async function SearchAndRemove(id){
    let temp = await item.findByIdAndRemove(id);
    return temp;
}