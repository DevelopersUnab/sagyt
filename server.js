const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');

//agregador por PEDRO - USER - HBS
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


// Llamada para ejecutar connection
const connectDB = require('./server/database/connection');

const app = express();
require('./server/config/passport');

//agregador por Pedro


dotenv.config({path:'config.env'})
const PORT = process.env.PORT||3000;

app.use(morgan('tiny'));

//mongodb connection
connectDB();

app.use(bodyparser.urlencoded({extended:true}));

//agregador por PEDRO
//Settgings - configurciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultInclude: 'main',
    defaultLayout:  'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    includeDir: path.join(app.get('views'), 'include'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set("view engine", "ejs");

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');//guardar datos de manera global
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//agregador por PEDRO

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//load router
app.use('/', require('./server/routes/home')); //ruta agregada PEDRO
app.use(require('./server/routes/users')); //ruta agregada PEDRO
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

// app.listen(3002, () => {
//     console.log(`server listing on port ${3002}`)
// })
