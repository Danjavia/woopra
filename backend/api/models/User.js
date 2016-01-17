/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  identity: 'User',
  connection: 'someMongodbServer',

  attributes: {
  	username: {
  		type: 'string',
  		required: true
  	},
    password: {
      type: 'string',
      required: true
    },
  	avatar: {
  		type: 'string',
  		required: true
  	},

    products: {
      collection: 'products',
      via: 'owners',
      dominant: true
    }
  }
};

