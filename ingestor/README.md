How to Ingestor
===============

The chuzr ingestor ingests data from a remote location and
updates the data store accordingly.  Images and other media  are
stored separately from the simple product data.


### Before you can ingest

You probably should pull the latest update from master. You should be in the master branch.

Your developer's api key should be stored in ingestor/config/shopzilla/api.js as shown below,
where both values are strings:


    module.exports = {
      apiKey: "xxx",
      publisherId: "xxx"
    };

Also, you need to `npm install` from inside the ingestor/ directory, so you can get the 'mongodb' package.

Now, run `mongod` in another window to start up your mongo datbase

### How to do Ingesting

(Currently) To run:

Inside the central chuzr/ directory, there is a directory called scripts/ . You should:

    cd scripts/
    bash chuzr-bootstrap.sh

After you see that it loads a bunch of products, check in your mongo console if there
are around (or just under) 5000 products. Then you need to kill the bootstrap process manually.
