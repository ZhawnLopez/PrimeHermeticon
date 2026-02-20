// scroll based body bg
const sections = document.querySelectorAll("section[data-bg]");

window.addEventListener("scroll", () => {
    let currentBg = "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            currentBg = section.getAttribute("data-bg");
        }
    });

    if (currentBg) {
        document.body.style.transition = "background 1s ease";
        document.body.style.background = currentBg;
    }
});
