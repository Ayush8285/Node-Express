//we use multer library to upload files in node.js

const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3000;


//use this to handle file storing
const storage = multer.diskStorage({
    destination: function(req, file, cb){      //cb -> callback
        return cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage})


app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    return res.render("homepage");
});

app.post('/upload',upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

app.listen(PORT, () => {
    console.log("Server is running in port - 3000");
});
