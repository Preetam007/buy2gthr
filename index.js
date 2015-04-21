//require('newrelic');
var express = require('express');
var cons = require('consolidate');
var https = require('http');
var app = module.exports = express();
var colors = require('colors');
var ejs1 = require("./config.js");

var dust = require("dustjs-helpers");
var MySQLStore = require('connect-mysql')(express);

var connection = ejs1.connection;

app.configure(function()
    {
    'use strict';

      app.set('port',process.env.PORT || 3000);
    //parse request bodies (req.body)


     });
//parse request bodies (req.body)
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/JBK/buyTogether/public' }));

// support _method (PUT in forms etc)
app.use(express.methodOverride());

//map .renderFile to ".html" files
  app.engine('dust', cons.dust);
//make ".html" the default
  app.set('view engine', 'dust');
//set views for error and 404 pages
  app.set('views', __dirname + '/views');




//serve static files
 app.use(app.router);
app.use(express.static(__dirname + '/public'));
//app.use(express.logger());
//define a custom res.message() method
//which stores messages in the session
app.response.message = function(msg){
// reference `req.session` via the `this.req` reference
var sess = this.req.session;
// simply add the msg to an array for later
sess.messages = sess.messages || [];
sess.messages.push(msg);
return this;
};

//session support
app.use(express.cookieParser());
app.use(express.session({ secret: '6PUHaVAq6dedUtHe', cookie:{maxAge: 28*24*60*60*1000},store: new MySQLStore(connection)}));
//app.use(express.session({cookie:{maxAge: 28*24*60*60*1000}})); //session valid for 28 days

// parse request bodies (req.body)
app.use(express.bodyParser());



// support _method (PUT in forms etc)
app.use(express.methodOverride());

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next){
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;

  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;

//   This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });


  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];

  process._req = req;
  next();
});

app.enable('trust proxy');


//load controllers
require('./lib/boot')(app, { verbose: !module.parent });


//app.get('/endpoint', function(req, res){
//    res.send(req.query);
//});
https.createServer(app).listen(app.get('port'),function()
{
    console.log("express server listening on " + app.get('port'));
    console.log("running".underline.yellow);
});
