import getBlogs from "./Src/Utils/getBlogs.js";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("root");

  // Loader
  const loaderImage = new Image();
  loaderImage.classList.add("big-loader");
  loaderImage.src = "../../Assets/Images/Ripple-loader-big.svg";
  root.appendChild(loaderImage);

  const redirectToBlogDetail = (blogId) => {
    window.location.href = `blog-detail.html?id=${blogId}`;
  };

  // Loader end

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
      const blogs = await getBlogs();

      // Remove Loader
      root.removeChild(loaderImage);

      for (let i = 0; i < blogs.length; i++) {
        const card = createCard(blogs[i]);

        root.appendChild(card);
      }
    } catch (error) {
      console.error("Error occurred while rendering blogs.\n", error);
    }
  };

  renderBlogs();
});
