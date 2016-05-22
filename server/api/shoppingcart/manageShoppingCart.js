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
    server.get('/api/carts/:userToken', function (req, res, next) {
        db.shoppingcarts.findOne({user: req.params.userToken}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

    //CREATE SHOPPING CART
    server.post('/api/cart', function (req, res, next) {
        var newItemInCart = req.params;
        db.shoppingcarts.save(newItemInCart, function (err, data) {
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

    //UPDATE CART ADDING ONE ITEM
    server.put('/api/cart/:userToken', function (req, res, next) {
        //1. find the cart to update
        db.shoppingcarts.findOne({user: req.params.userToken}, function (err, data) {

            console.log(req.params);

            //2.  merge req.params/product with the server/product
            var updCart = {};
            for (var n in data) {
                updCart[n] = data[n];
            }

            //3. add to the array Items of the upCart, the new item fill with the params prop
            updCart.items.push({
                "_id" : req.params._id,
                'desc' : req.params.desc,
                'photo' : req.params.photo,
                'price' : req.params.price,
                'cat_id' : req.params.cat_id,
                'title' : req.params.title
            });

            console.log("**** updCart ****");
            console.log(updCart);

            //4. Modifier en db le Cart et y mettre le new object updCart (items[]+1)
            db.shoppingcarts.update({user: req.params.userToken}, updCart, { multi: false}, function (err, data) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });

    //DELETE one ITEM in the cart
    server.del('/api/cart/:id', function (req, res, next) {
        db.shoppingcarts.remove({user: db.ObjectId(req.params.id)}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });




}













