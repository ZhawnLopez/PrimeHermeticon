function loadNavbar() {
    const navbarContainer = document.getElementById("navbar");

    navbarContainer.innerHTML = `
        <header class="bg-white shadow-md sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                
                <!-- Logo + Brand -->
                <div class="flex items-center space-x-3 cursor-pointer">
                    
                    <img src="assets/images/hermeticartlogo.jpg" 
                         alt="HermetiCart Logo" 
                         class="w-10 h-10 object-contain">

                    <h1 class="text-2xl font-bold rainbow-text">
                        HermetiCart
                    </h1>
                </div>

                <!-- Desktop Menu -->
                <nav class="hidden md:flex space-x-8 font-medium">
                    <a href="main.html" class="hover:text-purple-600 transition">Home</a>
                    <a href="#" class="hover:text-purple-600 transition">Shop</a>
                    <a href="#" class="hover:text-purple-600 transition">Cart (<span id="cartCount">0</span>)</a>
                    <a href="#" class="hover:text-purple-600 transition">Profile</a>
                </nav>

                <!-- Mobile Button -->
                <button id="menuBtn" class="md:hidden text-2xl text-purple-600">
                    ☰
                </button>
            </div>

            <!-- Mobile Dropdown -->
            <div id="mobileMenu" class="hidden md:hidden px-6 pb-4 space-y-2 font-medium">
                <a href="main.html" class="block hover:text-purple-600">Home</a>
                <a href="#" class="block hover:text-purple-600">Shop</a>
                <a href="#" class="block hover:text-purple-600">Cart (<span id="cartCountMobile">0</span>)</a>
                <a href="#" class="block hover:text-purple-600">Profile</a>
            </div>
        </header>
    `;

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

document.addEventListener("DOMContentLoaded", loadNavbar);
