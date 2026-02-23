function loadNavbar() {
    const navbarContainer = document.getElementById("navbar");

    navbarContainer.innerHTML = `
        <header class="bg-white shadow-md sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                
                <div class="flex items-center space-x-3 cursor-pointer">
                    <a href="main.html" class="flex items-center space-x-3">
                        <img src="/hermeticart/assets/images/hermeticartlogo.jpg" alt="HermetiCart Logo" class="w-10 h-10 object-contain">
                        <h1 class="text-2xl font-bold rainbow-text">HermetiCart</h1>
                    </a>
                    <span id="navUser" class="ml-3 text-sm text-gray-700 hidden"></span>
                </div>

                <!-- Desktop Menu -->
                <nav class="hidden md:flex space-x-6 font-medium items-center">
                    <a href="main.html" class="hover:text-purple-600 transition">Home</a>
                    <a href="shop.html" class="hover:text-purple-600 transition">Shop</a>
                    <a href="javascript:void(0)" onclick="toggleCart()" class="hover:text-purple-600 transition">Cart (<span id="cartCount">0</span>)</a>
                    <a href="javascript:void(0)" id="logoutNav" class="hover:text-purple-600 transition hidden">Logout</a>
                </nav>

                <button id="menuBtn" class="md:hidden text-2xl text-purple-600">☰</button>
            </div>

            <!-- Mobile Dropdown -->
            <div id="mobileMenu" class="hidden md:hidden px-6 pb-4 space-y-2 font-medium">
                <a href="main.html" class="block hover:text-purple-600">Home</a>
                <a href="shop.html" class="block hover:text-purple-600">Shop</a>
                <a href="javascript:void(0)" onclick="toggleCart()" class="block hover:text-purple-600">Cart (<span id="cartCountMobile">0</span>)</a>
                <a href="javascript:void(0)" id="logoutMobile" class="block hover:text-purple-600 hidden">Logout</a>
            </div>
        </header>
    `;

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // hook up logout link if logout function is already defined later
    const logoutNav = document.getElementById("logoutNav");
    const logoutMobile = document.getElementById("logoutMobile");

    if (logoutNav) {
        logoutNav.addEventListener("click", () => {
            if (typeof logout === 'function') logout();
            else window.location.href = "login.html";
        });
    }

    if (logoutMobile) {
        logoutMobile.addEventListener("click", () => {
            if (typeof logout === 'function') logout();
            else window.location.href = "login.html";
        });
    }
}

document.addEventListener("DOMContentLoaded", loadNavbar);