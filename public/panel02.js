window.onload = function() {

// requestAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

// JSON definition of panel
var jsonpanel = { "config": {
    "do": [
        { "id":"do01", "x":100, "y":100 },
        { "id":"do02", "x":200, "y":200 },
        { "id":"do03", "x":300, "y":300 },
        { "id":"do04", "x":400, "y":400 },
    ],
    "di": [
        { "id":"pb01", "x":100, "y":100 },
        { "id":"pb02", "x":100, "y":100 },
        { "id":"pb03", "x":100, "y":100 },
        { "id":"pb04", "x":100, "y":100 },
        { "id":"pb05", "x":100, "y":100 },
    ],
    "ao": [
        { "id":"ao01", "x":100, "y":100 },
    ]
}};


var doconfig = jsonpanel['config']['do'];
var diconfig = jsonpanel['config']['di'];
var elements = {};
var ao01;
var ao02;
var ao03;
var lp00;
var lp01;
var lp02;
var lp04;
var lp05;
var socket;
var connected=0;
var valvpos=0;
var pumpflow=0;
var level=0.0;
var animating = {};
var cleartimers = {};
// snap.svg
var s = Snap("#svg");
Snap.load("panel02.svg",onDrawingLoaded);

// Socket.io 
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


function show(key) {
    if (animating[key]) return;
    clearTimeout(cleartimers[key]);
    animating[key] = true;
    var element = elements[key],
        x = element[0].getBBox().x,
        offset = x/2 + 25;
    element[0].attr({
        transform: "translate("+offset+",80) scale(0.5, 0.5)"
    });
    setTimeout(function() {
        element[0].animate({opacity:1,transform:""}, 500, mina.elastic);
    }, 50);
    //element[1].animate({opacity:0.25}, 400);
    setTimeout(function(){animating[key] = false}, 550);
}


// snap.svg
function pbclick() {
    show(this.node.id);
    socket.send(this.node.id);
}

function onDrawingLoaded(d){
  for (i = 0; i < diconfig.length; i++) {
    var key = diconfig[i]['id'];
    var obj = d.select("#"+key);
    obj.click(pbclick);
    elements[key] = [obj];
  }
  lp00 = d.select("#lp00");
  for (i=0; i<doconfig.length; i++) {
    var key = doconfig[i]['id'];
    var x = doconfig[i]['x'];
    var y = doconfig[i]['y'];
    var objj = lp00.clone();
    objj.attr({id: "#"+key, transform: "translate("+x+","+y+")"});
  }

  ao01 = d.select("#needle01");
  ao02 = d.select("#needle02");
  ao03 = d.select("#needle03");
  lp00 = d.select("#lp00");
  lp01 = d.select("#lp01");
  lp02 = d.select("#lp02");
  lp04 = d.select("#lp04");
  lp05 = d.select("#lp05");
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
  //m03.translate(595,120);
  //m03.rotate(level,15,15);
  m03.rotate(level,610,135);
  //m03.scale(0.6,0.6,15,15);
  ao03.transform(m03);

  requestAnimationFrame(step);
}

}
