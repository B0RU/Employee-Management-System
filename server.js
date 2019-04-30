
const express = require('express');

const path = require('path');

const hbs = require('express-handlebars');

const bodyparser = require('body-parser');

require('./models/connectDB');

const employeeRoutes = require('./routes/employeeRoutes');


var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views/'));

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/employee', employeeRoutes);

app.use('/', (req, res) => {
    res.render('departments/departmentsPage')
});