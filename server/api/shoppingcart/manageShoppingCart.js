module.exports = function (server, db) {
    // var validateRequest = require("../auth/validateRequest");

    //FIND ALL CARTS (all shoppings carts of every user in db)
    server.get("/api/carts", function (req, res, next) { 
        db.shoppingcarts.find({user : req.params.token},function (err, list) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(list));
        });
        return next();
    });

    //FIND one CART (one shopping cart of a specific user)
    server.get('/api/carts/:idUser', function (req, res, next) {
        db.shoppingcarts.find({_id: db.ObjectId(req.params.idUser)}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

    //CREATE one ITEM in a specific cart (create the cart wit)
    server.post('/api/cart/:idCart', function (req, res, next) {
        var newIteminCart = req.params;
        db.shoppingcarts.save(newMeal, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

   /* //UPDATE one ITEM in CART
    server.put('/api/cart/:id', function (req, res, next) {
        //1. find the meal to update
        db.shoppingcarts.findOne({_id: db.ObjectId(req.params.id)}, function (err, data) {

            //2.  merge req.params/product with the server/product
            var updMeal = {};
            for (var n in data) {
                updMeal[n] = data[n];
            }
            for (var n in req.params) {
                if (n != "id")
                    updMeal[n] = req.params[n];
            }

            //3. modify the meal with the values of updMeal
            db.shoppingcarts.update({_id: db.ObjectId(req.params.id)}, updMeal, { multi: false}, function (err, data) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });

    //DELETE one ITEM in the list of one User in all todoLists
    server.del('/api/cart/:id', function (req, res, next) {
        db.shoppingcarts.remove({_id: db.ObjectId(req.params.id)}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });*/

}