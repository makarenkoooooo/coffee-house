const btnMenu = document.querySelectorAll(".btn-menu");

btnMenu.forEach((button) => {
  button.addEventListener("click", () => {
    btnMenu.forEach((btn) => {
      btn.classList.remove("btn-active");
    });
    button.classList.add("btn-active");
  });
});

async function loadJSON() {
  const response = await fetch("products.json");
  const data = await response.json();
  return data;
}

function generateBlocks(category) {
  loadJSON().then((products) => {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    function showProducts(startIndex, endIndex) {
      for (let i = startIndex; i < endIndex; i++) {
        const product = filteredProducts[i];
        if (!product) break;
        const productBlock = document.createElement("div");
        productBlock.classList.add("product-block");
        productBlock.innerHTML = `
          <img src="${product.img}" />
          <div class="product-block-text">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price-style">$${product.price}</p>
          </div>
        `;
        productContainer.appendChild(productBlock);
      }
    }

    function handleResize() {
      productContainer.innerHTML = "";
      if (window.innerWidth <= 768) {
        showProducts(0, 4);
        if (filteredProducts.length > 4) {
          const showMoreButton = document.createElement("button");
          showMoreButton.classList.add("btn__menu-section");
          showMoreButton.addEventListener("click", () => {
            const currentlyDisplayedProducts =
              document.querySelectorAll(".product-block").length;
            const nextIndex = currentlyDisplayedProducts + 4;
            showProducts(currentlyDisplayedProducts, nextIndex);
            if (nextIndex >= filteredProducts.length) {
              showMoreButton.style.display = "none";
            }
          });
          productContainer.appendChild(showMoreButton);
        }
      } else {
        showProducts(0, filteredProducts.length);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
  });
}
