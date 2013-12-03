How to Ingestor
===============

The chuzr ingestor ingests data from a remote location and
updates the data store accordingly.  Images and other media  are
stored separately from the simple product data.


### API Key Business

Your developer's api key should be stored in ingestor/config/shopzilla/api.js as shown below,
where both values are strings:


    module.exports = {
      apiKey: "xxx",
      publisherId: "xxx"
    };

### How to do Ingesting

(Currently) To run:

First, run mongod. Then,

    cd scripts/
    bash chuzr-bootstrap.sh

After you see that Sports Equiment products are loading, check in your mongo console if there
are around (or just under 5000) products. Then you need to kill the bootstrap process manually.
