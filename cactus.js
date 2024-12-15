import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 800;
const CACTUS_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextCactusTime;
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN;
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    cactus.remove();
  });
}

export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach((cactus) => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);

    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove();
    }
  });

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) /
      speedScale;
  }

  nextCactusTime -= delta;
}

export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map((cactus) => {
    return cactus.getBoundingClientRect();
  });
}

function createCactus() {
  const cactus = document.createElement("img");
  cactus.dataset.cactus = true;
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldElem.append(cactus);

  // Set initial cactus image
  cactus.src = "fire1.svg"; // Start with fire1.svg

  // Change cactus image every 250 ms, 4 times per second
  let imageIndex = 0;
  const cactusImages = ["fire1.svg", "fire2.svg", "fire3.svg", "fire4.svg"];

  const cactusImageInterval = setInterval(() => {
    cactus.src = cactusImages[imageIndex];
    imageIndex = (imageIndex + 1) % cactusImages.length; // Cycle through the images
  }, 250); // Change image every 250ms

  // Stop the image change when cactus moves off-screen
  setTimeout(() => {
    clearInterval(cactusImageInterval);
  }, 4000); // Stop after 4 seconds (1 second for each image)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
