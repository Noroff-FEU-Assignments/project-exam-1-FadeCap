import getBlogById from "./getBlogById.js";

document.addEventListener("DOMContentLoaded", async () => {
  const blogDetailContainer = document.getElementById("blog-detail-container");

  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  const renderBlogDetail = async (blogId) => {
    try {
      const blog = await getBlogById(blogId);

      blogDetailContainer.dataset.blogId = blog.id;

      const blogImage = document.createElement("img");
      blogImage.src = blog.image;
      blogImage.classList.add("blog-image");

      const blogName = document.createElement("h2");
      blogName.textContent = blog.title;

      const blogDescription = document.createElement("div");
      blogDescription.innerHTML = blog.description;

      blogDetailContainer.appendChild(blogImage);
      blogDetailContainer.appendChild(blogName);
      blogDetailContainer.appendChild(blogDescription);

      console.log(blog);
    } catch (error) {
      console.error("Error occurred while trying to get blog detail.\n", error);
    }
  };

  renderBlogDetail(blogId);
});
