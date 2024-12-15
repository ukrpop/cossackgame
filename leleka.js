import {
  setCustomProperty,
  getCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05; // Швидкість руху лелек
const itemElems = [];
const SPAWN_CHANCE = 0.0008; // Зменшена ймовірність появи нової лелеки
const FLY_FRAME_TIME = 500; // Час переключення кадрів польоту (в мс)

export function setupItems() {
  itemElems.forEach((item) => item.remove());
  itemElems.length = 0;
}

export function updateItems(delta, speedScale) {
  // Оновлення позицій всіх лелек
  itemElems.forEach((item) => {
    incrementCustomProperty(item, "--left", delta * speedScale * SPEED * -1);

    if (getCustomProperty(item, "--left") <= -10) {
      item.remove();
      itemElems.shift();
    }
  });

  // Генерація нової лелеки (тільки один раз)
  if (Math.random() < delta * SPAWN_CHANCE && itemElems.length === 0) {
    spawnItem();
  }
}

function spawnItem() {
  // Створення контейнера для лелеки
  const item = document.createElement("div");
  item.classList.add("item");

  // Встановлюємо початкові властивості (позиції)
  setCustomProperty(item, "--left", 100); // Початкова позиція праворуч
  setCustomProperty(item, "--bottom", Math.random() * 20 + 30); // Рандомна висота, більше для "вищих" лелек

  // Додаємо перше зображення лелеки
  const img = document.createElement("img");
  img.src = "leleka1.svg"; // Перше зображення
  img.alt = "Leleka";

  // Налаштовуємо розмір лелеки
  img.style.width = "auto";
  img.style.height = "200%"; // Збільшено розмір лелеки
  img.style.zIndex = "-1"; // Розміщуємо лелеку позаду динозавра

  item.appendChild(img);
  document.querySelector("[data-world]").append(item);
  itemElems.push(item);

  // Запускаємо анімацію польоту
  animateFlight(img);
}

function animateFlight(img) {
  let isFirstFrame = true;

  // Переключення між зображеннями кожні 500 мс
  const flightInterval = setInterval(() => {
    if (!img.parentElement) {
      // Зупиняємо анімацію, якщо елемент більше не в DOM
      clearInterval(flightInterval);
      return;
    }

    img.src = isFirstFrame ? "leleka2.svg" : "leleka1.svg"; // Перемикаємо кадри
    isFirstFrame = !isFirstFrame;
  }, FLY_FRAME_TIME);
}
