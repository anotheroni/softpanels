window.onload = function() {

// requestAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

// JSON definition of panel subdrawings
var jsonpanel = { "config": {
    "do": [
        { "id":"lp00", "x":10, "y":10 },
        { "id":"lp01", "x":80, "y":220 },
        { "id":"lp02", "x":130, "y":220 },
        { "id":"lp04", "x":500, "y":700 },
        { "id":"lp05", "x":550, "y":700 },
    ],
    "di": [
        { "id":"pb01", "x":70, "y":155 },
        { "id":"pb02", "x":120, "y":155 },
        { "id":"pb03", "x":170, "y":155 },
        { "id":"pb04", "x":490, "y":635 },
        { "id":"pb05", "x":540, "y":635 },
    ],
    "ao": [
        { "id":"ao01", "x":70, "y":400 },
        { "id":"ao02", "x":320, "y":400 },
        { "id":"ao03", "x":515, "y":60 },
    ]
}};


var doconfig = jsonpanel['config']['do'];
var diconfig = jsonpanel['config']['di'];
var aoconfig = jsonpanel['config']['ao'];
var elements = {};
var animating = {};
var cleartimers = {};

var socket;
var connected=false;

var subdrawingsloaded = false;
var panelloaded = false;
var panel;
var subdrawings;

var valvpos=0;
var oldpumpflow=pumpflow=0;
var oldlevel=level=0.0;

// Load base drawing and subdrawings, draw when both are loaded.
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
  connected=true;
});
socket.on('disconnect', function() {
  connected=false;
});
socket.on('message', function(data) {
  var obj=JSON.parse(data);
  valvpos=obj.valvpos;
  pumpflow=obj.pumpflow;
});

// Button animation
function show(key) {
    if (animating[key]) return;
    clearTimeout(cleartimers[key]);
    animating[key] = true;
    var element = elements[key];
    element[0].attr({
        transform: "translate("+element[0].mx+","+element[0].my+") scale(0.8, 0.8, 50, 50)"
    });
    setTimeout(function() {
      element[0].attr({
        transform: "translate("+element[0].mx+","+element[0].my+") scale(1.0, 1.0, 50, 50)"
      });
      // Using animate will destroy the transform and all elements end up
      // in the top left corner.
      //element[0].animate({
      //  transform: "scale(1.0, 1.0, 50, 50)"
      //},500);
        //element[0].animate({opacity:1,transform:"translate("+element[0].mx+","+element[0].my+")"}, 500, mina.elastic);
      animating[key] = false
    }, 300);
}

// Callback for onclick on buttons
function pbclick() {
  show(this.node.id);
  socket.send(this.node.id);
}

// Set fill color of element
function setfill(key, color) {
  try {
    elements[key][0].attr({fill:color});
  } catch(err) {
    return;
  }
}

// Build panel from base drawing plus subdrawings
function onDrawingLoaded(d){
  s.append(d);
  var sd_meter01 = subdrawings.select("#meter01");
  var sd_needle01 = subdrawings.select("#needle01");
  for (i=0; i<aoconfig.length; i++) {
    var key = aoconfig[i]['id'];
    // Add meter
    var obj = sd_meter01.clone();
    // Firefox error
    // [18:22:38.021] NS_ERROR_FAILURE: Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIDOMSVGLocatable.getBBox] @ http://localhost:8080/snap.svg.js:5371
    obj.node.id = "#meter" + key;
    obj.attr({transform: "translate("+aoconfig[i]['x']+","+aoconfig[i]['y']+")"});
    s.append(obj);
    // Add needle
    var obj = sd_needle01.clone();
    obj.mx = aoconfig[i]['x']+80;
    obj.my = aoconfig[i]['y']+80;
    obj.node.id = key;
    obj.attr({transform: "translate("+obj.mx+","+obj.my+")"});
    s.append(obj);
    var matrix = new Snap.Matrix();
    matrix.translate(obj.mx, obj.my);
    elements[key] = [obj, matrix];
  }
  var sd_lp01 = subdrawings.select("#lp01");
  for (i=0; i<doconfig.length; i++) {
    var key = doconfig[i]['id'];
    var obj = sd_lp01.clone();
    var front = obj.select(".front");
    obj.node.id = "g" + key; 
    front.node.id = key; 
    obj.attr({transform: "translate("+doconfig[i]['x']+","+doconfig[i]['y']+")"});
    s.append(obj);
    elements[key] = [front];
  }
  var sd_bp01 = subdrawings.select("#pb01");
  for (i=0; i<diconfig.length; i++) {
    var key = diconfig[i]['id'];
    var obj = sd_bp01.clone();
    obj.mx = diconfig[i]['x'];
    obj.my = diconfig[i]['y'];
    obj.node.id = key;
    obj.attr({transform: "translate("+diconfig[i]['x']+","+diconfig[i]['y']+")"});
    obj.click(pbclick);
    s.append(obj);
    elements[key] = [obj];
  }

  requestAnimationFrame(step);
}

// Draw "loop"
function step(timestamp) {
  if (connected) { setfill('lp00', '#00ff00'); }
  else { setfill('lp00', '#ff0000'); }
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

  // "simulation"
  level = level + pumpflow*0.1 - valvpos*0.3;
  level = Math.max(0.0,level)
  
  if (oldpumpflow != pumpflow) {
    elements["ao01"][1].rotate((pumpflow-oldpumpflow)*30,8.5,8.5);
    elements["ao01"][0].transform(elements["ao01"][1]);
    elements["ao02"][1].rotate((pumpflow-oldpumpflow)*30,8.5,8.5);
    elements["ao02"][0].transform(elements["ao02"][1]);
    oldpumpflow=pumpflow;
  }
  if (oldlevel != level) {
    elements["ao03"][1].rotate((level-oldlevel),8.5,8.5);
    elements["ao03"][0].transform(elements["ao03"][1]);
    oldlevel = level;
  }

  requestAnimationFrame(step);
}

}
