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
        { "id":"lp00", "x":10, "y":10 },
        { "id":"lp01", "x":80, "y":220 },
        { "id":"lp02", "x":130, "y":220 },
        { "id":"lp04", "x":500, "y":700 },
        { "id":"lp05", "x":550, "y":700 },
    ],
    "di": [
        { "id":"pb01", "x":80, "y":170 },
        { "id":"pb02", "x":130, "y":170 },
        { "id":"pb03", "x":180, "y":170 },
        { "id":"pb04", "x":500, "y":650 },
        { "id":"pb05", "x":550, "y":650 },
    ],
    "ao": [
        { "id":"ao01", "x":20, "y":300 },
        { "id":"ao02", "x":200, "y":300 },
        { "id":"ao03", "x":500, "y":10 },
    ]
}};


var doconfig = jsonpanel['config']['do'];
var diconfig = jsonpanel['config']['di'];
var aoconfig = jsonpanel['config']['ao'];
var elements = {};
var ao01;
var ao02;
var ao03;
var socket;
var connected=0;
var valvpos=0;
var pumpflow=0;
var level=0.0;
var animating = {};
var cleartimers = {};
var subdrawingsloaded = false;
var panelloaded = false;
var panel;
var subdrawings;
// snap.svg
var s = Snap("#svg");
Snap.load('subdrawings01.svg', function(o) {
  subdrawings = o;
  subdrawingsloaded = true;
  if (panelloaded) { onDrawingLoaded(panel); }
});
Snap.load("panel02.svg", function(o) {
  panel = o;
  panelloaded = true;
  if (subdrawingsloaded) { onDrawingLoaded(panel); }
});

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

// Callback for onclick on buttons
function pbclick() {
//  show(this.node.id);
  socket.send(this.node.id);
}

function setfill(key, color) {
  try {
    elements[key][0].attr({fill:color});
  } catch(err) {
    return;
  }
}

function onDrawingLoaded(d){
  ao01 = d.select("#needle01");
  ao02 = d.select("#needle02");
  ao03 = d.select("#needle03");
  s.append(d);
  var sd_meter01 = subdrawings.select("#meter01");
  for (i=0; i<aoconfig.length; i++) {
    var key = aoconfig[i]['id'];
    var obj = sd_meter01.clone();
    // [18:22:38.021] NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIDOMSVGLocatable.getBBox] @ http://localhost:8080/snap.svg.js:5371
    //obj.attr({id: "#"+key, transform: "translate("+aoconfig[i]['x']+","+aoconfig[i]['y']+")"});
    obj.attr({id: "#"+key});
    s.append(obj);
    elements[key] = [obj];
  }
  var sd_lp01 = subdrawings.select("#lp01");
  for (i=0; i<doconfig.length; i++) {
    var key = doconfig[i]['id'];
    var obj = sd_lp01.clone();
    obj.attr({id: "#"+key, transform: "translate("+doconfig[i]['x']+","+doconfig[i]['y']+")"});
    s.append(obj);
    elements[key] = [obj];
  }
  var sd_bp01 = subdrawings.select("#pb01");
  for (i=0; i<diconfig.length; i++) {
    var key = diconfig[i]['id'];
    var obj = sd_bp01.clone();
    obj.attr({id: "#"+key});
    //obj.attr({transform: "translate(0,0)"});
    //, transform: "translate("+diconfig[i]['x']+","+diconfig[i]['y']+")"});
    obj.click(pbclick);
    s.append(obj);
    elements[key] = [obj];
  }

  requestAnimationFrame(step);
}

function step(timestamp) {
  if (connected==0) { setfill('lp00', '#ff0000'); }
  else { setfill('lp00', '#00ff00'); }
  if (pumpflow==0) {
    setfill('lp01', '#00ff00');
    setfill('lp02', '#dddb36');
  } else if (pumpflow > 9) {
    setfill('lp01', '#008000');
    setfill('lp02', '#fffc28');
  } else {
    setfill('lp01', '#008000');
    setfill('lp02', '#dddb36');
  }
  if (valvpos==0) {
    setfill('lp04', '#00ff00');
    setfill('lp05', '#dddb36');
  } else {
    setfill('lp04', '#008000');
    setfill('lp05', '#fffc28');
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
