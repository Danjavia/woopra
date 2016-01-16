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

        User.findOneByUsername( username ).exec( function( err, usr ) {
	        if ( err ) {
	            res.json({ code: 500, error: "DB Error" });
	        } else {
	            if ( usr ) {
	                if ( password == usr.password ) {
	                    req.session.user = usr;
	                    res.json( usr );
	                } else {
	                    res.json({ code: 400, error: "Wrong Password" });
	                }
	            } else {
	                res.json({ code: 404, error: "User not Found" });
	            }
	        }
	    });
	},

	register: function ( req, res ) {

		var username = req.param( "username" );
        var password = req.param( "password" );

        User.findByUsername( username ).exec( function( err, usr ) {
            if ( err ) {
                res.json({ error: "DB Error" });
            } else if ( usr.length > 0 ) {
                res.json({ code: 400, error: "Username already Taken" });
            } else {
                User.create({ username: username, password: password }).exec( function( error, user ) {
	                if ( error ) {
	                    res.json({ code: 500, error: "DB Error" });
	                } else {
	                    req.session.user = user;
	                    res.json( user );
	                }
	            });
	        };
    	});
	}
};

