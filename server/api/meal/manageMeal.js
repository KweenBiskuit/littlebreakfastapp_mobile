module.exports = function (server, db) {
    // var validateRequest = require("../auth/validateRequest");

    //FIND all MEALS
    server.get("/api/meals", function (req, res, next) { 
        db.meals.find({user : req.params.token},function (err, list) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(list));
        });
        return next();
    });

    //FIND one MEAL
    server.get('/api/meal/:id', function (req, res, next) {
        db.meals.find({_id: db.ObjectId(req.params.id)}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

    //CREATE one MEAL
    server.post('/api/meal', function (req, res, next) {
        var newMeal = req.params;
        db.meals.save(newMeal, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

    //UPDATE one MEAL
    server.put('/api/meal/:id', function (req, res, next) {
        //1. find the meal to update
        db.meals.findOne({_id: db.ObjectId(req.params.id)}, function (err, data) {

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
            db.meals.update({_id: db.ObjectId(req.params.id)}, updMeal, { multi: false}, function (err, data) {
                res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });

    //DELETE one ITEM in the list of one User in all todoLists
    server.del('/api/meal/:id', function (req, res, next) {
        db.meals.remove({_id: db.ObjectId(req.params.id)}, function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            res.end(JSON.stringify(data));
        });
        return next();
    });

}