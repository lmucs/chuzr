var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var productSchema = new Schema({
	name 			: String
  , brand 			: String
  , description 	: String
  , images			: {
  		image 	: [
  			{
	  			value : String
	  		  , xsize : Number
	  		  , ysize : Number	
  		 	}
  		]
  	}
  , url 			: String
  , price			: {
  		max		: Number
  	  , min		: Number
  	}
  , shopzillaId		: Number
  , categoryId		: Number
  , related			: [Number]
});

module.exports = mongoose.model('Product', productSchema);