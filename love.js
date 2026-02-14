const gameArea = document.getElementById("gameArea");
const countEl = document.getElementById("count");
const popup = document.getElementById("popup");

let count = 0;
let gameInterval;

/* Create floating hearts */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 90 + "%";

  heart.addEventListener("click", () => catchHeart(heart));

  gameArea.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

/* Catch heart */
function catchHeart(heart) {
  if (!heart) return;

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
}

/* Restart */
function restartGame() {
  startGame();
}

/* Swipe support (mobile) */
gameArea.addEventListener("touchmove", e => {
  const t = e.touches[0];
  detectSwipe(t.clientX, t.clientY);
});

function detectSwipe(x, y) {
  document.querySelectorAll(".heart").forEach(heart => {
    const r = heart.getBoundingClientRect();
    if (
      x > r.left &&
      x < r.right &&
      y > r.top &&
      y < r.bottom
    ) {
      catchHeart(heart);
    }
  });
}

startGame();
