document.addEventListener('DOMContentLoaded', function() {
  var drumBtn = document.getElementById('drum-btn');
  
  drumBtn.onclick = function() {
    playSound();
    showRoots();
  };
});

function playSound() {
  var audio = new Audio('sounds/low-drum.wav');
  audio.play();
}

function showRoots() {
  var rootText = document.getElementById('root-text');
  rootText.style.opacity = '1';
  
  setTimeout(function() {
    drawRoot();
  }, 200);
}

function drawRoot() {
  var canvas = document.getElementById('root-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 160;
    canvas.style.cssText = 'position: fixed; left: 50%; top: 40px; transform: translateX(-50%); pointer-events: none; background: #2a2a32; border-radius: 4px;';
    document.body.appendChild(canvas);
  }
  
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#6b7c85';
  ctx.lineWidth = 2;
  
  // Draw roots that grow deeper and tighter each time the drum is pressed
  for (var i = 0; i < 12; i++) {
    var x = 35 + Math.random() * 10;
    var yStart = 160 - i * 16;
    var depth = 10 + Math.floor(i / 2);
    
    ctx.beginPath();
    ctx.moveTo(x, yStart);
    
    // Make roots thicker near the bottom (where they feel safest)
    for (var j = 1; j <= depth; j++) {
      var yOffset = 16 * j;
      var curve = Math.pow(j / depth, 2) * 5; // curves become more pronounced deeper down
      ctx.lineTo(x + curve, yStart - yOffset);
    }
    
    ctx.stroke();
  }
  
  // Add a second layer of roots that interweaves with the first
  for (var k = 0; k < 8; k++) {
    var x2 = 30 + Math.random() * 20;
    var yStart2 = 150 - k * 14;
    
    ctx.beginPath();
    ctx.moveTo(x2, yStart2);
    
    for (var l = 1; l <= depth; l++) {
      var yOffset2 = 14 * l;
      ctx.lineTo(x2 + (-1) * Math.pow(l / depth, 2) * 5, yStart2 - yOffset2);
    }
    
    ctx.stroke();
  }
  
  // Make roots pulse/grow slowly after being drawn
  var pulseSpeed = 0.02;
  var time = Date.now() / 1000;
  
  function animateRoots() {
    ctx.globalAlpha = 1 + Math.sin(time * pulseSpeed) * 0.1; // subtle pulsing effect
    requestAnimationFrame(animateRoots);
  }
  animateRoots();
}
