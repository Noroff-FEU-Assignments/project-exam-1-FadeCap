import getBlogs from "./Src/Utils/getBlogs.js";

const root = document.getElementById("root");

const mockBlogs = [
  {
    id: "1",
    date: "2023-09-12T16:07:28",
    name: "Hiking Adventures in the Rockies",
    text: "Join us on a thrilling journey through the breathtaking landscapes of the Rocky Mountains. Discover hidden trails, pristine lakes, and the untamed wilderness that awaits every hiker. Get ready for an unforgettable adventure in the heart of nature.",
    images: [
      { src: "https://picsum.photos/id/248/200/300" },
      { src: "https://picsum.photos/id/238/200/300" },
      { src: "https://picsum.photos/id/239/200/300" },
    ],
  },
  {
    id: "2",
    date: "2023-09-12T16:08:28",
    name: "Culinary Delights from Around the World",
    text: "Embark on a culinary world tour with us as we explore the diverse and delicious flavors of global cuisine. From mouthwatering street food in Bangkok to gourmet French pastries in Paris, our journey will tantalize your taste buds and broaden your culinary horizons.",
    images: [
      { src: "https://picsum.photos/id/240/200/300" },
      { src: "https://picsum.photos/id/241/200/300" },
    ],
  },
  {
    id: "3",
    date: "2023-09-12T16:09:28",
    name: "Photography Tips and Tricks",
    text: "Unleash your inner photographer and capture stunning moments with our expert photography tips and tricks. From mastering the art of composition to understanding lighting techniques, we'll guide you on your path to becoming a photography pro.",
    images: [
      { src: "https://picsum.photos/id/242/200/300" },
      { src: "https://picsum.photos/id/243/200/300" },
    ],
  },
];

/* Creating a card for my blog posts */
const createCard = (blog) => {
  const articleElement = document.createElement("article");
  articleElement.classList.add("article");

  const blogContainer = document.createElement("div");
  blogContainer.classList.add("blog-container");

  blogContainer.dataset.blogId = blog.id;

  const blogImage = document.createElement("img");
  blogImage.src = blog.image;
  blogImage.classList.add("blog-image");

  const blogName = document.createElement("h2");
  blogName.textContent = blog.title;
  blogName.classList.add("card-title");

  const blogText = document.createElement("p");
  blogText.textContent = blog.description.replace( /(<([^>]+)>)/ig, '').replace(/[^\x00-\x7F]+/g, '').replace(/&#8217;/g, "'");
  blogText.classList.add("paragraph");

  const readMoreBtn = document.createElement("button");
  blogContainer.classList.add("read-more-btn");
  readMoreBtn.textContent = "Read more...";

  articleElement.appendChild(blogContainer);
  blogContainer.appendChild(blogImage);
  blogContainer.appendChild(blogName);
  blogContainer.appendChild(blogText);
  blogContainer.appendChild(readMoreBtn);

  return articleElement;
};

const redirectToBlogDetail = (blogId) => {
  window.location.href = `blog-detail.html?id=${blogId}`;
};

/* Rendering Blog posts into html */
const renderBlogs = async () => {
  try {
    const blogs = await getBlogs();

    for (let i = 0; i < blogs.length; i++) {
      const card = createCard(blogs[i]);

      root.appendChild(card);
    }
  } catch (error) {
    console.error("Error occurred while rendering blogs.\n", error);
  }
};

renderBlogs();
