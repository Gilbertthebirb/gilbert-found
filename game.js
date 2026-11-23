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
    if (Math.random() > 0.7) {
      drawRoot();
    }
  }, 200);
}

function drawRoot() {
  var canvas = document.createElement('canvas');
  canvas.width = 60;
  canvas.height = 150;
  canvas.style.cssText = 'position: fixed; left: 50%; top: 30px; transform: translateX(-50%); pointer-events: none; background: #2a2a32; border-radius: 4px;';
  document.body.appendChild(canvas);
  
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#6b7c85';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 150);
  for (var i = 0; i < 10; i++) {
    var xMove = Math.random() * 8 - 4;
    ctx.lineTo(30 + xMove, 150 - (i + 1) * 15);
  }
  ctx.stroke();
  
  setTimeout(function() {
    canvas.remove();
  }, 2500);
}
