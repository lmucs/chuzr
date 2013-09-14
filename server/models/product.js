var productSchema = new mongoose.Schema({
  _id: Number,
  name: {type: String, max: 100},
  description: {type: String, max: 300},
  imageURL: String,
  rating: {type: Number, min: 0, max: 10},
  categoryIds: [String],
  price: {type: Number, min: 0},
  relatedProductIds: [Number]
});
