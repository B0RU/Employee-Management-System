const express = require('express');

const path = require('path');

const hbs = require('express-handlebars');

const bodyparser = require('body-parser');

const passport = require('passport');

const flash = require('connect-flash');

const session = require('express-session');

require('./models/connectDB');

const employeeRoutes = require('./routes/employeeRoutes');

const userRoutes = require('./routes/users')


const app = express();

//passport
require('./config/passport')(passport);


// body Parser
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// HandleBars

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'mainLayout',
  layoutsDir: __dirname + '/views/layouts/'
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views/'));

//Serving Static

app.use(express.static('public'));

// Connect flash
app.use(flash());





// Routes

app.use('/', require('./routes/index'));

app.use('/user', userRoutes);

app.use('/employee', employeeRoutes);



// initialize Server

app.listen(3000, () => {
  console.log('Express server started at port : 3000');
});