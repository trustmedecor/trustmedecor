// requiring modules
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const https = require("https");
const { request, Router } = require("express");
const dotenv = require("dotenv");
const { url } = require("inspector");

// INTIALIZING EXPRESS APP
const app = express();
//requiring dotenv module
require("dotenv").config();
// CONNECTING TO MONGOOSE
mongoose.connect(
    `mongodb+srv://TrustMeDecor:XdE2FreUqqKekh4@cluster0.1v8mw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true }
);

// CREATING A DATA SCHEMA
const customerSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: String,
    time: String,
    pincode: String,
    occasion: String,
    address: String,
    occasion: String,
});

//CREATING A MODEL
const Customer = new mongoose.model("Customer", customerSchema);
//PORT
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let orders = [];

//SETTING ROUTES FOR PAGES
app.get("/", function(req, res) {
    res.render("home", { products: products });
});

app.get("/service", function(req, res) {
    res.render("service", { products: products });
});
// ROUTE PARAMETERS TO CONSOLE LOG THE PATH THAT YOU SPECIFY

app.get("/services/:path", function(req, res) {
    let requestedTitle = _.lowerCase(req.params.path);
    res.render("service", {
        name: products[requestedTitle].title,
        price: products[requestedTitle].price,
        img1: products[requestedTitle].img1,
        img2: products[requestedTitle].img2,
        img3: products[requestedTitle].img3,
        line1: products[requestedTitle].line1,
        line2: products[requestedTitle].line2,
        line3: products[requestedTitle].line3,
        line4: products[requestedTitle].line4,
        line5: products[requestedTitle].line5,
        id: products[requestedTitle].id,
        paybtn: products[requestedTitle].paybtn,
    });
});

app.post("/service", function(req, res) {
    //fetching data from form
    let order = {
        name: _.lowerCase(req.body.fname),
        number: _.lowerCase(req.body.number),
        date: req.body.date,
        time: req.body.time,
        addressone: _.lowerCase(req.body.addressone),
        addresstwo: _.lowerCase(req.body.adddresstwo),
        pincode: req.body.pincode,
        occasion: req.body.occasion,
    };
    //sending data to order array
    orders.push(order);
    //sending data to order page
    res.render("order", {
        name: _.lowerCase(req.body.fname),
        number: _.lowerCase(req.body.number),
        date: req.body.date,
        time: req.body.time,
        addressone: _.lowerCase(req.body.addressone),
        addresstwo: _.lowerCase(req.body.adddresstwo),
        pincode: req.body.pincode,
        occasion: req.body.occasion,
        button: req.body.button,
    });
    console.log(req.body.button);
    //sending data to mongodb atlas
    const customer = new Customer({
        name: req.body.fname,
        number: req.body.number,
        date: req.body.date,
        time: req.body.time,
        pincode: req.body.pinocode,
        occasion: req.body.occasion,
        address: req.body.addressone,
        occasion: req.body.adddresstwo,
    });
    customer.save();
});

// GETTING THE PRODUCTS DATABASE FROM THE JSON FILE IN APP.JS
let products = [{
        id: 0,
        title: "Happy Birthday surprise",
        img1: "Resources/1/1.jpg",
        img2: "Resources/1/2.jpg",
        img3: "Resources/1/2.jpg",
        line1: "Happy birthday foil balloon in golden.",
        line2: "80 Balloons (black and golden).",
        line3: "Please arrange a stool or ladder for the Decorator.",
        line4: "We Use cello tape/bit to attach Balloons to the ceiling.",
        line5: "",
        price: 1299,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_ImkhxwRrKslM6h" async> </script> </form>`,
    },
    {
        id: 1,
        title: "Blue Birthday Decor",
        img1: "Resources/2/1.jpg",
        img2: "Resources/2/2.jpg",
        img3: "Resources/2/3.jpg",
        line1: "120 Balloons (Light blue,dark blue and white balloons)",
        line2: "Happy Birthday foil balloon in dotted blue",
        line3: "4 Blue Heart Shape foil balloon",
        line4: "Please arrange a stool or ladder for the Decorator.",
        line5: "Our Decorators follow covid guidelines issued by State/Central government.",
        price: 1499,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEh0wXIMaxLCP" async> </script> </form>`,
    },
    {
        id: 2,
        title: "Multi-Color Pastel Balloon Decor",
        img1: "Resources/3/1.jpg",
        img2: "Resources/3/2.jpg",
        img3: "Resources/3/3.jpg",
        line1: "150 Multi Color Pastel balloons",
        line2: "Hapy birthday foil balloon in silver",
        line3: "1 Fairy Light",
        line4: "18 Printed photos",
        line5: "Please arrange a stool or ladder for the Decorator.",
        price: 1799,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEikhTRhW2q91" async> </script> </form>`,
    },
    {
        id: 3,
        title: "Unicorn Kitty Balloon Bouquet",
        img1: "Resources/4/1.jpg",
        img2: "Resources/4/2.png",
        img3: "Resources/4/1.jpg",
        line1: "1 Unicorn Kitty foil balloon",
        line2: "1 Rainbow Foil balloon",
        line3: "8 Balloons [Pink & White]",
        line4: "1 Balloon stand",
        line5: "We Use cello tape/bit to attach Balloons to the ceiling.",
        price: 699,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEja7KxKYKKza" async> </script> </form>`,
    },
    {
        id: 4,
        title: "Blue and Silver Theme Birthday",
        img1: "Resources/5/1.jpg",
        img2: "Resources/5/1.jpg",
        img3: "Resources/5/1.jpg",
        line1: "120 silver and blue balloons",
        line2: "40 to 50 Balloons on ceiling with ribbon",
        line3: "40 Balloons of wall in the form of bunches",
        line4: "30 Balloons free floating on floor",
        line5: "Happy birthday foil ballon (blue /silver)",
        price: 1399,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEkMXPWRValNR" async> </script> </form>`,
    },
    {
        id: 5,
        title: "Pink and Silver Theme",
        img1: "Resources/6/1.jpg",
        img2: "Resources/6/2.jpg",
        img3: "Resources/6/3.jpg",
        line1: "60 Balloons (Pink and Silver balloons)",
        line2: "1 Happy birthday Foil balloon",
        line3: "Please arrange a stool or ladder for the Decorator.",
        line4: "We Use cello tape/bit to attach Balloons to the ceiling.",
        line5: "Our Decorators follow covid guidelines issued by State/Central government.",
        price: 1399,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InElCDTPvs75SF" async> </script> </form>`,
    },
    {
        id: 6,
        title: "Red&White Balloon With Photo's",
        img1: "Resources/7/1.jpg",
        img2: "Resources/7/2.jpg",
        img3: "Resources/7/1.jpg",
        line1: "150 Red and white balloons",
        line2: "24 Printed photos",
        line3: "Please arrange a stool or ladder for the Decorator.",
        line4: "We Use cello tape/bit to attach Balloons to the ceiling.",
        line5: "Our Decorators follow covid guidelines issued by State/Central government.",
        price: 1599,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEmVmniiR1ult" async> </script> </form>`,
    },
    {
        id: 7,
        title: "Golden Theme Decoration",
        img1: "Resources/8/1.jpg",
        img2: "Resources/8/1.jpg",
        img3: "Resources/8/1.jpg",
        line1: "Happy Birthday Foil Balloon in silver.",
        line2: "2 Silver star shape foil balloon,2 Golden Star shape foil balloon",
        line3: "50 balloons (Black and golden color),",
        line4: "1 Fairy light",
        line5: "1 Black Happy birthday paper bunting ,500 gram Rose Patels and 50 candles",
        price: 1799,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEnCuFY4nYSRn" async> </script> </form>`,
    },
    {
        id: 8,
        title: "Balloon Decoration on Ceiling",
        img1: "Resources/9/1.jpg",
        img2: "Resources/9/2.jpg",
        img3: "Resources/9/3.jpg",
        line1: "200 balloons on ceiling with ribbon",
        line2: "Color of your choice",
        line3: "Please arrange a stool or ladder for the Decorator.",
        line4: "We Use cello tape/bit to attach Balloons to the ceiling.",
        line5: "Our Decorators follow covid guidelines issued by State/Central government.",
        price: 1999,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEoYK2vucxhSH" async> </script> </form>`,
    },
    {
        id: 9,
        title: "Glowing Lantern Decoration",
        img1: "Resources/10/1.jpg",
        img2: "Resources/10/2.jpg",
        img3: "Resources/10/3.jpg",
        line1: "10 Paper lantern (white)",
        line2: "5 Fairy light",
        line3: "Please arrange a stool or ladder for the Decorator.",
        line4: "We Use cello tape/bit to attach Balloons to the ceiling.",
        line5: "Our Decorators follow covid guidelines issued by State/Central government.",
        price: 1999,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEpZpZCFcTpbr" async> </script> </form>`,
    },
    {
        id: 10,
        title: "Baby Shower Theme Decoration",
        img1: "Resources/11/1.jpg",
        img2: "Resources/11/2.jpg",
        img3: "Resources/11/1.jpg",
        line1: "Arch of 250 balloons",
        line2: "70 Latex Lemon Green,70 metallic Green ,60 Latex white and 50 blue chrome balloon",
        line3: "3 Green Frills Curtain,1 Baby boy/girl foil balloon,2 blue star shape foil balloon,2 baby theme printed round foil balloon",
        line4: "2 Baby theme printed foil balloon,1 baby bottle foil balloon ,1 baby feet foil balloon",
        line5: "2 Fairy light ,1 Big size name theme bunting (8 Letters)",
        price: 3499,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InErUw9heVTe9J" async> </script> </form>`,
    },
    {
        id: 11,
        title: "Blue Balloon Bouquet",
        img1: "Resources/12/1.jpg",
        img2: "Resources/12/2.jpg",
        img3: "Resources/12/1.jpg",
        line1: "3 Blue Star Shape foil balloon",
        line2: "2 Blue Confetti Balloon",
        line3: "10 balloon [light blue & dark blue]",
        line4: "1 Balloon stand ",
        line5: "We Use cello tape/bit to attach Balloons to the ceiling.",
        price: 799,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEsCA88w3bcCl" async> </script> </form>`,
    },
    {
        id: 12,
        title: "Mickey Mouse Balloon Bouquet",
        img1: "Resources/13/1.jpg",
        img2: "Resources/13/2.jpg",
        img3: "Resources/13/3.jpg",
        line1: "1 Mickey Mouse foil balloon",
        line2: "3 Blue Star Shape foil balloon",
        line3: "2 Mickey Mouse Theme printed round foil balloon",
        line4: "15 Balloons [Light Blue & Dark Blue]",
        line5: "1 Balloon stand",
        price: 699,
        paybtn: `<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_InEt2Wu2qS9bMN" async> </script> </form>`,
    },
];

// LISTENING ON PROT 3000
app.listen(port, function(req, res) {
    console.log("The server is up and running on port 3000!");
});

