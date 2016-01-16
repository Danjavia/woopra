/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function ( req, res ) {

		var username = req.param( "username" );
        var password = req.param( "password" );

        User.findByUsername(username).exec(function(err, usr) {
	        if (err) {
	            res.send(500, { error: "DB Error" });
	        } else {
	            if (usr) {
	                if ( password == usr.password ) {
	                    req.session.user = usr;
	                    res.send(usr);
	                } else {
	                    res.send(400, { error: "Wrong Password" });
	                }
	            } else {
	                res.send(404, { error: "User not Found" });
	            }
	        }
	    });

		// res.json({
		// 	logged: true
		// })
	},

	register: function ( req, res ) {

		var username = req.param( "username" );
        var password = req.param( "password" );

        User.findByUsername(username).exec(function(err, usr){
            if (err) {
                res.send(500, { error: "DB Error" });
            } else if (usr.length > 0) {
                res.send(400, {error: "Username already Taken"});
            } else {
                User.create({username: username, password: password}).exec(function(error, user) {
	                if (error) {
	                    res.send(500, {error: "DB Error"});
	                } else {
	                    req.session.user = user;
	                    res.send(user);
	                }
	            });
	        };
    	});

		// res.json({
		// 	response: 'Enhorabuena, ya haces parte de nuestro team'
		// })
	}
};

