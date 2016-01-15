/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function ( req, res ) {
		res.json({
			logged: true
		})
	},

	register: function ( req, res ) {

		var username = req.param( "username" );
        var password = req.param( "password" );
        console.log( req.params.all() );

        console.log( username, password, req.body, req.param('username'), req.params ); return;

        User.findByUsername(username).done(function(err, usr){
            if (err) {
                res.send(500, { error: "DB Error" });
            } else if (usr) {
                res.send(400, {error: "Username already Taken"});
            } else {
                var hasher = require("password-hash");
                password = hasher.generate(password);
                
                Users.create({username: username, password: password}).done(function(error, user) {
	                if (error) {
	                    res.send(500, {error: "DB Error"});
	                } else {
	                    req.session.user = user;
	                    res.send(user);
	                }
	            });
	        };
    	});

		// User.findOrCreate({ name: name }, { name: name })
		// 	.then( function( tag ){
		// 		tag.users.add( self.id );
		// 		tag.save( sails.log.info );

		// 	});

		res.json({
			response: 'Enhorabuena, ya haces parte de nuestro team'
		})
	}
};

