function startCarousel() {
    const container = document.getElementById("recommendedProducts");
    const wrapper = document.getElementById("recommendedWrapper");

    if (!container || container.children.length === 0) return;

    const originalItems = Array.from(container.children);
    const totalItems = originalItems.length;
    const itemWidth = originalItems[0].offsetWidth + 24;

    let currentIndex = 0;
    let autoSlide;

    container.innerHTML = "";
    originalItems.forEach(item => container.appendChild(item));

    // clone first 2 items for smooth infinite loop
    for (let i = 0; i < 2; i++) {
        const clone = originalItems[i].cloneNode(true);
        container.appendChild(clone);
    }

    container.style.transition = "transform 0.5s ease";

    function goToSlide(index) {
        container.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    function nextSlide() {
        currentIndex++;
        goToSlide(currentIndex);

        if (currentIndex === totalItems) {
            setTimeout(() => {
                container.style.transition = "none";
                currentIndex = 0;
                goToSlide(currentIndex);
                setTimeout(() => {
                    container.style.transition = "transform 0.5s ease";
                }, 50);
            }, 500);
        }
    }

    function prevSlide() {
        if (currentIndex === 0) {
            container.style.transition = "none";
            currentIndex = totalItems;
            goToSlide(currentIndex);
            setTimeout(() => {
                container.style.transition = "transform 0.5s ease";
                currentIndex--;
                goToSlide(currentIndex);
            }, 50);
        } else {
            currentIndex--;
            goToSlide(currentIndex);
        }
    }

    autoSlide = setInterval(nextSlide, 3000);

    wrapper.addEventListener("mouseenter", () => clearInterval(autoSlide));
    wrapper.addEventListener("mouseleave", () => autoSlide = setInterval(nextSlide, 3000));

    if (!wrapper.querySelector(".carousel-prev")) {
        const prevBtn = document.createElement("button");
        prevBtn.innerHTML = "◀";
        prevBtn.className = "carousel-prev absolute left-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full z-10 hover:bg-purple-700";
        wrapper.appendChild(prevBtn);
        prevBtn.addEventListener("click", prevSlide);
    }

    if (!wrapper.querySelector(".carousel-next")) {
        const nextBtn = document.createElement("button");
        nextBtn.innerHTML = "▶";
        nextBtn.className = "carousel-next absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full z-10 hover:bg-purple-700";
        wrapper.appendChild(nextBtn);
        nextBtn.addEventListener("click", nextSlide);
    }

    let startX = 0;
    let isDragging = false;

    container.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX;
        container.style.transition = "none";
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const diff = e.pageX - startX;
        container.style.transform = `translateX(${-(currentIndex * itemWidth) + diff}px)`;
    });

    container.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.pageX - startX;

        if (diff < -50) nextSlide();
        else if (diff > 50) prevSlide();
        else goToSlide(currentIndex);

        container.style.transition = "transform 0.5s ease";
    });

    container.addEventListener("mouseleave", () => {
        if (isDragging) {
            isDragging = false;
            goToSlide(currentIndex);
            container.style.transition = "transform 0.5s ease";
        }
    });

    container.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    container.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;

        if (diff < -50) nextSlide();
        else if (diff > 50) prevSlide();
    });
}