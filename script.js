document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("productPopup");
    const popupImg = document.getElementById("popupImg");
    const popupTitle = document.getElementById("popupTitle");
    const popupDesc = document.getElementById("popupDesc");
    const popupPrice = document.getElementById("popupPrice");
    const popupClose = document.querySelector(".popup-close");

    const espressoSection = document.getElementById("espressoSection");
    const sizeSection = document.getElementById("sizeSection");

    const langBtn = document.getElementById("lang-toggle");
    const themeBtn = document.getElementById("theme-toggle-btn");

    let currentLang = localStorage.getItem("lovistaLang") || "ar";
    let currentTheme = localStorage.getItem("lovistaTheme") || "dark";
    let currentProductType = "normal";
    let currentSizes = null;

    /* ================= LANGUAGE SYSTEM ================= */

    function applyLanguage() {
        document.querySelectorAll("[data-ar]").forEach(el => {
            const txt = currentLang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
            if (txt !== null) el.textContent = txt;
        });

        langBtn.textContent = currentLang === "ar" ? "EN" : "AR";

        document.documentElement.lang = currentLang === "ar" ? "ar" : "en";
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    }

    applyLanguage();

    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "en" : "ar";
        localStorage.setItem("lovistaLang", currentLang);
        applyLanguage();
    });

    /* ================= THEME SWITCH ================= */

    function applyTheme() {
        if (currentTheme === "light") {
            document.body.classList.add("light-theme");
            themeBtn.textContent = "☼";
        } else {
            document.body.classList.remove("light-theme");
            themeBtn.textContent = "☾";
        }
    }

    applyTheme();

    themeBtn.addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("lovistaTheme", currentTheme);
        applyTheme();
    });

    /* ================= OPEN POPUP ================= */

    function openPopupForItem(item) {
        const type = item.dataset.type;
        currentProductType = type;

        const imgSrc = item.dataset.img || item.querySelector("img")?.src;
        const arName = item.getAttribute("data-ar-name");
        const enName = item.getAttribute("data-en-name");
        const arDesc = item.getAttribute("data-ar-desc");
        const enDesc = item.getAttribute("data-en-desc");

        popupImg.src = imgSrc;

        popupTitle.setAttribute("data-ar", arName);
        popupTitle.setAttribute("data-en", enName);

        popupDesc.setAttribute("data-ar", arDesc);
        popupDesc.setAttribute("data-en", enDesc);

        if (type === "espresso") {
            espressoSection.style.display = "block";
            sizeSection.style.display = "none";
        } else {
            espressoSection.style.display = "none";
            sizeSection.style.display = "block";

            const s = item.querySelector(".product-sizes");
            currentSizes = {
                small: parseFloat(s.dataset.small),
                medium: parseFloat(s.dataset.medium),
                large: parseFloat(s.dataset.large)
            };
        }

        // Reset
        document.querySelectorAll("input[name='size']").forEach(r => r.checked = (r.value === "medium"));
        document.querySelectorAll("input[name='milk']").forEach(r => r.checked = (r.value === "0.000"));
        document.querySelectorAll("input[name='espresso-type']").forEach(r => r.checked = (r.value === "single"));
        document.querySelectorAll(".addons-group input[type='checkbox']").forEach(ch => ch.checked = false);

        applyLanguage();
        calculateTotal();

        popup.style.display = "flex";
    }

    document.querySelectorAll(".menu-item .open-popup").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const item = e.target.closest(".menu-item");
            openPopupForItem(item);
        });
    });

    /* ================= CLOSE POPUP ================= */

    function closePopup() {
        popup.style.display = "none";
    }

    popupClose.addEventListener("click", closePopup);

    popup.addEventListener("click", (e) => {
        if (e.target === popup) closePopup();
    });

    /* ================= TOTAL CALC ================= */

    function calculateTotal() {
        let basePrice = 0;

        if (currentProductType === "espresso") {
            const espressoChoice = document.querySelector("input[name='espresso-type']:checked");
            basePrice = parseFloat(espressoChoice.dataset.price);
        } else {
            const sizeChoice = document.querySelector("input[name='size']:checked").value;
            basePrice = currentSizes[sizeChoice];
        }

        let addonsTotal = 0;
        document.querySelectorAll(".addons-group input[type='checkbox']:checked").forEach(ch => {
            addonsTotal += parseFloat(ch.value);
        });

        const milkChoice = document.querySelector("input[name='milk']:checked");
        const milkAdd = parseFloat(milkChoice.value);

        const total = basePrice + addonsTotal + milkAdd;

        popupPrice.textContent = total.toFixed(3) + " BD";
    }

    document.querySelectorAll("input").forEach(i => {
        i.addEventListener("change", calculateTotal);
    });

});
