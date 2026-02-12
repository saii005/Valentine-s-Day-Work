const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");

let score = 0;
let basketX = window.innerWidth / 2;

// Move basket with mouse
document.addEventListener("mousemove", (e) => {
  basketX = e.clientX;
  basket.style.left = basketX + "px";
});

// Move basket with keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") basketX -= 30;
  if (e.key === "ArrowRight") basketX += 30;
  basket.style.left = basketX + "px";
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = "0px";

  gameArea.appendChild(heart);

  let fallInterval = setInterval(() => {
    let heartTop = parseInt(window.getComputedStyle(heart).top);
    heart.style.top = heartTop + 5 + "px";

    let basketRect = basket.getBoundingClientRect();
    let heartRect = heart.getBoundingClientRect();

    // Collision detection
    if (
      heartRect.bottom >= basketRect.top &&
      heartRect.left >= basketRect.left &&
      heartRect.right <= basketRect.right
    ) {
      score++;
      scoreDisplay.textContent = score;
      heart.remove();
      clearInterval(fallInterval);

      if (score >= 10) {
        winGame();
      }
    }

    // Remove if falls off screen
    if (heartTop > window.innerHeight) {
      heart.remove();
      clearInterval(fallInterval);
    }

  }, 20);
}

function winGame() {
  setTimeout(() => {
    window.location.href = "suprise.html";
  }, 1000);
}


// Create heart every 800ms
setInterval(createHeart, 800);
