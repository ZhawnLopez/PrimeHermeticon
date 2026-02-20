document.addEventListener("DOMContentLoaded", () => {

    const heroCard = document.getElementById("heroCard");
    const bg1 = document.getElementById("heroBg1");
    const bg2 = document.getElementById("heroBg2");
    const title = document.getElementById("heroTitle");
    const subtitle = document.getElementById("heroSubtitle");
    const button = document.getElementById("heroButton");

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

        if (index === 4) { // dark theme
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

    // auto rotate bg themes
    setInterval(() => {
        currentTheme++;
        if (currentTheme >= themes.length) currentTheme = 0;
        applyTheme(currentTheme);
    }, 5000);

    // -breathing anim
    if (heroCard) {
        heroCard.style.animation = "breathe 6s ease-in-out infinite";
    }

    // page bg scroll smooth transition
    const bgLayer1 = document.getElementById("bgLayer1");
    const bgLayer2 = document.getElementById("bgLayer2");
    let activePageLayer = bgLayer1;

    const sections = [
        { id: "heroSection", className: "bg-hero" },
        { id: "productSection", className: "bg-product" },
        { id: "recommendedSection", className: "bg-recommended" }
    ];

    if (bgLayer1) bgLayer1.classList.add("bg-hero");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = sections.find(sec => sec.id === entry.target.id);
                if (!section) return;

                const nextLayer = activePageLayer === bgLayer1 ? bgLayer2 : bgLayer1;

                nextLayer.className = "fixed inset-0 -z-10 transition-opacity duration-1000 opacity-0";
                nextLayer.classList.add(section.className);

                nextLayer.style.opacity = "1";
                activePageLayer.style.opacity = "0";

                activePageLayer = nextLayer;
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(sec => {
        const element = document.getElementById(sec.id);
        if (element) observer.observe(element);
    });

});
