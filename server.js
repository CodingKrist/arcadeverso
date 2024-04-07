const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require("morgan");
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const postsRoutes = require('./routes/posts');

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static('public'));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride('_method'));

//express-session
const mongoStoreInstance = MongoStore.create({
  mongoUrl: process.env.DB_STRING,
  mongooseConnection: mongoose.connection,
});

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: mongoStoreInstance,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/posts', postsRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log('Server is running');
});