var isEmailValid = function (db, email, callback) {
    db.users.findOne({
        email: email
    }, function (err, user) {
        callback(user);
    });
};
 
 // VALIDATE the REQUEST
module.exports.validate = function (req, res, db, callback) {
    // if the request dosent have a header with email, reject the request
    if (!req.params.token) {
        res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({
            error: "You are not authorized to access this application",
            message: "An Email is required as part of the header"
        }));
    };
 
    //if there is a email present in the header, verify that the user is valid
    isEmailValid(db, req.params.token, function (user) {
        if (!user) {
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "You are not authorized to access this application",
                message: "Invalid User Email"
            }));
        } else {
            callback();
        }
    });
};