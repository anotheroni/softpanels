window.onload = function() {

// requestAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

// snap.svg
var s = Snap("#svg");
Snap.load("panel01.svg",onDrawingLoaded);
var active=1;
var ao01;
var ao02;
var ao03;
var angle=0;
var angle2=0;
var lp01;
var lp02;
var lp03;
var lp04;
var bt01;
var bt01active=0;
var iosocket;

// Socket.io 
//(function(){
  iosocket = io.connect();
  iosocket.on('connect', function () {
    iosocket.on('message', function(message) {
      //$('#incomingChatMessages').append($('<li></li>').text(message));
      lp04.attr({fill:"#00ff00"});
    });
    iosocket.on('disconnect', function() {
      lp04.attr({fill:"#ff0000"});
    });
  });
 
  $('#outgoingChatMessage').keypress(function(event) {
    if(event.which == 13) {
      event.preventDefault();
      iosocket.send($('#outgoingChatMessage').val());
      $('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
      $('#outgoingChatMessage').val('');
    }
  });
//});

// snap.svg
function bt01click() {
  if (bt01active == 0) {
    bt01active=1;
    lp02.attr({fill:"#00ff00"});
    iosocket.send("button click");
  } else {
    bt01active=0;
    lp02.attr({fill:"#000000"});
  }
}

function onDrawingLoaded(d){
  ao01 = d.select("#needle01");
  ao02 = d.select("#needle02");
  ao03 = d.select("#needle03");
  lp01 = d.select("#lp01");
  lp02 = d.select("#lp02");
  lp03 = d.select("#lp03");
  lp04 = d.select("#lp04");
  bt01 = d.select("#bt01");
  bt01.click(bt01click);
  s.append(d);
  lp01.attr({fill:"#ff0000"});
  requestAnimationFrame(step);
}

function step(timestamp) {
  if (active > 0) {
    lp01.attr({fill:"#ff0000"});
    active=0;
  } else {
    lp01.attr({fill:"#000000"});
    active=1;
  }
  angle++;
  if (angle > 360) { angle=0; }
  if (angle > 180) { angle2 = 450-angle; } else { angle2=angle+90;}
  var m = new Snap.Matrix();
  m.translate(135,605);
  m.rotate(angle,15,15);
  ao01.transform(m);
  var m02 = new Snap.Matrix();
  m02.translate(135,852);
  m02.rotate(-angle,15,15);
  ao02.transform(m02);
  var m03 = new Snap.Matrix();
  m03.translate(580,852);
  m03.rotate(angle2,15,15);
  ao03.transform(m03);

  requestAnimationFrame(step);
}

}
