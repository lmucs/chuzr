var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var productSchema = new Schema({
  	name 			     : String
  , brand 			   : String
  , description 	 : String
  , images			   : {
        "40"  : String,
        "100" : String,
        "160" : String,
        "400" : String
    }
  , url 			     : String
  , price			      : {
  		  max		 : Number
  	  , min		 : Number
  	}
  , rating          : Number
  , shopzillaId		  : Number
  , categoryId		  : Number
  , related			    :[Number]
});

module.exports = mongoose.model('Product', productSchema);