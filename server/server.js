var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan    =   require('morgan');
var db          =   mongojs('littlebreakfastapp', ['users','todoLists', 'meals', 'categories']);
var server      =   restify.createServer();
 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER
 
// CORS - Cross Origin Request Sharing  ----------
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
 
// Starting the SERVER ----------
server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ",process.env.PORT || 9804);
});

// API
var manageUsers = require('./api/auth/manageUser')(server, db)
var manageList = require('./api/list/manageList')(server, db)
var manageMeal = require('./api/meal/manageMeal')(server, db)
var manageMeal = require('./api/category/manageCategory')(server, db)
var manageShoppingCart = require('./api/shoppingcart/manageShoppingCart')(server, db)