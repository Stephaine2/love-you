// ====== CHANGE THESE ======
const BIRTHDAY = "2026-11-08T00:00:00"; // her birthday
const MESSAGE =
  "Happy birthday, my love! 🎂\n\n" +
  "Thank you for every smile, every laugh, and every moment we have shared.\n\n" +
  "On your special day, I wish you joy, peace, and everything your heart desires.\n\n" +
  "I love you, always. Yours truly.";
const BIG_TEXT = "Happy Birthday";
// ==========================

/* ---------- Starry background ---------- */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function setupStars() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.02 + 0.005,
    phase: Math.random() * Math.PI * 2,
  }));
}

function drawStars(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    const alpha = 0.5 + Math.sin(time * s.speed + s.phase) * 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

setupStars();
addEventListener("resize", setupStars);
requestAnimationFrame(drawStars);

/* ---------- Countdown ---------- */
const pad = (n) => String(n).padStart(2, "0");

function updateCountdown() {
  const diff = Math.max(0, new Date(BIRTHDAY) - new Date());
  document.getElementById("d").textContent = pad(Math.floor(diff / 86400000));
  document.getElementById("h").textContent = pad(Math.floor(diff / 3600000) % 24);
  document.getElementById("m").textContent = pad(Math.floor(diff / 60000) % 60);
  document.getElementById("s").textContent = pad(Math.floor(diff / 1000) % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---------- Typewriter ---------- */
let typingTimer;

function typeText(el, text, speed = 45) {
  clearInterval(typingTimer);
  el.textContent = "";
  let i = 0;
  typingTimer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typingTimer);
  }, speed);
}

/* ---------- Screen navigation ---------- */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo(0, 0);

  if (id === "letter") {
    const p = document.getElementById("letterText");
    p.style.whiteSpace = "pre-line";
    typeText(p, MESSAGE, 35);
  }
  if (id === "ending") typeText(document.getElementById("bigText"), BIG_TEXT, 120);
  if (id !== "video") document.getElementById("vid").pause();
}

document.querySelectorAll("[data-go]").forEach((btn) => {
  btn.addEventListener("click", () => showScreen(btn.dataset.go));
});

document.getElementById("replay").addEventListener("click", () => showScreen("intro"));