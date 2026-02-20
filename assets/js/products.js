const products = [
    { id: 1, name: "Wireless Mouse", price: 1499, image: "assets/images/smartwatch1.png", description: "Ergonomic high-performance wireless mouse." },
    { id: 2, name: "Mechanical Keyboard", price: 3499, image: "assets/images/mechanicalkeyboard1.jpg", description: "RGB mechanical keyboard with premium switches." },
    { id: 3, name: "Headset", price: 2299, image: "assets/images/headphones1.jpg", description: "Immersive surround sound gaming headset." },
    { id: 4, name: "USB-C Hub", price: 999, image: "assets/images/gamingmouse1.jpeg", description: "Multiport USB-C hub for creators." },
    { id: 5, name: "Smart Watch", price: 1999, image: "assets/images/smartwatch2.png", description: "Stylish smart watch with fitness tracking." },
    { id: 6, name: "Gaming Mouse", price: 1299, image: "assets/images/gamingmouse2.png", description: "High-precision RGB gaming mouse." },
    { id: 7, name: "Mechanical Keyboard Pro", price: 3999, image: "assets/images/mechanicalkeyboard2.jpg", description: "Premium mechanical keyboard with programmable keys." },
    { id: 8, name: "Bluetooth Speaker", price: 899, image: "assets/images/speaker1.png", description: "Portable speaker with crystal-clear sound." },
    { id: 9, name: "Laptop Stand", price: 599, image: "assets/images/laptopstand.png", description: "Ergonomic laptop stand for better posture." },
    { id: 10, name: "Webcam HD", price: 1599, image: "assets/images/webcam.png", description: "High-definition webcam for streaming." },
    { id: 11, name: "Gaming Chair", price: 8999, image: "assets/images/gamingchair.png", description: "Comfortable chair for long gaming sessions." },
    { id: 12, name: "USB Flash Drive", price: 399, image: "assets/images/usbdrive.png", description: "Portable storage for your data." },
    { id: 13, name: "Wireless Charger", price: 699, image: "assets/images/wirelesscharger.png", description: "Fast wireless charger for your devices." },
    { id: 14, name: "Graphics Tablet", price: 4999, image: "assets/images/graphics tablet.png", description: "Create digital art with precision." },
    { id: 15, name: "Noise Cancelling Earbuds", price: 2999, image: "assets/images/earbuds.png", description: "Block out distractions and enjoy music." },
    { id: 16, name: "Portable Monitor", price: 5999, image: "assets/images/portablemonitor.png", description: "Extend your laptop screen anywhere." },
    { id: 17, name: "RGB Desk Lamp", price: 1299, image: "assets/images/desklamp.png", description: "Stylish lamp with customizable lighting." }
];

document.addEventListener("DOMContentLoaded", () => {

    function renderProductOfDay() {
        const container = document.getElementById("productOfDay");
        if (!container) return;

        const product = products[0];
        container.innerHTML = `
            <div class="bg-gray-50/30 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 min-h-[250px] w-full">
                <div class="w-full md:w-64 h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src="${product.image}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="text-2xl font-bold mb-2">${product.name}</h4>
                    <p class="text-gray-600 mb-3">${product.description}</p>
                    <p class="text-purple-600 font-bold text-lg mb-4">₱${product.price.toLocaleString()}</p>
                    <button onclick="addToCart(${product.id})"
                        class="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    function renderRecommendedFlex() {
        const recommendedContainer = document.getElementById("recommendedProducts");
        if (!recommendedContainer) return;

        recommendedContainer.innerHTML = "";
        products.forEach(product => {
            recommendedContainer.innerHTML += `
                <div class="flex-none bg-gray-50/30 rounded-xl shadow p-4 min-w-[250px] max-w-[250px] flex flex-col items-center min-h-[300px]">
                    <div class="w-full h-48 bg-gray-100 rounded overflow-hidden mb-4 flex items-center justify-center">
                        <img src="${product.image}" class="w-full h-full object-cover">
                    </div>
                    <h4 class="font-semibold mb-2 text-center">${product.name}</h4>
                    <p class="text-purple-600 font-bold mb-3 text-center">₱${product.price.toLocaleString()}</p>
                    <button onclick="addToCart(${product.id})"
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

    const popularItems = products.slice(0, 6); // first 6 items

    popularItems.forEach(product => {
        popularContainer.innerHTML += `
                <div class="bg-white rounded-2xl shadow-md p-6 text-center transition hover:scale-105 hover:shadow-xl duration-300">
                    <img src="${product.image}" 
                        class="w-full h-48 object-contain mb-4">
                    <h4 class="font-semibold text-lg mb-2">${product.name}</h4>
                    <p class="text-purple-600 font-bold mb-3">₱${product.price}</p>
                    <button onclick="addToCart(${product.id})"
                            class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                        Add to Cart
                    </button>
                </div>
        `   ;
        });
    }

    // carousel slider
    function startSliding() {
        const recommendedContainer = document.getElementById("recommendedProducts");
        const wrapper = document.getElementById("recommendedWrapper");
        if (!recommendedContainer || recommendedContainer.children.length === 0) return;

        let currentIndex = 0;
        const totalItems = recommendedContainer.children.length;
        const itemWidth = recommendedContainer.children[0].offsetWidth + 24;

        let slideInterval = setInterval(() => {
            currentIndex++;
            if (currentIndex >= totalItems) currentIndex = 0;
            recommendedContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }, 2500);

        // Pause/resume on hover
        if (wrapper) {
            wrapper.addEventListener("mouseenter", () => clearInterval(slideInterval));
            wrapper.addEventListener("mouseleave", () => startSliding());
        }
    }

    // --- INITIALIZE ---
    renderProductOfDay();
    renderRecommendedFlex();
    loadPopularItems();
    startSliding();
    updateCartDisplay(); // from main.js

});
