module.exports = function (server, db) {
    // var validateRequest = require("../auth/validateRequest");

    //FIND all CATEGORIES
    server.get("/api/categories", function (req, res, next) { 
        db.categories.find({user : req.params.token},function (err, list) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(list));
        });
        return next();
    });

    //FIND one CATEGORY
    server.get('/api/category/:id', function (req, res, next) {
        db.categories.find({_id: db.ObjectId(req.params.id)}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

    //CREATE one CATEGORY
    server.post('/api/category', function (req, res, next) {
        var newMeal = req.params;
        db.categories.save(newMeal, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

    //UPDATE one CATEGORY
    server.put('/api/category/:id', function (req, res, next) {
        //1. find the category to update
        db.categories.findOne({_id: db.ObjectId(req.params.id)}, function (err, data) {

            //2.  merge req.params/product with the server/product
            var updMeal = {};
            for (var n in data) {
                updMeal[n] = data[n];
            }
            for (var n in req.params) {
                if (n != "id")
                    updMeal[n] = req.params[n];
            }

            //3. modify the category with the values of updMeal
            db.categories.update({_id: db.ObjectId(req.params.id)}, updMeal, { multi: false}, function (err, data) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });

    //DELETE one ITEM in the list of one User in all todoLists
    server.del('/api/category/:id', function (req, res, next) {
        db.categories.remove({_id: db.ObjectId(req.params.id)}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

}