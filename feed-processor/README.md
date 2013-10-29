The chuzr feed processor ingests data from a remote location and
updates the data store accordingly.  Images and other media  are
stored separately from the simple product data.



Your developer's api key should be stored in config/api.js as shown below,
where both values are strings:


    module.exports = {
      apiKey: xxx,
      publisherId: xxx
    };
