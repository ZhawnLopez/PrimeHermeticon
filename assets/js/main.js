let products = [];

async function fetchCart() {
    try {
        const res = await fetch("../backend/get_cart.php", { credentials: 'same-origin' });
        return await res.json(); 
    } catch (err) {
        console.error("Failed to fetch cart:", err);
        return [];
    }
}

async function addToCart(productId) {
    productId = Number(productId);
    try {
        const fd = new FormData();
        fd.append("product_id", productId);
        await fetch("../backend/add_to_cart.php", { method: "POST", body: fd, credentials: 'same-origin' });
        updateCartDisplay();
    } catch (err) {
        console.error("addToCart error:", err);
    }
}

async function increaseQty(productId) {
    productId = Number(productId);
    try {
        const cart = await fetchCart();
        const item = cart.find(i => Number(i.product_id) === productId);
        if (!item) return;
        const fd = new FormData();
        fd.append("product_id", productId);
        fd.append("quantity", item.quantity + 1);
        await fetch("../backend/update_cart_quantity.php", { method: "POST", body: fd, credentials: 'same-origin' });
        updateCartDisplay();
    } catch (err) {
        console.error("increaseQty error:", err);
    }
}

async function decreaseQty(productId) {
    productId = Number(productId);
    try {
        const cart = await fetchCart();
        const item = cart.find(i => Number(i.product_id) === productId);
        if (!item) return;
        const fd = new FormData();
        fd.append("product_id", productId);
        fd.append("quantity", item.quantity - 1); // backend deletes if <= 0
        await fetch("../backend/update_cart_quantity.php", { method: "POST", body: fd, credentials: 'same-origin' });
        updateCartDisplay();
    } catch (err) {
        console.error("decreaseQty error:", err);
    }
}

async function removeItem(productId) {
    productId = Number(productId);
    try {
        const fd = new FormData();
        fd.append("product_id", productId);
        await fetch("../backend/remove_from_cart.php", { method: "POST", body: fd, credentials: 'same-origin' });
        updateCartDisplay();
    } catch (err) {
        console.error("removeItem error:", err);
    }
}

async function removeAllItems() {
    if (!confirm("Remove all items from cart?")) return;
    try {
        const cart = await fetchCart();
        await Promise.all(cart.map(item => {
            const fd = new FormData();
            fd.append("product_id", item.product_id);
            return fetch("../backend/remove_from_cart.php", { method: "POST", body: fd, credentials: 'same-origin' });
        }));
        updateCartDisplay();
    } catch (err) {
        console.error("removeAllItems error:", err);
    }
}

function toggleCart() {
    const drawer  = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    const isOpen  = drawer.style.transform === "translateX(0%)";

    drawer.style.transform = isOpen ? "translateX(100%)" : "translateX(0%)";

    if (overlay) {
        overlay.style.display = isOpen ? "none" : "block";
    }

    if (!isOpen) updateCartDisplay();
}

