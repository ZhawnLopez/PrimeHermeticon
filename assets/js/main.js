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

// Cart
let cart = 0;
function addToCart() { cart++; updateCartDisplay(); }
function updateCartDisplay() {
    const desktopCount = document.getElementById("cartCount");
    const mobileCount = document.getElementById("cartCountMobile");
    if (desktopCount) desktopCount.textContent = cart;
    if (mobileCount) mobileCount.textContent = cart;
}

// Product of the Day
function renderProductOfDay() {
    const container = document.getElementById("productOfDay");
    const product = products[0]; // first product as example

    container.innerHTML = `
        <div class="bg-gray-50/30 rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 min-h-[250px] w-full">
            <div class="w-full md:w-64 h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img src="${product.image}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1">
                <h4 class="text-2xl font-bold mb-2">${product.name}</h4>
                <p class="text-gray-600 mb-3">${product.description}</p>
                <p class="text-purple-600 font-bold text-lg mb-4">₱${product.price.toLocaleString()}</p>
                <button onclick="addToCart()"
                    class="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Recommended Products 
const recommendedContainer = document.getElementById("recommendedProducts");
const wrapper = document.getElementById("recommendedWrapper");
let currentIndex = 0;
let slideInterval;

function renderRecommendedFlex() {
    recommendedContainer.innerHTML = "";
    products.forEach(product => {
        recommendedContainer.innerHTML += `
        <div class="flex-none bg-gray-50/30 rounded-xl shadow p-4 min-w-[250px] max-w-[250px] flex flex-col items-center min-h-[300px]">
            <div class="w-full h-48 bg-gray-100 rounded overflow-hidden mb-4 flex items-center justify-center">
                <img src="${product.image}" class="w-full h-full object-cover">
            </div>
            <h4 class="font-semibold mb-2 text-center">${product.name}</h4>
            <p class="text-purple-600 font-bold mb-3 text-center">₱${product.price.toLocaleString()}</p>
            <button onclick="addToCart()" class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                Add to Cart
            </button>
        </div>
        `;
    });
}

function startSliding() {
    const totalItems = products.length;
    const itemWidth = recommendedContainer.children[0].offsetWidth + 24; // gap = 24px
    slideInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalItems) currentIndex = 0;
        recommendedContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }, 1000);
}

// Pause/resume on hover
wrapper.addEventListener("mouseenter", () => clearInterval(slideInterval));
wrapper.addEventListener("mouseleave", startSliding);

document.addEventListener("DOMContentLoaded", () => {
    renderProductOfDay();
    renderRecommendedFlex();
    startSliding();
    updateCartDisplay();
});
