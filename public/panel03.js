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
        { "id":"lp01", "x":60, "y":10 },
        { "id":"lp02", "x":110, "y":10 },
        { "id":"lp03", "x":160, "y":10 },
        { "id":"lp04", "x":210, "y":10 },
        { "id":"lp05", "x":260, "y":10 },
        { "id":"lp06", "x":310, "y":10 },
        { "id":"lp07", "x":360, "y":10 },
        { "id":"lp08", "x":410, "y":10 },
        { "id":"lp09", "x":460, "y":10 },
        { "id":"lp10", "x":10, "y":60 },
        { "id":"lp11", "x":60, "y":60 },
        { "id":"lp12", "x":110, "y":60 },
        { "id":"lp13", "x":160, "y":60 },
        { "id":"lp14", "x":210, "y":60 },
        { "id":"lp15", "x":260, "y":60 },
        { "id":"lp16", "x":310, "y":60 },
        { "id":"lp17", "x":360, "y":60 },
        { "id":"lp18", "x":410, "y":60 },
        { "id":"lp19", "x":460, "y":60 },
        { "id":"lp20", "x":10, "y":110 },
        { "id":"lp21", "x":60, "y":110 },
        { "id":"lp22", "x":110, "y":110 },
        { "id":"lp23", "x":160, "y":110 },
        { "id":"lp24", "x":210, "y":110 },
        { "id":"lp25", "x":260, "y":110 },
        { "id":"lp26", "x":310, "y":110 },
        { "id":"lp27", "x":360, "y":110 },
        { "id":"lp28", "x":410, "y":110 },
        { "id":"lp29", "x":460, "y":110 },
        { "id":"lp30", "x":10, "y":160 },
        { "id":"lp31", "x":60, "y":160 },
        { "id":"lp32", "x":110, "y":160 },
        { "id":"lp33", "x":160, "y":160 },
        { "id":"lp34", "x":210, "y":160 },
        { "id":"lp35", "x":260, "y":160 },
        { "id":"lp36", "x":310, "y":160 },
        { "id":"lp37", "x":360, "y":160 },
        { "id":"lp38", "x":410, "y":160 },
        { "id":"lp39", "x":460, "y":160 },
        { "id":"lp40", "x":10, "y":210 },
        { "id":"lp41", "x":60, "y":210 },
        { "id":"lp42", "x":110, "y":210 },
        { "id":"lp43", "x":160, "y":210 },
        { "id":"lp44", "x":210, "y":210 },
        { "id":"lp45", "x":260, "y":210 },
        { "id":"lp46", "x":310, "y":210 },
        { "id":"lp47", "x":360, "y":210 },
        { "id":"lp48", "x":410, "y":210 },
        { "id":"lp49", "x":460, "y":210 },
        { "id":"lp50", "x":10, "y":260 },
        { "id":"lp51", "x":60, "y":260 },
        { "id":"lp52", "x":110, "y":260 },
        { "id":"lp53", "x":160, "y":260 },
        { "id":"lp54", "x":210, "y":260 },
        { "id":"lp55", "x":260, "y":260 },
        { "id":"lp56", "x":310, "y":260 },
        { "id":"lp57", "x":360, "y":260 },
        { "id":"lp58", "x":410, "y":260 },
        { "id":"lp59", "x":460, "y":260 },
        { "id":"lp200", "x":510, "y":10 },
        { "id":"lp201", "x":560, "y":10 },
        { "id":"lp202", "x":610, "y":10 },
        { "id":"lp203", "x":660, "y":10 },
        { "id":"lp204", "x":710, "y":10 },
        { "id":"lp205", "x":760, "y":10 },
        { "id":"lp206", "x":810, "y":10 },
        { "id":"lp207", "x":860, "y":10 },
        { "id":"lp208", "x":910, "y":10 },
        { "id":"lp209", "x":960, "y":10 },
        { "id":"lp210", "x":510, "y":60 },
        { "id":"lp211", "x":560, "y":60 },
        { "id":"lp212", "x":610, "y":60 },
        { "id":"lp213", "x":660, "y":60 },
        { "id":"lp214", "x":710, "y":60 },
        { "id":"lp215", "x":760, "y":60 },
        { "id":"lp216", "x":810, "y":60 },
        { "id":"lp217", "x":860, "y":60 },
        { "id":"lp218", "x":910, "y":60 },
        { "id":"lp219", "x":960, "y":60 },
        { "id":"lp220", "x":510, "y":110 },
        { "id":"lp221", "x":560, "y":110 },
        { "id":"lp222", "x":610, "y":110 },
        { "id":"lp223", "x":660, "y":110 },
        { "id":"lp224", "x":710, "y":110 },
        { "id":"lp225", "x":760, "y":110 },
        { "id":"lp226", "x":810, "y":110 },
        { "id":"lp227", "x":860, "y":110 },
        { "id":"lp228", "x":910, "y":110 },
        { "id":"lp229", "x":960, "y":110 },
        { "id":"lp230", "x":510, "y":160 },
        { "id":"lp231", "x":560, "y":160 },
        { "id":"lp232", "x":610, "y":160 },
        { "id":"lp233", "x":660, "y":160 },
        { "id":"lp234", "x":710, "y":160 },
        { "id":"lp235", "x":760, "y":160 },
        { "id":"lp236", "x":810, "y":160 },
        { "id":"lp237", "x":860, "y":160 },
        { "id":"lp238", "x":910, "y":160 },
        { "id":"lp239", "x":960, "y":160 },
        { "id":"lp240", "x":510, "y":210 },
        { "id":"lp241", "x":560, "y":210 },
        { "id":"lp242", "x":610, "y":210 },
        { "id":"lp243", "x":660, "y":210 },
        { "id":"lp244", "x":710, "y":210 },
        { "id":"lp245", "x":760, "y":210 },
        { "id":"lp246", "x":810, "y":210 },
        { "id":"lp247", "x":860, "y":210 },
        { "id":"lp248", "x":910, "y":210 },
        { "id":"lp249", "x":960, "y":210 },
        { "id":"lp250", "x":510, "y":260 },
        { "id":"lp251", "x":560, "y":260 },
        { "id":"lp252", "x":610, "y":260 },
        { "id":"lp253", "x":660, "y":260 },
        { "id":"lp254", "x":710, "y":260 },
        { "id":"lp255", "x":760, "y":260 },
        { "id":"lp256", "x":810, "y":260 },
        { "id":"lp257", "x":860, "y":260 },
        { "id":"lp258", "x":910, "y":260 },
        { "id":"lp259", "x":960, "y":260 },
        { "id":"lp100", "x":10, "y":610 },
        { "id":"lp101", "x":60, "y":610 },
        { "id":"lp102", "x":110, "y":610 },
        { "id":"lp103", "x":160, "y":610 },
        { "id":"lp104", "x":210, "y":610 },
        { "id":"lp105", "x":260, "y":610 },
        { "id":"lp106", "x":310, "y":610 },
        { "id":"lp107", "x":360, "y":610 },
        { "id":"lp108", "x":410, "y":610 },
        { "id":"lp109", "x":460, "y":610 },
        { "id":"lp110", "x":10, "y":660 },
        { "id":"lp111", "x":60, "y":660 },
        { "id":"lp112", "x":110, "y":660 },
        { "id":"lp113", "x":160, "y":660 },
        { "id":"lp114", "x":210, "y":660 },
        { "id":"lp115", "x":260, "y":660 },
        { "id":"lp116", "x":310, "y":660 },
        { "id":"lp117", "x":360, "y":660 },
        { "id":"lp118", "x":410, "y":660 },
        { "id":"lp119", "x":460, "y":660 },
        { "id":"lp120", "x":10, "y":710 },
        { "id":"lp121", "x":60, "y":710 },
        { "id":"lp122", "x":110, "y":710 },
        { "id":"lp123", "x":160, "y":710 },
        { "id":"lp124", "x":210, "y":710 },
        { "id":"lp125", "x":260, "y":710 },
        { "id":"lp126", "x":310, "y":710 },
        { "id":"lp127", "x":360, "y":710 },
        { "id":"lp128", "x":410, "y":710 },
        { "id":"lp129", "x":460, "y":710 },
        { "id":"lp130", "x":10, "y":760 },
        { "id":"lp131", "x":60, "y":760 },
        { "id":"lp132", "x":110, "y":760 },
        { "id":"lp133", "x":160, "y":760 },
        { "id":"lp134", "x":210, "y":760 },
        { "id":"lp135", "x":260, "y":760 },
        { "id":"lp136", "x":310, "y":760 },
        { "id":"lp137", "x":360, "y":760 },
        { "id":"lp138", "x":410, "y":760 },
        { "id":"lp139", "x":460, "y":760 },
        { "id":"lp140", "x":10, "y":810 },
        { "id":"lp141", "x":60, "y":810 },
        { "id":"lp142", "x":110, "y":810 },
        { "id":"lp143", "x":160, "y":810 },
        { "id":"lp144", "x":210, "y":810 },
        { "id":"lp145", "x":260, "y":810 },
        { "id":"lp146", "x":310, "y":810 },
        { "id":"lp147", "x":360, "y":810 },
        { "id":"lp148", "x":410, "y":810 },
        { "id":"lp149", "x":460, "y":810 },
        { "id":"lp150", "x":10, "y":860 },
        { "id":"lp151", "x":60, "y":860 },
        { "id":"lp152", "x":110, "y":860 },
        { "id":"lp153", "x":160, "y":860 },
        { "id":"lp154", "x":210, "y":860 },
        { "id":"lp155", "x":260, "y":860 },
        { "id":"lp156", "x":310, "y":860 },
        { "id":"lp157", "x":360, "y":860 },
        { "id":"lp158", "x":410, "y":860 },
        { "id":"lp159", "x":460, "y":860 },
    ],
    "di": [
        { "id":"pb01", "x":70, "y":310 },
        { "id":"pb02", "x":120, "y":310 },
        { "id":"pb03", "x":170, "y":310 },
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
Snap.load('/subdrawings01.svg', function(o) {
  subdrawings = o;
  subdrawingsloaded = true;
  if (panelloaded) { onDrawingLoaded(panel); }
});
Snap.load("/panel02.svg", function(o) {
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
    obj.text(10,40,"DISCO");
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
    obj.text(10,40,"test");
    s.append(obj);
    elements[key] = [obj];
  }

  requestAnimationFrame(step);
}

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

// Draw "loop"
function step(timestamp) {
  for (i=0; i<doconfig.length; i++) {
    setfill(doconfig[i]['id'], get_random_color());
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
