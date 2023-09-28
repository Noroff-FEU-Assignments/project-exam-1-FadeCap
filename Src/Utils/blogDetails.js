import getBlogById from "./getBlogById.js";

document.addEventListener("DOMContentLoaded", async () => {
  const blogDetailContainer = document.getElementById("blog-detail-container");

  // Loader
  const loaderImage = new Image();
  loaderImage.classList.add("big-loader");
  loaderImage.src = "../../Assets/Images/Ripple-loader-big.svg";
  blogDetailContainer.appendChild(loaderImage);

  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  function openModal(imageUrl) {
    modal.style.display = "flex";
    modalImg.src = imageUrl;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  const renderBlogDetail = async (blogId) => {
    try {
      const blog = await getBlogById(blogId);

      blogDetailContainer.removeChild(loaderImage);

      blogDetailContainer.dataset.blogId = blog.id;

      const blogImage = document.createElement("img");
      blogImage.src = blog.image;
      blogImage.alt = blog.altText
      blogImage.classList.add("blog-image-specific");

      blogImage.addEventListener("click", () => {
        openModal(blog.image);
      });

      const blogName = document.createElement("h2");
      blogName.classList.add("blog-title-specific");
      blogName.innerHTML = blog.title;

      const blogContent = document.createElement("div");
      blogContent.classList.add("blog-content-specific");
      blogContent.innerHTML = blog.content;

      blogDetailContainer.appendChild(blogImage);
      blogDetailContainer.appendChild(blogName);
      blogDetailContainer.appendChild(blogContent);
    } catch (error) {
      console.error("Error occurred while trying to get blog detail.\n", error);
    }
  };

  renderBlogDetail(blogId);

  // Modal
  const modal = document.getElementById("pageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);

  //  Close when clicking outside image (modal)
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
});
