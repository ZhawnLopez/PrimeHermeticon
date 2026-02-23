let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    productId = Number(productId);
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.qty++;
    else cart.push({ id: productId, qty: 1 });

    saveCart();
    updateCartDisplay();
}

function increaseQty(productId) {
    productId = Number(productId);
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty++;
    saveCart();
    updateCartDisplay();
}

function decreaseQty(productId) {
    productId = Number(productId);
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.qty--;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartDisplay();
}

function removeItem(productId) {
    productId = Number(productId);
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartDisplay();
}

function removeAllItems() {
    if (!confirm("Remove all items from cart?")) return;
    cart = [];
    saveCart();
    updateCartDisplay();
}

function toggleCart() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    drawer.classList.toggle("translate-x-full");
    overlay?.classList.toggle("hidden");
}

function updateCartDisplay() {
    saveCart();
    const desktopCount = document.getElementById("cartCount");
    const mobileCount = document.getElementById("cartCountMobile");
    const drawerItems = document.getElementById("drawerItems");
    const cartTotal = document.getElementById("cartTotal");

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    if (desktopCount) desktopCount.textContent = totalQty;
    if (mobileCount) mobileCount.textContent = totalQty;

    if (!drawerItems || !products) return;

    drawerItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        drawerItems.innerHTML = `<p class="text-center text-gray-500">Your cart is empty.</p>`;
        cartTotal.textContent = "₱0.00";
        return;
    }

    cart.forEach(ci => {
        const p = products.find(x => Number(x.product_id) === Number(ci.id));
        if (!p) return;
        const price = parseFloat(p.price);
        const itemTotal = price * ci.qty;
        totalPrice += itemTotal;

        drawerItems.innerHTML += `
            <div class="border-b pb-4 space-y-2">
                <div class="flex justify-between">
                    <p class="font-semibold">${p.name}</p>
                    <button onclick="removeItem(${p.product_id})" class="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <button onclick="decreaseQty(${p.product_id})" class="bg-gray-200 px-2 rounded">−</button>
                        <span>${ci.qty}</span>
                        <button onclick="increaseQty(${p.product_id})" class="bg-gray-200 px-2 rounded">+</button>
                    </div>
                    <p class="font-bold">₱${itemTotal.toLocaleString()}</p>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = "₱" + totalPrice.toLocaleString();
}


async function checkAuth() {
    try {
        const res = await fetch("../backend/session_status.php", { credentials: 'same-origin' });
        const data = await res.json();
        if (!data.logged) {
            window.location.href = "login.html";
            return false;
        } else {
            const navUser = document.getElementById("navUser");
            if (navUser) {
                navUser.textContent = data.username ? `Hi, ${data.username}` : "";
                navUser.classList.remove("hidden");
            }
            const logoutNav = document.getElementById("logoutNav");
            const logoutMobile = document.getElementById("logoutMobile");
            if (logoutNav) logoutNav.classList.remove("hidden");
            if (logoutMobile) logoutMobile.classList.remove("hidden");
            return true;
        }
    } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = "login.html";
        return false;
    }
}

async function logout() {
    try {
        const res = await fetch("../backend/logout.php", { method: 'POST', credentials: 'same-origin' });
        const data = await res.json();
        if (data.success) {
            localStorage.removeItem("cart");
            window.location.href = "login.html";
        } else {
            alert("Logout failed.");
        }
    } catch (err) {
        console.error("Logout error:", err);
        window.location.href = "login.html";
    }
}

window.logout = logout;

async function fetchProducts() {
    try {
        const res = await fetch("../backend/get_products.php");
        const arr = await res.json();
        if (!Array.isArray(arr)) {
            console.error("get_products.php returned unexpected", arr);
            return [];
        }
        return arr;
    } catch (err) {
        console.error("Failed fetching products", err);
        return [];
    }
}

function renderRecommendedFlex(productsArr) {
    const recommendedContainer = document.getElementById("recommendedProducts");
    if (!recommendedContainer) return;
    recommendedContainer.innerHTML = "";

    productsArr.forEach(p => {
        recommendedContainer.innerHTML += `
            <div class="flex-none bg-gray-50/30 rounded-xl shadow p-4 min-w-[250px] max-w-[250px] flex flex-col items-center min-h-[300px]">
                <div class="w-full h-48 bg-gray-100 rounded overflow-hidden mb-4 flex items-center justify-center">
                    <img src="../${p.image_url}" alt="${p.name}" class="w-full h-full object-cover">
                </div>
                <h4 class="font-semibold mb-2 text-center">${p.name}</h4>
                <p class="text-purple-600 font-bold mb-3 text-center">₱${parseFloat(p.price).toLocaleString()}</p>
                <button onclick="addToCart(${p.product_id})" class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

function renderPopularGrid(productsArr) {
    const grid = document.getElementById("popularGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const popularItems = productsArr.slice(0, 6);
    popularItems.forEach(p => {
        grid.innerHTML += `
            <div class="bg-white rounded-2xl shadow-md p-6 text-center transition hover:scale-105 hover:shadow-xl duration-300">
                <img src="../${p.image_url}" alt="${p.name}" class="w-full h-48 object-contain mb-4">
                <h4 class="font-semibold text-lg mb-2">${p.name}</h4>
                <p class="text-purple-600 font-bold mb-3">₱${parseFloat(p.price).toLocaleString()}</p>
                <button onclick="addToCart(${p.product_id})" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// daily product: changes once per day 
function renderProductOfDay(productsArr) {
    const container = document.getElementById("productOfDay");
    if (!container || productsArr.length === 0) return;

    const dayCount = Math.floor(Date.now() / 86400000); 
    const index = dayCount % productsArr.length;
    const p = productsArr[index];

    container.innerHTML = `
        <div class="flex-none bg-gray-50 rounded-3xl shadow p-6 flex flex-col md:flex-row items-center gap-6 min-h-[250px] w-full">
            <div class="w-full md:w-64 h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img src="../${p.image_url}" alt="${p.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1">
                <h4 class="text-2xl font-bold mb-2">${p.name}</h4>
                <p class="text-gray-600 mb-3">${p.description || ""}</p>
                <p class="text-purple-600 font-bold text-lg mb-4">₱${parseFloat(p.price).toLocaleString()}</p>
                <button onclick="addToCart(${p.product_id})" class="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function startRecommendedCarousel() {
    if (typeof startCarousel === "function") startCarousel();
    else if (typeof startSliding === "function") startSliding();
    else console.warn("carousel start function not found");
}

async function checkout() {
    try {
        // send session cookie so PHP sees the session
        const res = await fetch("../backend/checkout.php", {
            method: "POST",
            credentials: 'same-origin' 
        });

        const text = await res.text();

        let data;
        try {
            data = text ? JSON.parse(text) : null;
        } catch (err) {
            console.error("Invalid JSON from checkout.php:", text);
            throw new Error("Server returned invalid response. Check server logs (500).");
        }

        if (!data) {
            throw new Error("Empty response from server.");
        }

        if (data.success) {
            alert("Order placed! Order ID: " + (data.order_id || "unknown"));
            cart = [];
            saveCart();
            updateCartDisplay();
            toggleCart();
        } else {
            alert("Checkout failed: " + (data.message || "Unknown error"));
        }
    } catch (err) {
        console.error("Checkout error:", err);
        alert("Checkout failed: " + err.message);
    }
}

window.addToCart = addToCart;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeItem = removeItem;
window.removeAllItems = removeAllItems;
window.toggleCart = toggleCart;
window.checkout = checkout;

document.addEventListener("DOMContentLoaded", async () => {
    if (typeof loadNavbar === "function") loadNavbar();

    const ok = await checkAuth();
    if (!ok) return;

    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartDisplay();

    document.getElementById("cartOverlay")?.addEventListener("click", toggleCart);

    products = await fetchProducts();
    window.products = products;

    if (products.length > 0) {
        renderProductOfDay(products);
        renderRecommendedFlex(products);
        renderPopularGrid(products);
        startRecommendedCarousel();
    }

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
});