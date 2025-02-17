const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

// Replace 'your_database_url' with your actual MongoDB connection string
const dbUrl = 'mongodb://localhost:27017/yelp-camp';

// Connect to MongoDB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();


// Set up basic Home view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home Page
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    console.log(campground);
    res.render('campgrounds/show', { campground });
})

app.listen(3000, () =>{
    console.log("Serving on port 3000");
})
