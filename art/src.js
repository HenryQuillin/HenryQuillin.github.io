// https://generativeartistry.com/tutorials/circle-packing/

var canvas = document.getElementById('c1');
var context = canvas.getContext('2d');

var size = 1000//window.innerWidth;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 2;
  
var circles = [];
var minRadius = .00001;
var maxRadius = 150;
var totalCircles = 30000;
var createCircleAttempts = 3000;

color1 = "#5D737E"
color2 = "#64B6AC"
color3 = "#C0FDFB"
color4 = "#DAFFEF"
color5 = "#FCFFFD"

water={ 
  1: "#5D737E",
  2:"#64B6AC",
  3:"#C0FDFB",
  4:"#DAFFEF",
  5:"#FCFFFD"
};
light={ 
  1: "#d73d6c",
  2:"#d57276",
  3:"#d6c2bc",
  4:"#c0cccc",
  5:"#65b2c6"
};
 
function getColor() {
  // code = Math.floor(Math.random()*10000).toString(16);
  // return color = "#" + code; 
  num = Math.floor(Math.random() * 5) + 1

  return water[num]

  
}
function createAndDrawCircle() {
  
  var newCircle;
  var circleSafeToDraw = false;
  for(var tries = 0; tries < createCircleAttempts; tries++) {
    newCircle = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
      radius: minRadius
    }
    
    if(doesCircleHaveACollision(newCircle)) {
      continue;
    } else {
      circleSafeToDraw = true;
      break;
    }
  }

  if(!circleSafeToDraw) {
    return;
  }

  for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
    newCircle.radius = radiusSize;
    if(doesCircleHaveACollision(newCircle)){
      newCircle.radius--;
      break;
    } 
  }
   context.fillStyle = getColor();
  circles.push(newCircle);
  context.beginPath();
  context.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*Math.PI);
  context.stroke(); 
  context.fill()
}

function doesCircleHaveACollision(circle) {
  for(var i = 0; i < circles.length; i++) {
    var otherCircle = circles[i];
    var a = circle.radius + otherCircle.radius;
    var x = circle.x - otherCircle.x;
    var y = circle.y - otherCircle.y;

    if (a >= Math.sqrt((x*x) + (y*y))) {
      return true;
    }
  }
  
  if(circle.x + circle.radius >= size ||
     circle.x - circle.radius <= 0) {
    return true;
  }
    
  if(circle.y + circle.radius >= size ||
      circle.y - circle.radius <= 0) {
    return true;
  }
  
  return false;
}

for( var i = 0; i < totalCircles; i++ ) {  
  createAndDrawCircle();
}

createAndDrawCircle()

