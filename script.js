document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded сработал");
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Инициализация
  if (mobileMenu) {
    mobileMenu.style.display = "none";
  }

  console.log("burgerMenu элемент:", burgerMenu);
  console.log("mobileMenu элемент:", mobileMenu);

  burgerMenu.addEventListener("click", function () {
    console.log("Клик по бургер-меню");
    this.classList.toggle("active");
    if (mobileMenu.style.display === "block") {
      console.log("Скрываем мобильное меню");
      mobileMenu.style.display = "none";
    } else {
      console.log("Показываем мобильное меню");
      mobileMenu.style.display = "block";
    }
  });

  // Видео функционал
  const playButton = document.querySelector(".play-button");
  const videoPlaceholder = document.querySelector(".video-placeholder");
  const promoVideo = document.getElementById("promo-video");

  if (playButton && videoPlaceholder && promoVideo) {
    playButton.addEventListener("click", function () {
      videoPlaceholder.style.display = "none";
      promoVideo.style.display = "block";
      promoVideo.play();
    });
  }

  // Инициализация слайдера отзывов для мобильных устройств
  if (window.innerWidth <= 640) {
    initTestimonialSlider();
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth <= 640) {
      initTestimonialSlider();
    }
  });

  function initTestimonialSlider() {
    const slider = document.querySelector(".testimonials-grid");
    const slides = document.querySelectorAll(".testimonial-item");

    if (!slider || !slides.length) return;

    // Показываем первый слайд при загрузке
    let currentSlide = 0;
    slides[currentSlide].classList.add("active");

    // Обработка свайпов
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    slider.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      // Определяем направление свайпа
      const swipeThreshold = 50; // Минимальное расстояние для засчитывания свайпа

      if (touchStartX - touchEndX > swipeThreshold) {
        // Свайп влево - следующий слайд
        showNextSlide();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Свайп вправо - предыдущий слайд
        showPrevSlide();
      }
    }

    function showNextSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }

    function showPrevSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
    }
  }
});
