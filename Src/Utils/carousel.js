import getBlogs from './getBlogs.js';

const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const carousel = document.querySelector('.carousel');

// Set initial slide index and posts per page
let currentSlide = 0;
const postsPerPage = 4;
let allPosts = [];

// Rendering blog posts into the carousel
function createCarouselCard(post) {

  const card = document.createElement('div');
  card.classList.add('carousel-slide');

  const carouselImage = document.createElement('img');
  carouselImage.classList.add('carousel-image');
  carouselImage.src = post.image;
  
  const carouselTitle = document.createElement('h2');
  carouselTitle.classList.add('carousel-title')
  carouselTitle.textContent = post.title



  card.appendChild(carouselImage);
  card.appendChild(carouselTitle);
  

  return card;
}

function renderBlogPosts(posts) {
  allPosts = posts
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
  console.log(currentSlide)
  if (currentSlide > 0) {
    currentSlide -= postsPerPage;
    renderBlogPosts(allPosts);
  } else {
    currentSlide = 8
    renderBlogPosts(allPosts)
  }
});

// Event listener for the next button
nextBtn.addEventListener('click', () => {
  console.log("72.6", currentSlide)
  if (currentSlide + postsPerPage < allPosts.length) {

    currentSlide += postsPerPage;
    renderBlogPosts(allPosts);
  } else {
    currentSlide = 0
    renderBlogPosts(allPosts)
  }
});


getBlogs().then((posts) => {
  renderBlogPosts(posts);
  updateSlideVisibility();
});
