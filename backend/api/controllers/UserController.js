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
        var avatar = req.param( "avatar" );
        var validate = req.param( "validate" );

        User.findByUsername( username ).exec( function( err, usr ) {
            if ( err ) {
                res.json({ error: "Something went wrong" });
            } else if ( usr.length > 0 ) {
                res.json({ code: 400, error: "Username already Taken" });
            } else {

            	// Validate user another again in the second step
            	if ( validate ) {

            		// User variables from billing info
            		var name = req.param( "name" )
            		var	ccn = req.param( "ccn" )
            		var	ccv = req.param( "ccv" )
            		var	ccd = req.param( "ccd" )

            		// object from billingInfo form
            		var	billing_info = {
            				name: name,
            				ccn: ccn,
            				ccv: ccv,
            				ccd: ccd
            			}

            		// object from simple login form
            		var userData = {
            			username: username, 
            			password: password, 
            			avatar: avatar, 
            			billing_info: billing_info
            		}

            		// Create user
	                User.create( userData ).exec( function( error, user ) {
		                if ( error ) {
		                    res.json({ code: 500, error: "DB Error" });
		                } else {
		                    req.session.user = user;
		                    res.json( user );
		                }
		            });
            	}
	            else
	            	res.json({ proceed: true })
	        };
    	});
	}
};

