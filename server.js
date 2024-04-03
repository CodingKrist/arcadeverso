const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const tareasRoutes = require('./routes/tareas');

require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Antes de crear la instancia de MongoStore, asegúrate de que la conexión a la base de datos se haya establecido
mongoose.connection.once('open', () => {
  // Crear una instancia de MongoStore
  const mongoStoreInstance = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    mongooseConnection: mongoose.connection,
  });

  // Configurar express-session
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

  app.use(flash());

  app.use('/', mainRoutes);
  app.use('/listatareas', tareasRoutes);

  app.listen(process.env.PORT, () => {
    console.log('Server is running');
  });
});
