var pwdMgr = require('./managePasswords');

//exports all the function into a module 'manageUser'
module.exports = function (server, db) {
    // insure that the users in the db will have unique email
    db.users.ensureIndex({
        email: 1
    }, {
        unique: true
    })

    server.post('/api/auth/register', function (req, res, next) {
        var user = req.params;
        pwdMgr.cryptPassword(user.password, function (err, hash) {
            user.password = hash;
            console.log("n", hash);
            db.users.insert(user,
                function (err, dbUser) {
                    if (err) { // duplicate key error
                        if (err.code == 11000) /* http://www.mongodb.org/about/contributors/error-codes/*/ {
                            res.writeHead(400, {
                                'Content-Type': 'application/json; charset=utf-8'
                            });
                            res.end(JSON.stringify({
                                error: err,
                                message: "A user with this email already exists"
                            }));
                        }
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        dbUser.password = "";
                        res.end(JSON.stringify(dbUser));
                    }
                });
        });
        return next();
    });

    server.post('/api/auth/login', function (req, res, next) {
        var user = req.params;
        console.log('**** user ****');
        console.log(user);
        if (user.email.trim().length == 0 || user.password.trim().length == 0) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "Invalid Credentials"
            }));
        }
        console.log("in");
        db.users.findOne({
            email: req.params.email
        }, function (err, dbUser) {


            pwdMgr.comparePassword(user.password, dbUser.password, function (err, isPasswordMatch) {

                if (isPasswordMatch) {
                    console.log("user find !!! :D")
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    // remove password hash before sending to the client
                    dbUser.password = "";
                    res.end(JSON.stringify(dbUser));
                } else {
                    res.writeHead(403, {
                        'Content-Type': 'application/json; charset=utf-8'
                    });
                    res.end(JSON.stringify({
                        error: "Invalid User"
                    }));
                }

            });
        });
        return next();
    });
};