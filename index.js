require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const multer = require('multer');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const app = express();
const PORT = process.env.PORT || 3000;
const uploads = multer({ dest: './uploads' });

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/', uploads.single('inputFile'), (req, res) => {
    console.log('post');
    //get user input
    let file = req.file.path;
    cloudinary.uploader.upload(file, (result) => {
        //should be an object
        res.render('result', { image: result.url })
    });
})

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});