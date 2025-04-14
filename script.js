document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  burgerMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none";
    } else {
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

  // Слайдер отзывов для мобильных устройств
  if (window.innerWidth <= 640) {
    initTestimonialSlider();
  }

  // Переинициализация слайдера при изменении размера окна
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 640) {
      initTestimonialSlider();
    }
  });

  function initTestimonialSlider() {
    const slider = document.querySelector(".testimonials-grid");

    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Скорость прокрутки
      slider.scrollLeft = scrollLeft - walk;
    });

    // Для тачскрина
    slider.addEventListener(
      "touchstart",
      (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      },
      { passive: true }
    );

    slider.addEventListener("touchend", () => {
      isDown = false;
    });

    slider.addEventListener(
      "touchmove",
      (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      },
      { passive: true }
    );
  }
});