async function updateCartDisplay() {
    const desktopCount  = document.getElementById("cartCount");
    const mobileCount   = document.getElementById("cartCountMobile");
    const drawerItems   = document.getElementById("drawerItems");
    const cartTotal     = document.getElementById("cartTotal");

    const cart = await fetchCart();

    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
    if (desktopCount) desktopCount.textContent = totalQty;
    if (mobileCount)  mobileCount.textContent  = totalQty;

    if (!drawerItems) return;

    drawerItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        drawerItems.innerHTML = `<p style="text-align:center; color:#8a8fa8; font-family:'DM Sans',sans-serif; font-size:0.85rem; letter-spacing:0.05em; margin-top:2rem;">Your cart is empty.</p>`;
        if (cartTotal) cartTotal.textContent = "₱0.00";
        return;
    }

    cart.forEach(item => {
        const price     = parseFloat(item.price);
        const itemTotal = price * item.quantity;
        totalPrice     += itemTotal;

        drawerItems.innerHTML += `
            <div style="border-bottom:1px solid rgba(201,168,76,0.12); padding-bottom:1rem;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.6rem;">
                    <p style="font-family:'Cormorant Garamond',serif; font-size:1rem; color:#f0ead6; flex:1; padding-right:0.5rem; line-height:1.3;">${item.name}</p>
                    <button onclick="removeItem(${item.product_id})" style="font-size:0.68rem; letter-spacing:0.08em; text-transform:uppercase; color:#8a8fa8; background:none; border:none; cursor:pointer; white-space:nowrap; padding:0; transition:color 0.2s;" onmouseover="this.style.color='#c0454a'" onmouseout="this.style.color='#8a8fa8'">Remove</button>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        <button onclick="decreaseQty(${item.product_id})" style="width:28px; height:28px; background:#1e2230; border:1px solid rgba(201,168,76,0.2); color:#c9a84c; border-radius:6px; cursor:pointer; font-size:1rem; line-height:1; transition:all 0.2s;" onmouseover="this.style.background='rgba(201,168,76,0.12)'" onmouseout="this.style.background='#1e2230'">−</button>
                        <span style="font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#f0ead6; min-width:20px; text-align:center;">${item.quantity}</span>
                        <button onclick="increaseQty(${item.product_id})" style="width:28px; height:28px; background:#1e2230; border:1px solid rgba(201,168,76,0.2); color:#c9a84c; border-radius:6px; cursor:pointer; font-size:1rem; line-height:1; transition:all 0.2s;" onmouseover="this.style.background='rgba(201,168,76,0.12)'" onmouseout="this.style.background='#1e2230'">+</button>
                    </div>
                    <p style="font-family:'DM Sans',sans-serif; font-size:0.95rem; font-weight:500; color:#c9a84c;">₱${itemTotal.toLocaleString()}</p>
                </div>
            </div>
        `;
    });

    if (cartTotal) cartTotal.textContent = "₱" + totalPrice.toLocaleString();
}


async function checkAuth() {
    try {
        const res  = await fetch("../backend/session_status.php", { credentials: 'same-origin' });
        const data = await res.json();
        if (!data.logged) {
            window.location.href = "login.html";
            return false;
        }
        if (typeof applyNavRole === 'function') applyNavRole(data);
        return true;
    } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = "login.html";
        return false;
    }
}

