import getBlogs from "./Src/Utils/getBlogs.js";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("root");
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.classList.add("load-more-btn");
  loadMoreBtn.textContent = "Load More...";

  // Loader - Big
  const loaderImage = new Image();
  loaderImage.classList.add("big-loader");
  loaderImage.src = "../../Assets/Images/Ripple-loader-big.svg";
  root.appendChild(loaderImage);

  // Redirect to blog specific page
  const redirectToBlogDetail = (blogId) => {
    window.location.href = `blog-detail.html?id=${blogId}`;
  };

  let displayedBlogs = 0;
  let totalBlogs = 0;
  let blogs = [];

  // Creating card for blogs

  const createCard = (blog) => {
    const articleElement = document.createElement("article");
    articleElement.classList.add("article");

    const blogContainer = document.createElement("div");
    blogContainer.classList.add("blog-container");

    blogContainer.dataset.blogId = blog.id;

    const blogImage = document.createElement("img");
    blogImage.src = blog.image;
    blogImage.alt = blog.altText;
    blogImage.classList.add("blog-image");

    const blogName = document.createElement("h2");
    blogName.innerHTML = blog.title;
    blogName.classList.add("card-title");

    const blogText = document.createElement("p");
    blogText.innerHTML = blog.description;
    blogText.classList.add("card-paragraph");

    const readMoreBtn = document.createElement("button");
    readMoreBtn.classList.add("read-more-btn");
    readMoreBtn.textContent = "Read more...";
    readMoreBtn.addEventListener("click", () => {
      const blogId = blog.id;
      redirectToBlogDetail(blogId);
    });

    articleElement.appendChild(blogContainer);
    blogContainer.appendChild(blogImage);
    blogContainer.appendChild(blogName);
    blogContainer.appendChild(blogText);
    blogContainer.appendChild(readMoreBtn);

    return articleElement;
  };

  const renderBlogs = async () => {
    try {
      blogs = await getBlogs();
      totalBlogs = blogs.length;

      // Remove Loader
      root.removeChild(loaderImage);

      for (let i = 0; i < Math.min(totalBlogs, 10); i++) {
        const card = createCard(blogs[i]);

        root.appendChild(card);
        displayedBlogs++;
      }

      // Load more button - If there are more to load
      if (displayedBlogs < totalBlogs) {
        loadMoreBtn.addEventListener("click", loadMoreBlogs);
        root.appendChild(loadMoreBtn);
      }
    } catch (error) {
      console.error("Error occurred while rendering blogs.\n", error);
    }
  };

  // Show the last two blogs
  const loadMoreBlogs = () => {
    for (
      let i = displayedBlogs;
      i < Math.min(totalBlogs, displayedBlogs + 2);
      i++
    ) {
      const card = createCard(blogs[i]);
      root.appendChild(card);
      displayedBlogs++;
    }

    if (displayedBlogs >= totalBlogs) {
      root.removeChild(loadMoreBtn);
    }
  };

  renderBlogs();
});
