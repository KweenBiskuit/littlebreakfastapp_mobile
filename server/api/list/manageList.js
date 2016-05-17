module.exports = function (server, db) {
    var validateRequest = require("../auth/validateRequest");

    //FIND the LIST of one User in all todoLists
    server.get("/api/todoLists/list", function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.todoLists.find({
                user : req.params.token
            },function (err, list) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(list));
            });
        });
        return next();
    });
 
    //FIND one ITEM in the list of one User in all todoLists
    server.get('/api/todoLists/list/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.todoLists.find({
                _id: db.ObjectId(req.params.id)
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
        });
        return next();
    });
 
    //CREATE one ITEM in the list of one User in all todoLists
    server.post('/api/todoList/list/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            var item = req.params;
            db.todoLists.save(item,
                function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
        });
        return next();
    });
 
    //UPDATE one ITEM in the list of one User in all todoLists
    server.put('/api/todoList/list/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.todoLists.findOne({
                _id: db.ObjectId(req.params.id)
            }, function (err, data) {
                // merge req.params/product with the server/product
 
                var updProd = {}; // updated products 
                // logic similar to jQuery.extend(); to merge 2 objects.
                for (var n in data) {
                    updProd[n] = data[n];
                }
                for (var n in req.params) {
                    if (n != "id")
                        updProd[n] = req.params[n];
                }
                db.todoLists.update({
                    _id: db.ObjectId(req.params.id)
                }, updProd, {
                    multi: false
                }, function (err, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify(data));
                });
            });
        });
        return next();
    });
 
    //DELETE one ITEM in the list of one User in all todoLists
    server.del('/api/todoList/list/item/:id', function (req, res, next) {
        validateRequest.validate(req, res, db, function () {
            db.todoLists.remove({
                _id: db.ObjectId(req.params.id)
            }, function (err, data) {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
            });
            return next();
        });
    });
 
}