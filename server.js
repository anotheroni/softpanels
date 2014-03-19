var express = require('express');
var routes = require('./routes');
var socketio = require('socket.io');
var app = express();

var port = 8080;
 
app.set('views', __dirname + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(app.router);
app.use(express.static(__dirname + '/public'));

// development only, error checking
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/drawing/:name', routes.drawing);

var io = socketio.listen(app.listen(port));

var pumpflow=0;
var valvpos=0;
 
io.sockets.on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log('Message Received:', msg,"#");
    if (msg=="pb01") { pumpflow=Math.max(0,pumpflow-1); }
    else if (msg=="pb02") { pumpflow=Math.min(10,pumpflow+1); }
    else if (msg=="pb03") { pumpflow=0; }
    else if (msg=="pb04") { valvpos=0; }
    else if (msg=="pb05") { valvpos=1; }

    io.sockets.emit('message', '{"pumpflow":'+pumpflow+',"valvpos":'+valvpos+'}');
  });
});
console.log("listening on port " + port);
