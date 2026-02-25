if (typeof products === 'undefined') {
    var products = [];
}

document.addEventListener("DOMContentLoaded", async () => {

    if (!products || products.length === 0) {
        try {
            const response = await fetch("../backend/get_products.php");
            if (!response.ok) throw new Error("Network response was not ok");
            products = await response.json();
            window.products = products;
            console.log("Fetched products:", products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            products = [];
        }
    }

    async function renderProductOfDay() {
        const container = document.getElementById("productOfDay");
        if (!container) return;

        try {
            const response = await fetch("../backend/get_product_of_day.php");
            const product = await response.json();

            if (!product) {
                container.innerHTML = `<p class="text-gray-500">No product available today.</p>`;
                return;
            }

            container.innerHTML = `
                <div class="bg-gray-50 rounded-3xl shadow p-6 
                            flex flex-col md:flex-row items-center gap-6 w-full">

                    <div class="w-full md:w-64 h-64 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        <img src="../${product.image_url}"
                             class="w-full h-full object-cover"
                             alt="${product.name}">
                    </div>

                    <div class="flex-1 text-left">
                        <h4 class="text-2xl font-bold mb-2">${product.name}</h4>
                        <p class="text-gray-600 mb-3">${product.description}</p>
                        <p class="text-purple-600 font-bold text-lg mb-4">
                            ₱${parseFloat(product.price).toLocaleString()}
                        </p>
                        <!-- FIX: was product.id (undefined) — now product.product_id -->
                        <button onclick="addToCart(${product.product_id})"
                            class="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error("Failed to load Product of the Day:", error);
            container.innerHTML = `<p class="text-red-500">Failed to load product.</p>`;
        }
    }

    function renderRecommendedFlex() {
        const recommendedContainer = document.getElementById("recommendedProducts");
        if (!recommendedContainer) return;
        if (products.length === 0) return;

        recommendedContainer.innerHTML = "";
        products.forEach(product => {
            recommendedContainer.innerHTML += `
                <div class="flex-none bg-gray-50/30 rounded-xl shadow p-4 min-w-[250px] max-w-[250px] flex flex-col items-center min-h-[300px]">
                    <div class="w-full h-48 bg-gray-100 rounded overflow-hidden mb-4 flex items-center justify-center">
                        <img src="../${product.image_url}" class="w-full h-full object-cover" alt="${product.name}">
                    </div>
                    <h4 class="font-semibold mb-2 text-center">${product.name}</h4>
                    <p class="text-purple-600 font-bold mb-3 text-center">₱${parseFloat(product.price).toLocaleString()}</p>
                    <!-- FIX: was product.id (undefined) — now product.product_id -->
                    <button onclick="addToCart(${product.product_id})"
                        class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                        Add to Cart
                    </button>
                </div>
            `;
        });
    }

    function loadPopularItems() {
        const popularContainer = document.getElementById("popularGrid");
        if (!popularContainer) return;
        if (products.length === 0) return;

        popularContainer.innerHTML = "";
        const popularItems = products.slice(0, 6);

        popularItems.forEach(product => {
            popularContainer.innerHTML += `
                <div class="bg-white rounded-2xl shadow-md p-6 text-center transition hover:scale-105 hover:shadow-xl duration-300">
                    <img src="../${product.image_url}"
                         class="w-full h-48 object-contain mb-4"
                         alt="${product.name}">
                    <h4 class="font-semibold text-lg mb-2">${product.name}</h4>
                    <p class="text-purple-600 font-bold mb-3">
                        ₱${parseFloat(product.price).toLocaleString()}
                    </p>
                    <!-- FIX: was product.id (undefined) — now product.product_id -->
                    <button onclick="addToCart(${product.product_id})"
                        class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                        Add to Cart
                    </button>
                </div>
            `;
        });
    }

    function startSliding() {
        const recommendedContainer = document.getElementById("recommendedProducts");
        const wrapper = document.getElementById("recommendedWrapper");
        if (!recommendedContainer || recommendedContainer.children.length === 0) return;

        let currentIndex = 0;
        const totalItems = recommendedContainer.children.length;
        const itemWidth  = recommendedContainer.children[0].offsetWidth + 24;
        let slideInterval;

        function slide() {
            currentIndex++;
            if (currentIndex >= totalItems) currentIndex = 0;
            recommendedContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }

        slideInterval = setInterval(slide, 2500);

        if (wrapper) {
            wrapper.addEventListener("mouseenter", () => clearInterval(slideInterval));
            wrapper.addEventListener("mouseleave", () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(slide, 2500);
            });
        }
    }

    await renderProductOfDay();
    if (products.length > 0) {
        renderRecommendedFlex();
        loadPopularItems();
        startSliding();
    }

    if (typeof updateCartDisplay === "function") {
        updateCartDisplay();
    }
});