async function logout() {
    try {
        const res  = await fetch("../backend/logout.php", { method: 'POST', credentials: 'same-origin' });
        const data = await res.json();
        if (data.success) {
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
            <div style="flex:none; background:#181c26; border:1px solid rgba(201,168,76,0.12); border-radius:14px; padding:1.25rem; display:flex; flex-direction:column; align-items:center; min-width:240px; max-width:240px; transition:border-color 0.3s, transform 0.3s;" onmouseover="this.style.borderColor='rgba(201,168,76,0.3)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='rgba(201,168,76,0.12)'; this.style.transform='translateY(0)'">
                <div style="width:100%; height:160px; background:#0d0f14; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; overflow:hidden;">
                    <img src="../${p.image_url}" alt="${p.name}" style="max-height:140px; object-fit:contain; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.4)); transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                <h4 style="font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:600; color:#f0ead6; text-align:center; margin-bottom:0.4rem; line-height:1.3;">${p.name}</h4>
                <p style="font-family:'DM Sans',sans-serif; color:#c9a84c; font-size:0.9rem; font-weight:500; margin-bottom:1rem; text-align:center;">₱${parseFloat(p.price).toLocaleString()}</p>
                <button onclick="addToCart(${p.product_id})" class="btn-primary" style="width:100%;">Add to Cart</button>
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
            <div style="background:#181c26; border:1px solid rgba(201,168,76,0.1); border-radius:16px; padding:1.75rem; text-align:center; position:relative; overflow:hidden; transition:transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 24px 60px rgba(0,0,0,0.5)'; this.style.borderColor='rgba(201,168,76,0.25)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='rgba(201,168,76,0.1)'">
                <div style="background:#0d0f14; border-radius:10px; height:160px; display:flex; align-items:center; justify-content:center; margin-bottom:1.25rem; overflow:hidden;">
                    <img src="../${p.image_url}" alt="${p.name}" style="max-height:140px; object-fit:contain; filter:drop-shadow(0 6px 14px rgba(0,0,0,0.5)); transition:transform 0.4s;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                <h4 style="font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:600; color:#f0ead6; margin-bottom:0.4rem;">${p.name}</h4>
                <p style="font-family:'DM Sans',sans-serif; color:#c9a84c; font-size:1rem; font-weight:500; margin-bottom:1.25rem;">₱${parseFloat(p.price).toLocaleString()}</p>
                <button onclick="addToCart(${p.product_id})" class="btn-primary">Add to Cart</button>
            </div>
        `;
    });
}

async function renderProductOfDay() {
    const container = document.getElementById("productOfDay");
    if (!container) return;

    try {
        const res     = await fetch("../backend/get_product_of_day.php");
        const p       = await res.json();

        if (!p) {
            container.innerHTML = `<p class="text-gray-500">No product available today.</p>`;
            return;
        }

        container.innerHTML = `
            <div style="background:#181c26; border:1px solid rgba(201,168,76,0.15); border-radius:20px; padding:2rem; display:flex; flex-direction:row; align-items:center; gap:2rem; width:100%; flex-wrap:wrap; position:relative; overflow:hidden;">
                <div style="position:absolute; top:0; left:15%; right:15%; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent);"></div>
                <div style="width:220px; height:220px; min-width:180px; background:#0d0f14; border-radius:12px; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0;">
                    <img src="../${p.image_url}" alt="${p.name}" style="max-height:200px; object-fit:contain; filter:drop-shadow(0 8px 20px rgba(0,0,0,0.5)); transition:transform 0.4s ease;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
                </div>
                <div style="flex:1; min-width:200px;">
                    <p style="font-size:0.68rem; letter-spacing:0.18em; text-transform:uppercase; color:#c9a84c; font-family:'DM Sans',sans-serif; margin-bottom:0.5rem;">Today's Pick</p>
                    <h4 style="font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:700; color:#f0ead6; margin-bottom:0.75rem; line-height:1.2;">${p.name}</h4>
                    <p style="font-size:0.85rem; color:#8a8fa8; line-height:1.7; margin-bottom:1.25rem;">${p.description || ""}</p>
                    <p style="font-family:'DM Sans',sans-serif; font-size:1.2rem; font-weight:500; color:#c9a84c; margin-bottom:1.5rem;">₱${parseFloat(p.price).toLocaleString()}</p>
                    <button onclick="addToCart(${p.product_id})" class="btn-primary">Add to Cart</button>
                </div>
            </div>
        `;
    } catch (err) {
        console.error("renderProductOfDay error:", err);
        if (container) container.innerHTML = `<p class="text-red-500">Failed to load product.</p>`;
    }
}

function startRecommendedCarousel() {
    if (typeof startCarousel === "function") startCarousel();
    else if (typeof startSliding === "function") startSliding();
    else console.warn("carousel start function not found");
}


async function checkout() {
    try {
        const res  = await fetch("../backend/checkout.php", { method: "POST", credentials: 'same-origin' });
        const text = await res.text();
        let data;
        try {
            data = text ? JSON.parse(text) : null;
        } catch (err) {
            console.error("Invalid JSON from checkout.php:", text);
            throw new Error("Server returned invalid response.");
        }

        if (!data) throw new Error("Empty response from server.");

        if (data.success) {
            alert("Order placed! Order ID: " + (data.order_id || "unknown"));
            toggleCart();
            updateCartDisplay();
        } else {
            alert("Checkout failed: " + (data.message || "Unknown error"));
        }
    } catch (err) {
        console.error("Checkout error:", err);
        alert("Checkout failed: " + err.message);
    }
}


window.addToCart     = addToCart;
window.increaseQty   = increaseQty;
window.decreaseQty   = decreaseQty;
window.removeItem    = removeItem;
window.removeAllItems = removeAllItems;
window.toggleCart    = toggleCart;
window.checkout      = checkout;

document.addEventListener("DOMContentLoaded", async () => {
    if (typeof loadNavbar === "function") loadNavbar();

    const ok = await checkAuth();
    if (!ok) return;

    updateCartDisplay();

    document.getElementById("cartOverlay")?.addEventListener("click", () => toggleCart());

    products = await fetchProducts();
    window.products = products;

    if (products.length > 0) {
        renderRecommendedFlex(products);
        renderPopularGrid(products);
        startRecommendedCarousel();
    }

    await renderProductOfDay();

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
});