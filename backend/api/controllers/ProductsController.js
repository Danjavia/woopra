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

        User.findOne( userId ).exec( function( err, user ) {
		  	if ( err ) // handle error
				res.json({ code: 500, error: 'Something went wrong.' });

		  	// Queue up a record to be inserted into the join table
		  	user.products.add( productId );
	
		  	// Save the user, creating the new associations in the join table
		  	user.save( function( err ) {
		  		// res.json({ code: 500, error: 'Something went wrong.' });
		  	});

		  	res.json({ data: 'Congratulations, the products has been saved in your library.' });
		});
	}
};

