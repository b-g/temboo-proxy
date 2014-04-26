Temboo-Proxy
============

a simple proxy helper to call and cache temboo choreos locally.

Special thanks to Stefan Landsbek [@47nrd](https://twitter.com/47nrd) for node.js tips and tricks!


Installation
------------

Install [node.js](http://nodejs.org/) for your OS.

Install Temboo-Proxy:

download, unzip or (git clone https://github.com/b-g/temboo-proxy.git) ... and then in terminal:

    cd temboo-proxy
    npm install


Configuration
-------------
Now specify your temboo credentials in the config.js file:

- copy config-sample.js
- rename the file to config.js
- fill in your [temboo app credentials](https://temboo.com/account/applications/) e.g. `config.temboo.user_name = 'b-g';`


Setup your Choreos
------------------
- go to https://temboo.com/library/ and click together in wizzard the choreos you want to use
- use the provided example code (at the end of the online wizzard) to define your choreos in tembooChoreos.js. There are already a few pre-defined, use them as a template for new ones. It is usally just tweaking one or two lines of the temboo example code.

![twittersearch choreo setup](https://cloud.githubusercontent.com/assets/480224/2792756/f0e7a52c-cbd6-11e3-88eb-704aba632e71.png)


Start/Use Temboo-Proxy
----------------------

    node server.js

Now you can call your choreos locally:

    localhost/choreoFunctionName?q=Query
    e.g. http://localhost:3000/twittersearch?q=Stuttgart

NB. Every new call is cached exaclty *once* in the database ...


Example Choreo Calls
--------------------

[http://localhost:3000/twittersearch?q=Israel](http://localhost:3000/twittersearch?q=Israel)
[http://localhost:3000/twittersearch?q=@bndktgrs+#stuttgart](http://localhost:3000/twittersearch?q=@bndktgrs+#stuttgart)
[http://localhost:3000/twittertimeline?q=Koby_Barhad](http://localhost:3000/twittertimeline?q=Koby_Barhad)

[http://localhost:3000/flickrsearchphotos?q=ruin](http://localhost:3000/flickrsearchphotos?q=ruin)
[http://localhost:3000/flickrsearchphotos?lat=31.5&lon=34.75](http://localhost:3000/flickrsearchphotos?lat=31.5&lon=34.75)
[http://localhost:3000/flickrsearchphotos?lat=31.5&lon=34.75&q=field](http://localhost:3000/flickrsearchphotos?lat=31.5&lon=34.75&q=field)

[http://localhost:3000/nytimesarticlesearch?q=Design](http://localhost:3000/nytimesarticlesearch?q=Design)


Hints
-----

You can get rid of the database by deleting the contents in the `db` folder or via  calling `http://localhost:3000/db/reset`.

If you don't want to cache any recieved content from temboo, then just comment out the caching of the choreo in tembooChoreos.js

    // cache.set(cacheKey, results.get_Response());

And last (for devs) you might want to install a utility like [nodemon](http://nodemon.io/) that will monitor for any changes in your source and automatically restart your server. Very handy.