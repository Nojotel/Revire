document.addEventListener("DOMContentLoaded", function () {
  function initializeSlider(sliderSelector, slidesSelector, leftButtonSelector, rightButtonSelector, slidesToShow) {
    const slider = document.querySelector(sliderSelector);
    const slides = Array.from(slider.querySelectorAll(slidesSelector));
    const totalSlides = slides.length;
    let currentSlide = 0;

    const leftButton = document.querySelector(leftButtonSelector);
    const rightButton = document.querySelector(rightButtonSelector);

    const showSlides = () => {
      slides.forEach((slide, index) => {
        if (index >= currentSlide && index < currentSlide + slidesToShow) {
          slide.style.display = "";
        } else {
          slide.style.display = "none";
        }
      });

      leftButton.style.opacity = currentSlide === 0 ? 0 : 1;
      rightButton.style.opacity = currentSlide >= totalSlides - slidesToShow ? 0 : 1;

      leftButton.style.cursor = currentSlide === 0 ? "default" : "pointer";
      rightButton.style.cursor = currentSlide >= totalSlides - slidesToShow ? "default" : "pointer";
    };

    const nextSlide = () => {
      if (currentSlide < totalSlides - slidesToShow) {
        currentSlide++;
      }
      showSlides();
    };

    const prevSlide = () => {
      if (currentSlide > 0) {
        currentSlide--;
      }
      showSlides();
    };

    leftButton.addEventListener("click", prevSlide);
    rightButton.addEventListener("click", nextSlide);

    const onResize = () => {
      showSlides();
    };

    window.addEventListener("resize", onResize);

    showSlides();
  }

  initializeSlider(".first_screen-main_slider", ".three_slider-product_container", ".slider__btn--left", ".slider__btn--right", 2);
  initializeSlider(".section_two_container--slider", ".two_slider-product_container", ".slider_two__btn--left", ".slider_two__btn--right", 4);
  initializeSlider(".section_three_container--slider", ".three_slider-product_container", ".slider_three__btn--left", ".slider_three__btn--right", 4);

  function initializeMouseEvents(containerSelector, buttonsSelector) {
    const container = document.querySelector(containerSelector);
    const buttons = document.querySelectorAll(buttonsSelector);

    let isMouseDown = false;
    let startX, scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    container.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 3;
      container.scrollLeft = scrollLeft - walk;
    });

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "var(--pink)";
        button.style.color = "white";
      });

      button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "var(--grey)";
        button.style.color = "var(--text-black)";
      });
    });
  }

  initializeMouseEvents("#swiperContainer", ".swiper_box");
});
