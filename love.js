const gameArea = document.getElementById("gameArea");
const countEl = document.getElementById("count");
const popup = document.getElementById("popup");
const nameMsg = document.getElementById("nameMsg");
const bgMusic = document.getElementById("bgMusic");

let count = 0;
let gameInterval;
let musicOn = false;

const specialName = "My Love ❤️"; // change this

function toggleMusic() {
  if (musicOn) {
    bgMusic.pause();
  } else {
    bgMusic.play();
  }
  musicOn = !musicOn;
}

/* Create hearts */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 90 + "%";

  heart.addEventListener("click", () => catchHeart(heart));

  gameArea.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

/* Catch logic */
function catchHeart(heart) {
  heart.remove();
  count++;
  countEl.textContent = count;

  if (count >= 10) winGame();
}

/* Start game */
function startGame() {
  count = 0;
  countEl.textContent = 0;
  popup.style.display = "none";
  clearInterval(gameInterval);
  gameInterval = setInterval(createHeart, 600);
}

/* Win */
function winGame() {
  clearInterval(gameInterval);
  popup.style.display = "flex";
  nameMsg.textContent = `For ${specialName}`;
  startConfetti();
}

/* Restart */
function restartGame() {
  stopConfetti();
  startGame();
}

/* Swipe detection */
gameArea.addEventListener("touchmove", e => {
  const t = e.touches[0];
  detectSwipe(t.clientX, t.clientY);
});

function detectSwipe(x, y) {
  document.querySelectorAll(".heart").forEach(heart => {
    const r = heart.getBoundingClientRect();
    if (x > r.left && x < r.right && y > r.top && y < r.bottom) {
      catchHeart(heart);
    }
  });
}

/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confetti = [];
let confettiInterval;

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function startConfetti() {
  confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 4 + 2
  }));

  confettiInterval = setInterval(drawConfetti, 20);
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.d;
    if (p.y > canvas.height) p.y = -10;
  });
}

function stopConfetti() {
  clearInterval(confettiInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

startGame();

