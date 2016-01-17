/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	attach: function ( req, res ) {

		var userId = req.param( "userId" );
        var productId = req.param( "productId" );

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
	}
};

