const recommendedContainer = document.getElementById("recommendedProducts");
const wrapper = document.getElementById("recommendedWrapper");

let currentIndex = 0;

function startCarousel() {
    if (!recommendedContainer) return;
    const totalItems = recommendedContainer.children.length;
    const itemWidth = recommendedContainer.children[0].offsetWidth + 24;

    setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalItems) currentIndex = 0;
        recommendedContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }, 1000);
}

// Pause on hover
if (wrapper) {
    wrapper.addEventListener("mouseenter", () => recommendedContainer.style.transition = "none");
    wrapper.addEventListener("mouseleave", () => recommendedContainer.style.transition = "transform 0.5s ease");
}
