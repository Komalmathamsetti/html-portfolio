const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data
const properties = [
  {
    name: 'Sunny Villa',
    location: 'Goa',
    imageURL: '/images/photo2.png',
    description: 'Relax at Sunny Villa in Goa, just minutes away from pristine beaches and vibrant nightlife.',
    coords: [15.2993, 74.1240]
  },
  {
    name: 'Mountain Cabin',
    location: 'Manali',
    imageURL: '/images/photo3.png',
    description: 'Experience peace and serenity in our cozy cabin located in the beautiful hills of Manali.',
    coords: [32.2432, 77.1892]
  },
  {
    name: 'Urban Loft',
    location: 'Mumbai',
    imageURL: '/images/photo4.png',
    description: 'Stay in the heart of Mumbai with this stylish urban loft close to city attractions and business hubs.',
    coords: [19.0760, 72.8777]
  }
];

const testimonials = [
  { quote: "ShelterSeek helped me find the perfect place for my vacation. Highly recommended!", name: "ACK Levi" },
  { quote: "Amazing service and great accommodations. Will definitely use again!", name: "Luffy" },
  { quote: "The best travel website I've ever used. Everything was perfect!", name: "Naruto" }
];

const blogPosts = [
  { title: 'Top 10 Travel Tips', description: 'Discover the best tips for a stress-free travel experience.', imageURL: '/images/photo2.png', link: '/blog/travel-tips' },
  { title: 'Best Destinations for 2025', description: 'Find out the top destinations to visit in 2025.', imageURL: '/images/photo3.png', link: '/blog/best-destinations' },
  { title: 'How to Travel on a Budget', description: 'Learn how to travel without breaking the bank.', imageURL: '/images/photo4.png', link: '/blog/budget-travel' }
];

app.get('/', (req, res) => {
  res.render('home', { properties, testimonials, blogPosts });
});
app.get('/about',(req,res)=>{
  res.render('about');
});
app.get('/signin',(req,res)=>{
  res.render('signin');
});
app.get('/help_index',(req,res)=>{
  res.render('help_index');
});
app.get('/ex',(req,res)=>{
  res.render('ex');
});
app.get('/host_index',(req,res)=>{
  res.render('host_index');
});
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


