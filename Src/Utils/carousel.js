import getBlogs from './getBlogs.js';

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carousel = document.querySelector('.carousel');

// Set initial slide index and posts per page
let currentSlide = 0;
const postsPerPage = 4;

// Rendering blog posts into the carousel
function createCarouselCard(post) {
  const card = document.createElement('div');
  card.classList.add('carousel-slide');

  const carouselImage = document.createElement('img');
  carouselImage.src = post._links['wp:featuredmedia'][0].href
  console.log(post._links['wp:featuredmedia'][0].href)

  const carouselTitle = document.createElement('h2');
  carouselTitle.textContent = post.title.rendered;


  card.appendChild(carouselImage);
  card.appendChild(carouselTitle);
  

  return card;
}

function renderBlogPosts(posts) {
  const cards = posts
    .slice(currentSlide, currentSlide + postsPerPage)
    .map((post) => createCarouselCard(post));

  carousel.innerHTML = '';
  cards.forEach((card) => {
    carousel.appendChild(card);
  });
}

// Function to update the visibility of slides
function updateSlideVisibility() {
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach((slide, index) => {
    if (index >= currentSlide && index < currentSlide + postsPerPage) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Event listener for the previous button
prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide -= postsPerPage;
    updateSlideVisibility();
  }
});

// Event listener for the next button
nextBtn.addEventListener('click', () => {
  // You may need to fetch more posts if you run out
  // Assuming you have a function fetchMorePosts() to fetch additional posts
  // Use a similar approach to render them in the carousel
  currentSlide += postsPerPage;
  updateSlideVisibility();
});

// Initial setup: Fetch and render blog posts using the imported function
getBlogs().then((posts) => {
  renderBlogPosts(posts);
  updateSlideVisibility();
});
