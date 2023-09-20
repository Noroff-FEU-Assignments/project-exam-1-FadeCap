import getBlogById from "./getBlogById.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productDetailContainer = document.getElementById("root");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const renderProductDetail = async (productId) => {
    try {
      const product = await getProductById(productId);

      const productImage = document.createElement("img");
      productImage.src = product.images[0].src;
      productImage.classList.add("product-image");

      const productName = document.createElement("h2");
      productName.textContent = product.name;

      const productDescription = document.createElement("div");
      productDescription.innerHTML = product.description;

      productDetailContainer.appendChild(productImage);
      productDetailContainer.appendChild(productName);
      productDetailContainer.appendChild(productPrice);
      productDetailContainer.appendChild(productDescription);
    } catch (error) {
      console.error(
        "Error occurred while trying to get product detail.\n",
        error
      );
    }
  };

  renderProductDetail(productId);
});
