![chuzr-logo](https://raw.github.com/rtoal/chuzr/master/artwork/logo/logo400.png)

**Chuzr** is a social ranking application where users give **opinions** on products, 
ideas, businesses, sports teams, restaurants, celebrities, and similar entities
by voting, ranking, rating, or tagging.  Users can gain **reputation** for their 
actions, and acquire coupons and random prizes.  Users can **login** via facebook or twitter, 
and **share** their activities and rewards to these social networks.  

This project consists of three parts:

  * a [web service](https://github.com/rtoal/chuzr/tree/master/server) with a RESTful API usable by client apps
  * a [feed processor](https://github.com/rtoal/chuzr/tree/master/ingestor) for ingesting feeds from various providers
  * a subsystem that performs [offline analysis](https://github.com/rtoal/chuzr/tree/master/analyzer) of user activity to process user opinions, providing reports useful to marketing or advertising agencies.

![Architecture Overview](https://raw.github.com/rtoal/chuzr/master/artwork/diagrams/chuzr_overview.png)

In addition, we've included prototype clients for the [web](https://github.com/rtoal/chuzr/tree/master/web-client), iOS, and android.

This project was developed the [LMU Computer Science](http://www.cs.lmu.edu/) Class of 
2014 as part of the CMSI 401 Software Engineering Laboratory course during the fall 
semester of 2013.

For more information, [please see the wiki](https://github.com/rtoal/chuzr/wiki).