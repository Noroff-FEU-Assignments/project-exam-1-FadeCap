import getBlogs from "./getBlogs.js";

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const carousel = document.querySelector(".carousel");

// Loader - Removes itself when the blog posts are loaded
carousel.innerHTML = '<img src="../../Assets/Images/Ripple-loader.svg"/>';

let currentSlide = 0;
const postsPerPage = 4;
let allPosts = [];

// Rendering blog posts into the carousel
function createCarouselCard(post) {
  const card = document.createElement("div");
  card.classList.add("carousel-slide");

  const carouselImage = document.createElement("img");
  carouselImage.classList.add("carousel-image");
  carouselImage.src = post.image;

  const carouselTitle = document.createElement("h2");
  carouselTitle.classList.add("carousel-title");
  carouselTitle.innerHTML = post.title;

  const readMoreBtn = document.createElement("button");
  readMoreBtn.classList.add("read-more-btn");
  readMoreBtn.textContent = "Read more...";
  readMoreBtn.addEventListener("click", () => {
    window.location.href = `./blog-list/blog-detail.html?id=${post.id}`;
  });

  card.appendChild(carouselImage);
  card.appendChild(carouselTitle);
  card.appendChild(readMoreBtn);

  return card;
}

function renderBlogPosts(posts) {
  allPosts = posts;
  const cards = posts
    .slice(currentSlide, currentSlide + postsPerPage)
    .map((post) => createCarouselCard(post));

  carousel.innerHTML = "";
  cards.forEach((card) => {
    carousel.appendChild(card);
  });
}

function updateSlideVisibility() {
  const slides = document.querySelectorAll(".carousel-slide");
  slides.forEach((slide, index) => {
    if (index >= currentSlide && index < currentSlide + postsPerPage) {
      slide.style.display = "flex";
    } else {
      slide.style.display = "none";
    }
  });
}

// Event listener for the previous button
prevBtn.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide -= postsPerPage;
    renderBlogPosts(allPosts);
  } else {
    currentSlide = 8;
    renderBlogPosts(allPosts);
  }
});

// Event listener for the next button
nextBtn.addEventListener("click", () => {
  if (currentSlide + postsPerPage < allPosts.length) {
    currentSlide += postsPerPage;
    renderBlogPosts(allPosts);
  } else {
    currentSlide = 0;
    renderBlogPosts(allPosts);
  }
});

getBlogs().then((posts) => {
  renderBlogPosts(posts);
  updateSlideVisibility();
});
