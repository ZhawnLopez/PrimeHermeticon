function loadNavbar() {
    const navbarContainer = document.getElementById("navbar");

    navbarContainer.innerHTML = `
        <header style="
            background: rgba(13,15,20,0.97);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(201,168,76,0.15);
            position: sticky;
            top: 0;
            z-index: 100;
        ">
            <div style="max-width:1280px; margin:0 auto; padding:0 2rem; height:68px; display:flex; justify-content:space-between; align-items:center;">

                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <a href="main.html" style="display:flex; align-items:center; gap:0.75rem; text-decoration:none;">
                        <img src="/hermeticart/assets/images/hermeticartlogo.jpg" alt="HermetiCart" style="width:36px; height:36px; object-fit:contain; border-radius:6px; border:1px solid rgba(201,168,76,0.3);">
                        <span style="font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:600; color:#c9a84c; letter-spacing:0.06em; animation:logoSettle 2.4s cubic-bezier(0.16,1,0.3,1) forwards;">HermetiCart</span>
                        <style>
                        @keyframes logoSettle {
                            0%   { letter-spacing:0.32em; opacity:0.4; }
                            100% { letter-spacing:0.06em; opacity:1; }
                        }
                        </style>
                    </a>
                    <span id="navUser" style="
                        margin-left:0.5rem;
                        font-size:0.72rem;
                        color:#8a8fa8;
                        letter-spacing:0.08em;
                        text-transform:uppercase;
                        border-left:1px solid rgba(201,168,76,0.2);
                        padding-left:0.75rem;
                        display:none;
                        font-family:'DM Sans',sans-serif;
                    "></span>
                </div>

                <nav style="display:flex; gap:1.75rem; align-items:center;" class="desktop-nav">
                    <a href="main.html" class="nav-link">Home</a>
                    <a href="shop.html" class="nav-link">Shop</a>
                    <a href="javascript:void(0)" onclick="toggleCart()" class="nav-link nav-cart">
                        Cart&nbsp;<span id="cartCount" style="
                            background:rgba(201,168,76,0.15);
                            color:#c9a84c;
                            border:1px solid rgba(201,168,76,0.3);
                            border-radius:20px;
                            padding:1px 8px;
                            font-size:0.72rem;
                            font-weight:500;
                        ">0</span>
                    </a>
                    <a href="admin.html" id="adminNav" class="nav-link" style="display:none; color:#c9a84c; border:1px solid rgba(201,168,76,0.3); padding:4px 12px; border-radius:6px;">Dashboard</a>
                    <a href="javascript:void(0)" id="logoutNav" class="nav-link" style="display:none; color:#c0454a;">Logout</a>
                </nav>

                <button id="menuBtn" style="
                    display:none;
                    background:none;
                    border:1px solid rgba(201,168,76,0.2);
                    color:#c9a84c;
                    width:38px; height:38px;
                    border-radius:8px;
                    font-size:1.1rem;
                    cursor:pointer;
                    align-items:center;
                    justify-content:center;
                ">☰</button>
            </div>

            <div id="mobileMenu" style="
                display:none;
                padding:1rem 2rem 1.5rem;
                border-top:1px solid rgba(201,168,76,0.1);
                flex-direction:column;
                gap:0.75rem;
            ">
                <a href="main.html" class="nav-link-mobile">Home</a>
                <a href="shop.html" class="nav-link-mobile">Shop</a>
                <a href="javascript:void(0)" onclick="toggleCart()" class="nav-link-mobile">Cart (<span id="cartCountMobile">0</span>)</a>
                <a href="admin.html" id="adminMobile" class="nav-link-mobile" style="display:none; color:#c9a84c;">Dashboard</a>
                <a href="javascript:void(0)" id="logoutMobile" class="nav-link-mobile" style="display:none; color:#c0454a;">Logout</a>
            </div>
        </header>

        <style>
        .nav-link {
            color: #8a8fa8;
            text-decoration: none;
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-weight: 400;
            transition: color 0.2s;
            font-family: 'DM Sans', sans-serif;
        }
        .nav-link:hover { color: #c9a84c; }
        .nav-cart { color: #f0ead6 !important; }
        .nav-link-mobile {
            color: #8a8fa8;
            text-decoration: none;
            font-size: 0.85rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(201,168,76,0.08);
            font-family: 'DM Sans', sans-serif;
            transition: color 0.2s;
        }
        .nav-link-mobile:hover { color: #c9a84c; }

        @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            #menuBtn { display: flex !important; }
        }
        </style>
    `;

    document.getElementById("menuBtn").addEventListener("click", () => {
        const menu = document.getElementById("mobileMenu");
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });

    document.getElementById("logoutNav").addEventListener("click",    () => typeof logout === 'function' ? logout() : (window.location.href = "login.html"));
    document.getElementById("logoutMobile").addEventListener("click", () => typeof logout === 'function' ? logout() : (window.location.href = "login.html"));
}

function applyNavRole(data) {
    const navUser     = document.getElementById("navUser");
    const logoutNav   = document.getElementById("logoutNav");
    const logoutMob   = document.getElementById("logoutMobile");
    const adminNav    = document.getElementById("adminNav");
    const adminMob    = document.getElementById("adminMobile");

    if (navUser) {
        navUser.textContent = data.username ? `Hi, ${data.username}` : "";
        navUser.style.display = "inline";
    }
    if (logoutNav)   logoutNav.style.display   = "inline";
    if (logoutMob)   logoutMob.style.display    = "block";

    if (data.role === "admin") {
        if (adminNav) adminNav.style.display = "inline";
        if (adminMob) adminMob.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", loadNavbar);