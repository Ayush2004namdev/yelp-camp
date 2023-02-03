const mongoose = require('mongoose');
const cities = require('../models/cities');
const { places, descriptors } = require('../models/seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63d73da87055a1e460e4773d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry :{
                type : "Point",
                coordinates : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                
                url :"https://res.cloudinary.com/dcvlkjn0y/image/upload/v1675244460/YelpCamp/cx5bpathnqv7qeeg5gsx.jpg",
                filename:"YelpCamp/cx5bpathnqv7qeeg5gsx"
                },
                {
                    url: 'https://res.cloudinary.com/dcvlkjn0y/image/upload/v1675232343/Yelpcamp/wd9khrmluplfqk9eeyod.png',
                    filename: 'Yelpcamp/wd9khrmluplfqk9eeyod'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})