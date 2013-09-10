
![chuzr-logo](http://i.imgur.com/SVmuICp.png)

**Chuzr** is a social ranking application where users give **opinions** on products, 
ideas, businesses, sports teams, restaurants, celebrities, and other such things
by voting, ranking, rating, or tagging.  Users can gain **reputation** for their 
actions, and acquire coupons and random prizes.  Users can **login** via facebook or twitter, 
and **share** their activities and rewards to these social networks.  

This project consists of three parts:

  * a [service](https://github.com/rtoal/chuzr/tree/master/server) with a RESTful API usable by client apps
  * a [feed processor](https://github.com/rtoal/chuzr/tree/master/feed-processor) for ingesting feeds from various providers
  * a subsystem that performs [offline analysis](https://github.com/rtoal/chuzr/tree/master/analyzer) of user activity to process user opinions, providing reports useful to marketing or advertising agencies.

![Architecture Overview](http://i.imgur.com/CywtjYc.png)

In addition, we've included prototype clients for the [web](https://github.com/rtoal/chuzr/tree/master/web-client), iOS, and android.

For more information, [please see the wiki](https://github.com/rtoal/chuzr/wiki).

