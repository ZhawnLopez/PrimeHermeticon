document.addEventListener("DOMContentLoaded", async () => {
    const heroCard = document.getElementById("heroCard");
    const bg1 = document.getElementById("heroBg1");
    const bg2 = document.getElementById("heroBg2");
    const heroImage = document.getElementById("heroImage"); 
    const title = document.getElementById("heroTitle");
    const subtitle = document.getElementById("heroSubtitle");
    const button = document.getElementById("heroButton");

    let products = [];

    try {
        const response = await fetch("../backend/get_products.php");
        products = await response.json();
        products = products.filter(p => parseInt(p.stock_quantity) > 0);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return;
    }

    const heroProduct = products.length > 0 ? products[0] : null;
    if (heroProduct && heroImage) {
        heroImage.src = `../assets/images/${heroProduct.image_url}`;
        title.textContent = heroProduct.name;
        subtitle.textContent = heroProduct.description;
        button.onclick = () => addToCart(heroProduct.product_id);
    }

    const themes = [
        "hero-theme-1",
        "hero-theme-2",
        "hero-theme-3",
        "hero-theme-4",
        "hero-theme-5"
    ];

    let currentTheme = 0;
    let activeLayer = bg1;

    function applyTheme(index) {
        const nextLayer = activeLayer === bg1 ? bg2 : bg1;

        nextLayer.className = "absolute inset-0 transition-opacity duration-1000 opacity-0";
        nextLayer.classList.add(themes[index]);

        nextLayer.style.opacity = "1";
        activeLayer.style.opacity = "0";
        activeLayer = nextLayer;

        if (index === 4) {
            title.className = "text-4xl font-bold mb-4 text-white transition-colors duration-700";
            subtitle.className = "text-lg mb-6 text-gray-300 transition-colors duration-700";
            button.className = "px-6 py-2 rounded-lg font-semibold bg-white text-gray-900 transition-all duration-500";
        } else {
            title.className = "text-4xl font-bold mb-4 text-white transition-colors duration-700";
            subtitle.className = "text-lg mb-6 text-gray-100 transition-colors duration-700";
            button.className = "px-6 py-2 rounded-lg font-semibold bg-white text-gray-900 transition-all duration-500";
        }
    }

    applyTheme(currentTheme);

    setInterval(() => {
        currentTheme++;
        if (currentTheme >= themes.length) currentTheme = 0;
        applyTheme(currentTheme);
    }, 5000);

    if (heroCard) {
        heroCard.style.animation = "breathe 6s ease-in-out infinite";
    }
});