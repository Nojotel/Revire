document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  let storedProducts = JSON.parse(localStorage.getItem("products")) || {};

  const basketButtons = document.querySelectorAll(".slider-product_container-button");
  const basketNumber = document.querySelector(".button_basket--number");
  const basketContainerNumber = document.querySelector(".basket_container--number");
  const basketContainer = document.querySelector(".basket_container");
  const basketButton = document.getElementById("basketButton");
  const basketButtonClicks = document.querySelectorAll(".basket_button--click");
  const basketMainContainer = document.querySelector(".basket_main");
  const totalValueElement = document.querySelector(".basket_container--total_container--total_value");

  let numericPrice = 0;

  function handleButtonClick(event) {
    const button = event.currentTarget;
    const productId = button.id;

    const productData = storedProducts[productId] || {};

    const productContainer = document.querySelector(`.three_slider-product_container.slide--${productId}`);
    if (productContainer) {
      productData.imageUrl = productContainer.querySelector(".slider-product_container_img").src;
      productData.text = productContainer.querySelector(".slider-product_container_text").textContent;

      const descriptionElement = productContainer.querySelector(".slider-product_container_description");
      productData.description = descriptionElement ? descriptionElement.textContent.trim() : "";

      productData.price = productContainer.querySelector(".slider-product_container_price").textContent;
      productData.discountedPrice = productContainer.querySelector(".slider-product_container_priceDis").textContent;
    }

    const isActive = !productData.active;
    button.classList.toggle("active", isActive);
    productData.active = isActive;

    storedProducts[productId] = productData;
    localStorage.setItem("products", JSON.stringify(storedProducts));

    updateProductBasket();
    updateBasketCount();
  }

  function hideBasketContainer() {
    basketContainer.style.display = "none";
  }

  function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function getRandomPaint() {
    const baseText = "Flugger 900 FL ";
    const randomNumbers = Math.floor(Math.random() * 9000) + 1000;
    const randomColor = getRandomColor();
    return `${baseText}${randomNumbers} (${randomColor})`;
  }

  function createProductContainer(productId, productData) {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product_container--basket");

    const productImg = document.createElement("img");
    productImg.classList.add("product_container_img--basket");
    productImg.src = productData.imageUrl;
    productImg.alt = "Товар";

    const productText = document.createElement("div");
    productText.classList.add("product_container_text--basket");
    productText.textContent = productData.text;

    const productDescription = document.createElement("div");
    productDescription.classList.add("product_container_description--basket");
    productDescription.textContent = productData.description;

    const productPrice = document.createElement("span");
    productPrice.classList.add("product_container_price--basket");
    productPrice.textContent = productData.price;

    const productPriceDis = document.createElement("span");
    productPriceDis.classList.add("product_container_priceDis--basket");
    productPriceDis.textContent = productData.discountedPrice;

    const productColor = document.createElement("div");
    productColor.classList.add("product_container_color--basket");
    productColor.textContent = "Полуматовый";

    const colorSpan = document.createElement("span");
    colorSpan.style.backgroundColor = getRandomColor();

    productColor.appendChild(colorSpan);

    productColor.appendChild(colorSpan);

    const productPaint = document.createElement("div");
    productPaint.classList.add("product_container_paint--basket");
    productPaint.textContent = getRandomPaint();

    const productButtonDel = document.createElement("button");
    productButtonDel.classList.add("product_container-button--del");
    productButtonDel.id = productId;

    productButtonDel.addEventListener("click", () => {
      delete storedProducts[productId];
      localStorage.setItem("products", JSON.stringify(storedProducts));
      updateProductBasket();
      updateBasketCount();
    });

    productContainer.appendChild(productImg);
    productContainer.appendChild(productText);
    productContainer.appendChild(productDescription);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(productPriceDis);
    productContainer.appendChild(productColor);
    productContainer.appendChild(productPaint);
    productContainer.appendChild(productButtonDel);

    return productContainer;
  }

  function updateProductBasket() {
    basketMainContainer.innerHTML = "";

    let totalValue = 0;
    let activeButtonsCount = 0;

    Object.entries(storedProducts).forEach(([productId, productData]) => {
      if (productData.active) {
        const productContainer = createProductContainer(productId, productData);
        basketMainContainer.appendChild(productContainer);

        numericPrice = parseFloat(productData.price.replace(/[^\d.]/g, ""));
        totalValue += numericPrice;
        activeButtonsCount++;
      }
    });

    const formattedTotalValue = `${totalValue.toLocaleString()} ₽`;
    totalValueElement.textContent = formattedTotalValue;

    basketNumber.textContent = activeButtonsCount;
    basketContainerNumber.textContent = activeButtonsCount;

    basketMainContainer.style.overflowY = activeButtonsCount > 3 ? "auto" : "hidden";

    console.log("Updated basket count:", activeButtonsCount);
  }

  function updateBasketCount() {
    const activeButtons = document.querySelectorAll(".slider-product_container-button.active");
    basketNumber.textContent = activeButtons.length;
    basketContainerNumber.textContent = activeButtons.length;

    basketMainContainer.style.overflowY = activeButtons.length > 3 ? "auto" : "hidden";

    console.log("Updated basket count:", activeButtons.length);
  }

  function restoreProductData() {
    Object.entries(storedProducts).forEach(([productId, productData]) => {
      const button = document.getElementById(productId);
      if (button) {
        button.classList.toggle("active", productData.active);
      }
    });

    updateProductBasket();
    updateBasketCount();
  }

  restoreProductData();

  function toggleBasketContainer() {
    const currentDisplayStyle = getComputedStyle(basketContainer).display;

    if (currentDisplayStyle === "none") {
      basketContainer.style.display = "block";
    } else {
      basketContainer.style.display = "none";
    }
  }

  function handleDeleteButtonClick(event) {
    const button = event.currentTarget;
    const productId = button.id;

    const productData = storedProducts[productId];
    if (productData && productData.active) {
      numericPrice = parseFloat(productData.price.replace(/[^\d.]/g, ""));
      delete storedProducts[productId];
      localStorage.setItem("products", JSON.stringify(storedProducts));

      restoreProductData();

      updateBasketCount();

      const correspondingButton = document.getElementById(productId);
      if (correspondingButton) {
        correspondingButton.classList.remove("active");
      }
    }
  }

  const deleteButtons = document.querySelectorAll(".product_container-button--del");
  Array.from(deleteButtons).forEach(function (deleteButton) {
    deleteButton.addEventListener("click", handleDeleteButtonClick);
  });

  Array.from(basketButtons).forEach(function (basketButton) {
    basketButton.addEventListener("click", handleButtonClick);
  });

  Array.from(basketButtonClicks).forEach(function (basketButtonClick) {
    basketButtonClick.addEventListener("click", hideBasketContainer);
  });

  basketButton.addEventListener("click", toggleBasketContainer);

  document.addEventListener("click", function (event) {
    console.log("Document click", event.target);
  });
});
