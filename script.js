import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";
import { setupItems, updateItems } from "./leleka.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 40;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });
document.addEventListener("touchstart", handleStart, { once: true });

let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function updateSpeedScale(delta) {
  updateItems(delta, speedScale);

  speedScale += delta * SPEED_SCALE_INCREASE;
}

let bestScore = 0;

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = `Score: ${Math.floor(score)} | Best: ${Math.floor(
    bestScore
  )}`;
}

function handleStart() {
  lastTime = null;
  speedScale = 1;
  if (score > bestScore) bestScore = score;
  score = 0;
  setupItems();
  setupGround();
  setupDino();
  setupCactus();
  startScreenElem.classList.add("hide");

  // Remove touch listener to prevent multiple triggers
  document.removeEventListener("touchstart", handleStart);
  document.removeEventListener("keydown", handleStart);

  window.requestAnimationFrame(update);
}
function handleLose() {
  setDinoLose(); // Assuming this function handles the game-over state of the dino
  startScreenElem.textContent = `Game Over`;
  startScreenElem.classList.remove("hide");
  startScreenElem.classList.add("game-over");

  // Ensure the "Game Over" screen is centered
  startScreenElem.style.top = "50%";
  startScreenElem.style.left = "50%";
  startScreenElem.style.transform = "translate(-50%, -50%)";
  startScreenElem.style.fontSize = "7vw"; // Make sure the font size is scalable

  // Reattach the event listener after the game over
  document.addEventListener("keydown", handleStart, { once: true });
  document.addEventListener("touchstart", handleStart, { once: true });
}

function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
