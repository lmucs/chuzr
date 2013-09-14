var couponSchema = new.mongoose.Schema({
	_id: Number,
	name: {type: String, max: 100},
	code: Number,
	issuer: String, //consider making a schema for companies
	issueDate: Date,
	expirationDate: Date
})