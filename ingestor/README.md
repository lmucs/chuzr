How to Ingestor
===============

The chuzr ingestor ingests data from a remote location and
updates the data store accordingly.  Images and other media  are
stored separately from the simple product data.


### Before you can ingest

You probably should pull the latest update from master. You should be in the master branch.

Now, first thing, go into the ingestor directory (`cd ingestor/`).

Your developer's api key should be stored in the file config/shopzilla/api.js as shown below,
where both values are strings. If you don't have the apiKey and publisherId, you should get one
or as your tech lead for one:

    module.exports = {
      apiKey: "xxx",
      publisherId: "xxx"
    };

Now, run `mongod` in another window to start up your mongo datbase

### To Ingest

To begin the ingestion bootstrap (from inside the ingestor directory still):

    npm install
    ./chuzr-bootstrap.sh

You should have lots of products in your database now :D
