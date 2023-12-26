document.addEventListener("DOMContentLoaded", function () {
  let menuBtn = document.querySelector(".menu-btn");
  let menu = document.querySelector(".menu");

  menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
  });
});

function initializeTouchEvents(containerSelector, buttonsSelector) {
  const container = document.querySelector(containerSelector);
  const buttons = document.querySelectorAll(buttonsSelector);

  let isTouchDown = false;
  let startX, scrollLeft;

  container.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      console.log("Touch Start:", touch.pageX, container.offsetLeft);
      isTouchDown = true;
      startX = touch.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    },
    { passive: false } // Set passive to false
  );

  container.addEventListener(
    "touchend",
    () => {
      console.log("Touch End");
      isTouchDown = false;
    },
    { passive: false } // Set passive to false
  );

  container.addEventListener(
    "touchmove",
    (e) => {
      if (!isTouchDown || e.touches.length > 1) return;
      e.preventDefault();
      const touch = e.touches[0];
      const x = touch.pageX - container.offsetLeft;
      const walk = (x - startX) * 3;
      container.scrollLeft = scrollLeft - walk;
    },
    { passive: false } // Set passive to false
  );

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

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeTouchEvents("#swiperContainer", ".header_container_link--button");
});
