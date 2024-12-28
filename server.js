require('dotenv').config();
require('./config/database')

const express = require('express');
const morgan = require('morgan');

// Modals
const Coffee = require("./models/coffee.js");
const app = express();
const methodOverride = require("method-override")


// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride("_method"))


// ROUTES

app.get('/', async (req, res) => {
  res.render('index.ejs');
});



// GET /COFFEES/new
app.get('/coffees/new', (req, res) => {
  res.render('coffees/new.ejs');
});




app.get("/coffees/:coffeeId", async (req, res) => {
  const coffeeId = req.params.coffeeId
  const coffee = await Coffee.findById(coffeeId)
  res.render("coffees/show.ejs", {coffee: coffee});
});


app.get("/Coffees/:coffeeId/edit", async (req, res) => {
  const foundCoffee = await Coffee.findById(req.params.coffeeId);
  res.render("coffees/edit.ejs", {
    coffee: foundCoffees,
  });
});




app.delete("/coffees/:coffeeId", async (req, res) => {
  const coffeeId = req.params.coffeeId
  await Coffee.findByIdAndDelete(coffeeId)
  res.redirect("/coffees")
});



// GET /COFFEES
app.get('/coffees', async (req, res) => {
  const allCoffees = await Coffee.find();
  res.render('coffees/index.ejs', { coffees: allCoffees });
});



// POST /COFFEES
app.post('/coffees', async (req, res) => {
  if (req.body.isReadyToEnjoy === 'on') {
    req.body.isReadyToEnjoy = true;
  } else {
    req.body.isReadyToEnjoy = false;
  }
  await Coffee.create(req.body);
  res.redirect('/coffees');
});


app.put("/coffees/:coffeeId", async (req, res) => {
  // Handle the 'isReadyToEnjoy' checkbox data
  if (req.body.isReadyToEnjoy === "on") {
    req.body.isReadyToEnjoy = true;
  } else {
    req.body.isReadyToEnjoy = false;
  }
  
  // Update the coffee in the database
  await Coffee.findByIdAndUpdate(req.params.coffeeId, req.body);

  // Redirect to the coffees show page to see the updates
  res.redirect(`/coffees/${req.params.coffeeId}`);
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});