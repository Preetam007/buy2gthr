var ejs1 = require("../../config.js");
//connecting to mysql
var connection  = ejs1.connection;

var htmlparser = require("htmlparser2");
//var parser = new htmlparser.Parser({
//    onopentag: function(name, attribs){
//        if(name === "script" && attribs.type === "text/javascript"){
//            console.log("JS! Hooray!");
//        }
//    },
//    ontext: function(text){
//        console.log("-->", text);
//    },
//    onclosetag: function(tagname){
//        if(tagname === "script"){
//            console.log("That's it?!");
//        }
//    }
//});
//parser.write("Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>");
//parser.end();






var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: 'raopreetamoffers@gmail.com',
  password: 'myway$1A',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  connTimeout : 30000
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
  openInbox(function(err, box) {
  if (err) throw err;
	  imap.search([ ['SINCE', 'February 7, 2015'] ,['FROM','newsletter@coupondunia.in'] ], function(err, results) {
		  if (err) throw err;
		  if (err) console.log(err);
		  var f = imap.fetch(results, { bodies: '' });
	//	  var f = imap.seq.fetch(box.messages.total + ':*', { bodies: ['HEADER.FIELDS (FROM)','TEXT'] });
  f.on('message', function(msg, seqno) {
//    console.log('Message #%d', seqno);
    var prefix = '(#' + seqno + ') ';
    msg.on('body', function(stream, info) {
		//console.log(info);
		
      if (info.which === 'TEXT')
        //console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
      var buffer = '', count = 0;
      stream.on('data', function(chunk) {
        count += chunk.length;
        buffer += chunk.toString('utf8');
		  //console.log(JSON.stringify(buffer));
		  //console.log(info);
        //if (info.which === 'TEXT')
          //console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);
      });
      stream.once('end', function() {
		  
		  //console.log(HEADER.FIELDS);
        if (info.which !== 'TEXT')
		{
		//	console.log(buffer.split('<!DOCTYPE HTML>')[1]);
//			var fff  = buffer.split('Subject:')[1]
//			
//			 console.log(fff.slice(1,fff.indexOf('MIME-Version')));
			var parser = new htmlparser.Parser({
				onopentag: function(name, attribs){
					if(name === "p"){
						console.log("JS! Hooray!");
					}
				},
				ontext: function(text){
                   if(text != '')
					{
						console.log(text);
						connection.query("insert into offers (offer_desc) values (?)",[text],function(err)
						 {
							  if(err) console.log(err);
						 });
					}
				}
				,
				onclosetag: function(tagname){
					if(tagname === "p"){
						console.log("That's it?!");
					}
				}
			});
			
			parser.write(buffer.split('<!DOCTYPE HTML>')[1]);
            parser.end();
			
			
			
//			connection.query("insert into offers (plan_name) values (?)",[fff.slice(1,fff.indexOf('MIME-Version'))],function(err)
//			 {
//                  if(err) console.log(err);
//			 });
			
			//console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
		} 
        else
          console.log(prefix + 'Body [%s] Finished', inspect(info.which));
      });
    });
    msg.once('attributes', function(attrs) {
      console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
		
		console.log(attrs.date);
    });
    msg.once('end', function() {
      console.log(prefix + 'Finished');
    });
  });
  f.once('error', function(err) {
    console.log('Fetch error: ' + err);
  });
  f.once('end', function() {
    console.log('Done fetching all messages!');
    imap.end();
  });
		  
	  });
  
});
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();
