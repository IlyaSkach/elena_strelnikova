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

  // Анимация появления фотографии при скролле
  const servicesImage = document.querySelector(".services-image img");

  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.7 &&
      rect.bottom >= 0
    );
  }

  function handleScroll() {
    if (servicesImage && isElementInViewport(servicesImage)) {
      servicesImage.classList.add("fade-in");
      // Удаляем обработчик после появления, чтобы не проверять постоянно
      window.removeEventListener("scroll", handleScroll);
    }
  }

  // Проверяем видимость при загрузке и скролле
  if (servicesImage) {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);
    setTimeout(handleScroll, 500);
  }

  // Анимация для фотографии в секции "Обо мне"
  const aboutPhotoImg = document.querySelector(".about-photo-img");

  function isAboutPhotoVisible() {
    if (!aboutPhotoImg) return false;
    const rect = aboutPhotoImg.getBoundingClientRect();
    // Начинаем анимацию, когда верхняя часть элемента находится в нижней части экрана
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
  }

  function handleAboutPhotoScroll() {
    if (aboutPhotoImg && isAboutPhotoVisible()) {
      aboutPhotoImg.classList.add("animate");
      // Удаляем обработчик после применения анимации
      window.removeEventListener("scroll", handleAboutPhotoScroll);
    }
  }

  if (aboutPhotoImg) {
    window.addEventListener("scroll", handleAboutPhotoScroll);
    window.addEventListener("load", handleAboutPhotoScroll);
    setTimeout(handleAboutPhotoScroll, 500);
  }

  // Слайдер сертификатов
  function initCertificateSlider() {
    const sliderWrapper = document.querySelector(".certificate-slider-wrapper");
    const slides = document.querySelectorAll(".certificate-slide");
    const dotsContainer = document.querySelector(".certificate-slider-dots");
    const prevBtn = document.querySelector(".certificate-slider-prev");
    const nextBtn = document.querySelector(".certificate-slider-next");

    if (
      !sliderWrapper ||
      !slides.length ||
      !dotsContainer ||
      !prevBtn ||
      !nextBtn
    )
      return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Создаем точки навигации
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("certificate-slider-dot");
      dot.dataset.index = index;
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Показываем первый слайд
    slides[0].classList.add("active");

    // Функция для переключения на указанный слайд
    function goToSlide(index) {
      slides[currentSlide].classList.remove("active");
      document
        .querySelector(`.certificate-slider-dot[data-index="${currentSlide}"]`)
        .classList.remove("active");

      currentSlide = index;

      slides[currentSlide].classList.add("active");
      document
        .querySelector(`.certificate-slider-dot[data-index="${currentSlide}"]`)
        .classList.add("active");
    }

    // Переключение на предыдущий слайд
    function prevSlide() {
      const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(newIndex);
    }

    // Переключение на следующий слайд
    function nextSlide() {
      const newIndex = (currentSlide + 1) % totalSlides;
      goToSlide(newIndex);
    }

    // Обработчики кнопок
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Автоматическое переключение слайдов
    let autoplayInterval;

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Останавливаем автопрокрутку при взаимодействии
    sliderWrapper.addEventListener("mouseenter", stopAutoplay);
    sliderWrapper.addEventListener("touchstart", stopAutoplay, {
      passive: true,
    });

    // Возобновляем автопрокрутку
    sliderWrapper.addEventListener("mouseleave", startAutoplay);
    sliderWrapper.addEventListener("touchend", startAutoplay);

    // Запускаем автопрокрутку
    startAutoplay();

    // Обработка свайпов для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;

    sliderWrapper.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    sliderWrapper.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const minSwipeDistance = 50;
      if (touchStartX - touchEndX > minSwipeDistance) {
        nextSlide(); // Свайп влево - следующий слайд
      } else if (touchEndX - touchStartX > minSwipeDistance) {
        prevSlide(); // Свайп вправо - предыдущий слайд
      }
    }
  }

  // Инициализация слайдера сертификатов
  initCertificateSlider();

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

  // Количество слайдов в карусели (исключен slide_4.JPG)
  const totalSlides = 10;
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

    // Массив номеров слайдов, которые нужно показать
    const slidesToShow = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11];
    let slideIndex = 0;

    for (const slideNumber of slidesToShow) {
      // Создаем слайд
      const slide = document.createElement("div");
      slide.className = "carousel-slide";

      const img = document.createElement("img");
      img.src = `assets/Images/slide_${slideNumber}.JPG`;
      img.alt = `Слайд ${slideNumber}`;

      slide.appendChild(img);
      carouselSlides.appendChild(slide);

      // Создаем точку для навигации
      const dot = document.createElement("span");
      dot.className = "carousel-dot";
      if (slideIndex === 0) dot.classList.add("active");
      dot.dataset.slide = slideIndex;

      dot.addEventListener("click", function () {
        goToSlide(parseInt(this.dataset.slide));
      });

      carouselDots.appendChild(dot);
      slideIndex++;
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
      if (index === 1) dot.classList.add("active"); // Делаем активным второй отзыв (индекс 1)
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Показываем второй отзыв (индекс 1) при загрузке
    let currentSlide = 1; // Начинаем со второго отзыва
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

  // Анимация для всех стрелок на странице
  const arrows = document.querySelectorAll(
    'svg[width][height][viewBox*="441.004 13.3218"]'
  );

  function isElementVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  function handleArrowsScroll() {
    arrows.forEach((arrow) => {
      if (isElementVisible(arrow) && !arrow.classList.contains("animate")) {
        console.log("Стрелка стала видимой, добавляем анимацию");
        arrow.classList.add("animate");
      }
    });

    // Если все стрелки получили анимацию, удаляем обработчик
    const allAnimated = Array.from(arrows).every((arrow) =>
      arrow.classList.contains("animate")
    );

    if (allAnimated) {
      window.removeEventListener("scroll", handleArrowsScroll);
    }
  }

  if (arrows.length > 0) {
    console.log(
      `Найдено ${arrows.length} стрелок на странице, установлен обработчик скролла`
    );
    window.addEventListener("scroll", handleArrowsScroll);
    window.addEventListener("load", handleArrowsScroll);
    setTimeout(handleArrowsScroll, 500);
  }
});
