import {
  setCustomProperty,
  getCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const CLOUD_SPEED = 0.05; // Speed of cloud movement
const cloudElems = [];
const SPAWN_INTERVAL = 600; // Time to spawn a new cloud (in ms)
const FLIGHT_FRAME_TIME = 1000; // Time to switch cloud images (in ms)

export function setupClouds() {
  cloudElems.forEach((cloud) => cloud.remove());
  cloudElems.length = 0;
}

export function updateClouds(delta, speedScale) {
  // Update positions of all clouds
  cloudElems.forEach((cloud) => {
    incrementCustomProperty(
      cloud,
      "--left",
      delta * speedScale * CLOUD_SPEED * -1
    );

    // Remove cloud if it goes out of the screen on the left
    if (getCustomProperty(cloud, "--left") <= -100) {
      cloud.remove();
      cloudElems.shift();
    }
  });

  // Generate a new cloud at regular intervals (every 0.6 second)
  if (
    cloudElems.length === 0 ||
    cloudElems[cloudElems.length - 1].dataset.spawnTime <= 0
  ) {
    spawnCloud();
  }

  // Update spawn time for the next cloud
  cloudElems.forEach((cloud) => {
    cloud.dataset.spawnTime -= delta;
  });
}

function spawnCloud() {
  // Create container for the cloud
  const cloud = document.createElement("div");
  cloud.classList.add("cloud");
  cloud.dataset.spawnTime = SPAWN_INTERVAL;

  // Set initial position (right side of the screen)
  setCustomProperty(cloud, "--left", 100); // Start from the right side of the screen
  setCustomProperty(cloud, "--bottom", Math.random() * 20 + 30); // Random height between 30 and 50% of screen height

  // Add the cloud image
  const img = document.createElement("img");
  img.src = "cloud.svg"; // Cloud image
  img.alt = "Cloud";

  // Set size of the cloud
  img.style.width = "auto";
  img.style.height = "100%"; // Adjust size to make it look better in the game
  img.style.zIndex = "-1"; // Position cloud behind other elements

  cloud.appendChild(img);
  document.querySelector("[data-world]").append(cloud);
  cloudElems.push(cloud);

  // Start the flight animation (switching image every 1 second)
  animateCloudFlight(img);
}

function animateCloudFlight(img) {
  // If you have multiple cloud images, you can alternate them here
  let isFirstFrame = true;

  // Switch between cloud images every 1000ms (1 second)
  const flightInterval = setInterval(() => {
    if (!img.parentElement) {
      // Stop the animation if the cloud is removed
      clearInterval(flightInterval);
      return;
    }

    // If you have different cloud images, switch them here
    img.src = isFirstFrame ? "cloud.svg" : "cloud.svg"; // Same image for simplicity
    isFirstFrame = !isFirstFrame;
  }, FLIGHT_FRAME_TIME);
}
