import getProducts from "./Src/Utils/getProducts.js";

const root = document.getElementById("root");

const createCard = (product) => {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");
  
  productContainer.dataset.productId = product.id;

  const productImage = document.createElement("img");
  productImage.src = product.images[0].src;
  productImage.classList.add("product-image");

  const productName = document.createElement("h2");
  productName.textContent = product.name;

  const productPrice = document.createElement("p");
  productPrice.textContent = "Price: " + product.price + " USD";

  productContainer.appendChild(productImage);
  productContainer.appendChild(productName);
  productContainer.appendChild(productPrice);

  return productContainer;
};

const redirectToProductDetail = (productId) => {
  window.location.href = `product-detail.html?id=${productId}`;
};

const renderProducts = async () => {
  try {
    const products = await getProducts();

    const featured = document.createElement("div")
    featured.classList.add("featured");
    const gallery = document.createElement("div")
    gallery.classList.add("gallery");
    products.forEach((product) => {
        const productCard = createCard(product);
        productCard.addEventListener("click", () => {
          const productId = product.id;
          redirectToProductDetail(productId);
        });
        console.log(product.featured)
        if (product.featured) {
            featured.appendChild(productCard)
        } else {
            gallery.appendChild(productCard)
        }
    });
        root.appendChild(featured);
        root.appendChild(gallery);
  } catch (error) {
    console.error("Error occurred while rendering products.\n", error);
  }
};



renderProducts();

