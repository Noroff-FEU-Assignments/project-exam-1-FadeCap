// Get necessary elements
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');

// Set initial slide index
let currentSlide = 0;

// Function to update the visibility of slides
function updateSlideVisibility() {
  slides.forEach((slide, index) => {
    if (index >= currentSlide && index < currentSlide + 4) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Event listener for the previous button
prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide -= 1;
    updateSlideVisibility();
  }
});

// Event listener for the next button
nextBtn.addEventListener('click', () => {
  if (currentSlide + 4 < slides.length) {
    currentSlide += 1;
    updateSlideVisibility();
  }
});

// Initial slide visibility
updateSlideVisibility();
