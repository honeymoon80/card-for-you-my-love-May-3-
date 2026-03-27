// ======================== MÚSICA ========================
const musicBtn = document.getElementById('musicBtn');
const audio = document.getElementById('backgroundMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play().catch(() => {});
    musicBtn.textContent = '⏸ Pausar música';
  } else {
    audio.pause();
    musicBtn.textContent = '♪ Reproducir música';
  }
  isPlaying = !isPlaying;
});

// ======================== PARTÍCULAS ========================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 22 + 12;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -8 - 3;
    this.color = ['#ff69b4', '#ff1493', '#db2777', '#f472b6', '#c026d3', '#e879f9'][Math.floor(Math.random() * 6)];
    this.life = 75;
    this.text = ['❤️', '💖', '💕', '💗', '💘'][Math.floor(Math.random() * 5)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.12;
    this.life--;
    this.size *= 0.975;
  }
  draw() {
    ctx.globalAlpha = this.life / 75;
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

function createParticles(x, y, amount = 28) {
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(x, y));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0 || particles[i].size <= 1) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Click o tap para partículas
document.addEventListener('click', (e) => {
  createParticles(e.clientX, e.clientY, 28);
});

document.addEventListener('touchstart', (e) => {
  createParticles(e.touches[0].clientX, e.touches[0].clientY, 28);
});

// Corazones flotantes de fondo
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 9 + 11) + 's';
  heart.style.fontSize = (Math.random() * 22 + 24) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 22000);
}

setInterval(createFloatingHeart, 280);
for (let i = 0; i < 12; i++) {
  setTimeout(createFloatingHeart, i * 150);
}

// Responsive
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
