var voteSchema = new mongoose.Schema({
  _id: Number,
  productId: Number,
  rating: {type: Number, min: 0, max: 10}
});
