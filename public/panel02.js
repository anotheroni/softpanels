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
Snap.load("panel02.svg",onDrawingLoaded);
var ao01;
var ao02;
var ao03;
var lp00;
var lp01;
var lp02;
var lp04;
var lp05;
var pb01;
var pb02;
var pb03;
var pb04;
var pb05;
var socket;
var connected=0;
var valvpos=0;
var pumpflow=0;
var level=0.0;

// Socket.io 
//(function(){
  socket = io.connect();
  socket.on('connect', function () {
    connected=1;
  });
  socket.on('disconnect', function() {
    connected=0;
  });
  socket.on('message', function(data) {
    var obj=JSON.parse(data);
    valvpos=obj.valvpos;
    pumpflow=obj.pumpflow;
  });
 
// snap.svg
function pb01click() {
    socket.send("pb01");
}
function pb02click() {
    socket.send("pb02");
}
function pb03click() {
    socket.send("pb03");
}
function pb04click() {
    socket.send("pb04");
}
function pb05click() {
    socket.send("pb05");
}

function onDrawingLoaded(d){
  ao01 = d.select("#needle01");
  ao02 = d.select("#needle02");
  ao03 = d.select("#needle03");
  lp00 = d.select("#lp00");
  lp01 = d.select("#lp01");
  lp02 = d.select("#lp02");
  lp04 = d.select("#lp04");
  lp05 = d.select("#lp05");
  pb01 = d.select("#pb01");
  pb01.click(pb01click);
  pb02 = d.select("#pb02");
  pb02.click(pb02click);
  pb03 = d.select("#pb03");
  pb03.click(pb03click);
  pb04 = d.select("#pb04");
  pb04.click(pb04click);
  pb05 = d.select("#pb05");
  pb05.click(pb05click);
  s.append(d);
  requestAnimationFrame(step);
}

function step(timestamp) {
  if (connected==0) { lp00.attr({fill:"#ff0000"}); }
  else { lp00.attr({fill:"#00ff00"}); }
  if (pumpflow==0) {
    lp01.attr({fill:"#00ff00"});
    lp02.attr({fill:"#dddb36"});
  } else if (pumpflow > 9) {
    lp01.attr({fill:"#008000"});
    lp02.attr({fill:"#fffc28"});
  } else {
    lp01.attr({fill:"#008000"});
    lp02.attr({fill:"#dddb36"});
  }
  if (valvpos==0) {
    lp04.attr({fill:"#00ff00"});
    lp05.attr({fill:"#dddb36"});
  } else {
    lp04.attr({fill:"#008000"});
    lp05.attr({fill:"#fffc28"});
  }

  level = level + pumpflow*0.1 - valvpos*0.3;
  level = Math.max(0.0,level)
  
  var m01 = new Snap.Matrix();
  m01.translate(146,510);
  m01.rotate(pumpflow*18,15,15);
  m01.scale(0.6,0.6,15,15);
  ao01.transform(m01);
  var m02 = new Snap.Matrix();
  m02.translate(396,510);
  m02.rotate(pumpflow*18,15,15);
  m02.scale(0.6,0.6,15,15);
  ao02.transform(m02);
  var m03 = new Snap.Matrix();
  m03.translate(595,120);
  m03.rotate(level,15,15);
  m03.scale(0.6,0.6,15,15);
  ao03.transform(m03);

  requestAnimationFrame(step);
}

}
