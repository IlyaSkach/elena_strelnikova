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

  // Модальное окно и карусель для "Я в СМИ"
  const mediaBtn = document.querySelector(".media-button");
  const mediaModal = document.getElementById("mediaModal");
  const closeModal = document.querySelector(".close-modal");
  const carouselSlides = document.querySelector(".carousel-slides");
  const carouselDots = document.querySelector(".carousel-dots");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  // Количество слайдов в карусели (от slide_1.JPG до slide_14.JPG)
  const totalSlides = 11;
  let currentSlide = 0;

  // Функция для открытия модального окна
  function openModal() {
    mediaModal.classList.add("show");
    document.body.style.overflow = "hidden"; // Предотвращаем прокрутку страницы при открытом модальном окне
  }

  // Функция для закрытия модального окна
  function closeModalFunc() {
    mediaModal.classList.remove("show");
    setTimeout(() => {
      mediaModal.style.display = "none";
      document.body.style.overflow = ""; // Возвращаем возможность прокрутки страницы
    }, 300);
  }

  // Функция для создания слайдов и точек для навигации
  function createSlides() {
    carouselSlides.innerHTML = "";
    carouselDots.innerHTML = "";

    for (let i = 1; i <= totalSlides; i++) {
      // Создаем слайд
      const slide = document.createElement("div");
      slide.className = "carousel-slide";

      const img = document.createElement("img");
      img.src = `assets/Images/slide_${i}.JPG`;
      img.alt = `Слайд ${i}`;

      slide.appendChild(img);
      carouselSlides.appendChild(slide);

      // Создаем точку для навигации
      const dot = document.createElement("span");
      dot.className = "carousel-dot";
      if (i === 1) dot.classList.add("active");
      dot.dataset.slide = i - 1;

      dot.addEventListener("click", function () {
        goToSlide(parseInt(this.dataset.slide));
      });

      carouselDots.appendChild(dot);
    }
  }

  // Функция для перехода к определенному слайду
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
  }

  // Функция для обновления отображения карусели
  function updateCarousel() {
    // Обновляем позицию слайдов
    carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Обновляем активную точку
    document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Функция для перехода к следующему слайду
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  // Функция для перехода к предыдущему слайду
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Проверяем, есть ли необходимые элементы на странице
  if (mediaBtn && mediaModal && closeModal) {
    // Инициализируем слайды при первом открытии
    let slidesCreated = false;

    // Обработчик для открытия модального окна
    mediaBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (!slidesCreated) {
        createSlides();
        slidesCreated = true;
      }

      mediaModal.style.display = "block";
      setTimeout(openModal, 10); // Небольшая задержка для анимации
    });

    // Обработчик для закрытия модального окна по клику на крестик
    closeModal.addEventListener("click", closeModalFunc);

    // Обработчик для закрытия модального окна по клику вне контента
    mediaModal.addEventListener("click", function (e) {
      if (e.target === mediaModal) {
        closeModalFunc();
      }
    });

    // Обработчики для кнопок навигации по слайдам
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", prevSlide);
      nextButton.addEventListener("click", nextSlide);
    }

    // Добавляем обработку клавиш для навигации
    document.addEventListener("keydown", function (e) {
      if (!mediaModal.classList.contains("show")) return;

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Escape") {
        closeModalFunc();
      }
    });
  }

  // Инициализация слайдера отзывов для мобильных устройств
  let testimonialSliderInitialized = false;

  function checkAndInitTestimonialSlider() {
    if (window.innerWidth <= 768 && !testimonialSliderInitialized) {
      initTestimonialSlider();
      testimonialSliderInitialized = true;
    }
  }

  // Вызываем функцию при загрузке
  checkAndInitTestimonialSlider();

  // И при изменении размера окна
  window.addEventListener("resize", checkAndInitTestimonialSlider);

  function initTestimonialSlider() {
    const slider = document.querySelector(".testimonials-grid");
    const slides = document.querySelectorAll(".testimonial-item");
    const prevBtn = document.querySelector(".testimonial-prev-btn");
    const nextBtn = document.querySelector(".testimonial-next-btn");
    const dotsContainer = document.querySelector(".testimonial-mobile-dots");

    if (!slider || !slides.length) return;

    // Добавляем класс для мобильного слайдера
    slider.classList.add("mobile-slider");

    // Сбрасываем активные слайды
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Добавляем точки для каждого слайда
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("testimonial-mobile-dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Показываем первый слайд при загрузке
    let currentSlide = 0;
    slides[currentSlide].classList.add("active");

    // Обработчики для кнопок
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", showPrevSlide);
      nextBtn.addEventListener("click", showNextSlide);
    }

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

    function goToSlide(index) {
      slides[currentSlide].classList.remove("active");
      document
        .querySelectorAll(".testimonial-mobile-dot")
        [currentSlide].classList.remove("active");

      currentSlide = index;

      slides[currentSlide].classList.add("active");
      document
        .querySelectorAll(".testimonial-mobile-dot")
        [currentSlide].classList.add("active");
    }

    function showNextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function showPrevSlide() {
      goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }
  }
});
