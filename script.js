// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // ===== تهيئة المتغيرات =====
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // الوضع الداكن
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // الفلترة
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== PRODUCT POPUP =====
    const popup = document.getElementById("productPopup");
    const popupImg = document.getElementById("popupImg");
    const popupTitle = document.getElementById("popupTitle");
    const popupDesc = document.getElementById("popupDesc");
    const popupPrice = document.getElementById("popupPrice");
    const popupClose = document.querySelector(".popup-close");

    // event: click on product
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            const basePrice = item.querySelector(".price").innerText;

            popupImg.src = item.querySelector("img").src;
            popupTitle.innerText = item.querySelector("h4").innerText;
            popupDesc.innerText = item.querySelector("p").innerText;

            document.getElementById("priceSmall").value = basePrice;
            document.getElementById("priceMedium").value = basePrice;
            document.getElementById("priceLarge").value = basePrice;

            popupPrice.innerText = basePrice;

            popup.style.display = "flex";
        });
    });

    popupClose.onclick = () => popup.style.display = "none";

    popup.onclick = e => {
        if (e.target === popup) popup.style.display = "none";
    };

}); // END DOMContentLoaded
