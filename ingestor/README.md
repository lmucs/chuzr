How to Ingestor
===============

The chuzr feed processor ingests data from a remote location and
updates the data store accordingly.  Images and other media  are
stored separately from the simple product data.


### API Key Business

Your developer's api key should be stored in feed-processor/config/api.js as shown below,
where both values are strings:


    module.exports = {
      apiKey: "xxx",
      publisherId: "xxx"
    };

### How to do Ingesting

(Currently) To run:

    cd scripts/
    bash chuzr-bootstrap.sh

(Very soon) a script that will do an initial seeding/bootstrap
and then a cronjob that will update daily. To run:

    scripts/chuzr-bootstrap.sh
    scripts/chuzr-update-cron.sh
