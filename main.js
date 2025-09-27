// Provided "mock server" function
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2; // 20% fail chance
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

// Elements
const hearts = document.querySelectorAll(".like-glyph");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

// Constants for hearts
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Event listeners
hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    mimicServerCall()
      .then(() => {
        if (heart.innerText === EMPTY_HEART) {
          heart.innerText = FULL_HEART;
          heart.classList.add("activated-heart");
        } else {
          heart.innerText = EMPTY_HEART;
          heart.classList.remove("activated-heart");
        }
      })
      .catch(error => {
        modal.classList.remove("hidden");
        modalMessage.innerText = error;

        setTimeout(() => {
          modal.classList.add("hidden");
        }, 3000);
      });
  });
});

