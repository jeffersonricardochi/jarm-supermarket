const productGrid = document.getElementById("product-grid");
const productCount = document.getElementById("product-count");
const categoryButtons = document.querySelectorAll(".category-button");

let allProducts = [];
let selectedCategory = "all";

// Load product data from the JSON file
async function loadProducts() {
    try {
        const response = await fetch("./products.json");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        allProducts = await response.json();

        applyFilters();

    } catch (error) {
        console.error(error);
        productCount.textContent = "Sorry, products could not be loaded.";
    }
}

// Display products matching the selected category
function applyFilters() {
    let filteredProducts;

    if (selectedCategory === "all") {
        filteredProducts = allProducts;
    } else {
        filteredProducts = allProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    displayProducts(filteredProducts);
}

// Handle category button selection
categoryButtons.forEach(function(button) {

    button.addEventListener("click", () => {

        if (allProducts.length === 0) return;

        selectedCategory = button.dataset.category;

        categoryButtons.forEach(categoryButton => {

            const isSelected = categoryButton === button;

            categoryButton.setAttribute(
                "aria-pressed",
                String(isSelected)
            );
        });

        applyFilters();
    });
});

// Display products in the catalogue
function displayProducts(products) {
    productGrid.replaceChildren();

    products.forEach(product => {
        const item = document.createElement("li");
        item.className = "product-card";

        const article = document.createElement("article");

        const image = document.createElement("img");
        image.src = "../../" + product.image.replace(/^\/+/, "");
        image.alt = product.name;
        image.loading = "lazy";
        image.className = "product-image";

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h2");
        name.textContent = product.name;

        const size = document.createElement("p");
        size.textContent = product.size;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"
        }).format(product.price);

        const stock = document.createElement("p");
        stock.className = "product-stock";
        stock.textContent = product.inStock ? "In stock" : "Out of stock";

        article.append(image, category, name, size, price, stock);
        item.appendChild(article);
        productGrid.appendChild(item);
    });

    productCount.textContent = `Showing ${products.length} products`;
}

loadProducts();