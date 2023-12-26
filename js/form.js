document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const telInput = document.getElementById("tel");

  function addErrorMessage(inputElement, errorMessage) {
    const errorMessageElement = document.createElement("span");
    errorMessageElement.className = "error-message";
    errorMessageElement.textContent = errorMessage;

    inputElement.parentNode.insertBefore(errorMessageElement, inputElement.nextSibling);
  }

  function removeErrorMessage(inputElement) {
    const errorMessageElement = inputElement.parentNode.querySelector(".error-message");
    if (errorMessageElement) {
      errorMessageElement.remove();
    }
  }

  function handleFocus(event) {
    const inputElement = event.target;
    removeErrorMessage(inputElement);
  }

  function handleBlur(event) {
    const inputElement = event.target;
    if (!inputElement.value.trim()) {
      addErrorMessage(inputElement, "Поле должно быть заполнено");
    }
  }

  function maskTelInput() {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) : a;
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i);
      }
      let reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return "\\d{1," + a.length + "}";
        })
        .replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    telInput.addEventListener("input", mask, false);
    telInput.addEventListener("focus", mask, false);
    telInput.addEventListener("blur", mask, false);
    telInput.addEventListener("keydown", mask, false);
  }

  function maskNameInput(event) {
    if (/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  nameInput.addEventListener("focus", handleFocus);
  nameInput.addEventListener("blur", handleBlur);
  nameInput.addEventListener("keydown", maskNameInput);

  telInput.addEventListener("focus", function (event) {
    handleFocus(event);
    maskTelInput();
  });

  telInput.addEventListener("blur", function (event) {
    handleBlur(event);
    maskTelInput();
  });

  const formSendButton = document.getElementById("formSend");
  formSendButton.addEventListener("click", openModal);

  window.addEventListener("mousedown", function (event) {
    const modal = document.getElementById("modal");
    if (modal.style.display === "block" && !modal.contains(event.target)) {
      closeModal();
    }
  });
});

function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("tel").value = "";

    removeErrorMessage(document.getElementById("name"));
    removeErrorMessage(document.getElementById("tel"));
  }
}
