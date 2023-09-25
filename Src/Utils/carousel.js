import getBlogs from './getBlogs.js';

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carousel = document.querySelector('.carousel');

// Set initial slide index and posts per page
let currentSlide = 0;
const postsPerPage = 4;

// Rendering blog posts into the carousel
function createCarouselCard(post) {
  // console.log(post)
  const card = document.createElement('div');
  card.classList.add('carousel-slide');

  const carouselImage = document.createElement('img');
  carouselImage.classList.add('carousel-image');
  carouselImage.src = post.image;
  
  console.log("Post image:", post.image)
  const carouselTitle = document.createElement('h2');
  carouselTitle.classList.add('carousel-title')
  carouselTitle.textContent = post.title



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

  currentSlide += postsPerPage;
  updateSlideVisibility();
});


getBlogs().then((posts) => {
  renderBlogPosts(posts);
  updateSlideVisibility();
});


/* Posts[0]
{
  "id": 66,
  "date": "2023-09-12T16:07:28",
  "title": "Disc Golf Legends: Icons Who Shaped the Sport",
  "content": "\n<p>Behind the growing popularity and evolution of disc golf, there are iconic figures who have left an indelible mark on the sport. These pioneers, champions, and innovators have shaped the course of disc golf&#8217;s history and development. In this post, we&#8217;ll pay tribute to some of the disc golf legends who have left a lasting legacy.</p>\n\n\n\n<p><strong>1. Ken Climo, &#8220;The Champ&#8221;:</strong> Ken Climo, with his unprecedented 12-time World Championship victories, is often regarded as one of the greatest disc golfers of all time. His consistency, putting prowess, and strategic gameplay have set a benchmark for generations to come.</p>\n\n\n\n<p><strong>2. Juliana Korver, &#8220;The Queen&#8221;:</strong> Juliana Korver is not only a multiple-time World Champion but also a passionate advocate for disc golf. Her dedication to growing the sport and her exemplary sportsmanship make her an iconic figure.</p>\n\n\n\n<p><strong>3. &#8220;Steady&#8221; Ed Headrick, Father of Disc Golf:</strong> Ed Headrick, the inventor of the modern Frisbee and the founder of the PDGA (Professional Disc Golf Association), laid the foundation for organized disc golf and the development of standardized discs and courses.</p>\n\n\n\n<p><strong>4. Dave Dunipace, Inventor of the Discraft Ultrastar:</strong> Dave Dunipace&#8217;s invention of the Discraft Ultrastar revolutionized disc sports. It became the standard for ultimate frisbee and significantly influenced the development of disc golf discs.</p>\n\n\n\n<p><strong>5. Avery Jenkins, Ambassador of the Sport:</strong> Avery Jenkins, a World Champion and disc golf ambassador, has played a vital role in promoting the sport globally, inspiring new players, and spreading the disc golf culture.</p>\n\n\n\n<p>These disc golf legends are just a few of the many individuals who have made significant contributions to the sport. Their achievements and dedication continue to inspire and shape the future of disc golf, ensuring that it remains a vibrant and evolving community of players and enthusiasts.</p>\n",
  "mediaLink": "https://www.fadedisc.eu/wp-json/wp/v2/media/52",
  "altText": "A group of disc golf players playing disc golf",
  "image": "https://www.fadedisc.eu/wp-content/uploads/2023/09/group-play.jpg"
}

*/