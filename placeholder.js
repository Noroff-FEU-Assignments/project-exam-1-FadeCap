const createCard = (blog) => {
    const articleElement = document.createElement("article");
    articleElement.classList.add("article");
  
    const blogContainer = document.createElement("div");
    blogContainer.classList.add("blog-container");
  
    blogContainer.dataset.blogId = blog.id;
  
    const blogImage = document.createElement("img");
    blogImage.src = blog.images[0].src;
    blogImage.classList.add("blog-image");
  
    const blogName = document.createElement("h2");
    blogName.textContent = blog.name;
    blogName.classList.add("card-title")
  
    const blogText = document.createElement("p");
    blogText.textContent = blog.text;
    blogText.classList.add("paragraph")
  
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