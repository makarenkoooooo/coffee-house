document.addEventListener("DOMContentLoaded", function () {
  let burger = this.getElementById("burger");
  burger.addEventListener("click", function () {
    burger.classList.toggle("open");
  });
});

// функционал бургер меню

burger.addEventListener("click", function toggleBlock() {
  const block = document.getElementById("menu");
  const currentRight = parseInt(getComputedStyle(block).right);

  if (currentRight < 0) {
    block.style.right = "0"; // показать блок
  } else {
    block.style.right = "-2000px"; // скрыть блок
  }
});

menu.addEventListener("click", function hideBlock() {
  const block = document.getElementById("menu");
  block.style.right = "-1000px";
  burger.classList.remove("open");
});

// слайдер

let slideIndex = 0;
let slides = document.querySelector(".slides");
let indicators = document.querySelectorAll(".indicator");

function showSlide(n) {
  const slideWidth = document.querySelector(".slide").offsetWidth;
  slideIndex = (n + slides.children.length) % slides.children.length;
  slides.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
  indicators.forEach((indicator, index) => {
    if (index === slideIndex) {
      indicator.style.backgroundColor = "#665F55"; // Цвет индикатора для текущего слайда
    } else {
      indicator.style.backgroundColor = "#C1B6AD"; // Сброс цвета остальных индикаторов
    }
  });
}

function prevSlide() {
  showSlide((slideIndex -= 1));
}

function nextSlide() {
  showSlide((slideIndex += 1));
}

showSlide(slideIndex);

// Автоматическое переключение слайдов
let interval = setInterval(nextSlide, 5000);

// Приостановка автоматического переключения при наведении
slides.addEventListener("mouseover", () => clearInterval(interval));

// Возобновление автоматического переключения при уходе мыши
slides.addEventListener(
  "mouseout",
  () => (interval = setInterval(nextSlide, 5000))
);
