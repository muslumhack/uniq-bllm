
document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector("input[name='q']");
  const responseDiv = document.querySelector("#response");

  inputField.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
      event.preventDefault();
      const msg = inputField.value;
      inputField.value = "";

      // Loading animasyonunu başlat
      responseDiv.innerHTML = '<span class="typing-dots">...</span>';

      fetch(`/get?msg=${encodeURIComponent(msg)}`)
        .then((response) => response.json())
        .then((data) => {
          // Animate the response
          animateResponse(data.response);
        });
    }
  });
});

function animateResponse(text) {
  const responseDiv = document.querySelector("#response");
  let index = 0;
  responseDiv.innerHTML = "";

  // Karakterleri tek tek yazma fonksiyonu
  function typeWriter() {
    if (index < text.length) {
      responseDiv.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 50); // Karakterler arasındaki süre (ms)
    }
  }

  // Yazma animasyonunu başlat
  typeWriter();
}
