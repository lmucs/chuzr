//Created using http://pixelhandler.com/blog/2012/02/09/develop-a-restful-api-using-node-js-with-express-and-mongoose/
// as reference.
module.exports = function (app) {
    //May not need to be duplicated. Rough draft.
    function validateProductId(id) {
        if (/\D/.test(id)) {
        throw Error('Illegal id')
        }
    return id;
    };
  
    app.get('/products', function (req, res) {
        skip = +req.query.skip || 0; 
        limit = +req.query.limit || 10; 
        console.log('skip = %d, limit = %d', skip, limit);
        res.json(User.findAll(skip=skip, limit=limit));
    });
    
    app.post('/products', function (req, res) {
        /*console.log("Adding new product:");
          console.log(req.body);
          To be fleshed out when product model is created.*/
        var product = new Product();
        //Assuming we are using the mongoose model.js
        product.save(function (error) {
            if (!error) {
                return console.log("product added");
            } else {
                return console.log(error);
            }
            });
            return res.send(product);
    });
}
