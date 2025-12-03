const menuItemsData = {
    espresso: {
        ar: { name: "اسبريسو", description: "قهوة مركزة بنكهة قوية" },
        en: { name: "Espresso", description: "Concentrated coffee with a strong flavor" },
        image: "espresso.jpg",
        isEspresso: true,
        prices: {
            single: 0.500,
            double: 0.800
        }
    },
    spanish_latte: {
        ar: { name: "سبانش لاتيه", description: "لاتيه بنكهة الحليب المكثف" },
        en: { name: "Spanish Latte", description: "Latte with condensed milk flavor" },
        image: "spanish_latte.jpg",
        isEspresso: false,
        prices: {
            small: 1.500,
            medium: 1.800,
            large: 2.100
        }
    },
    caramel_latte: {
        ar: { name: "كراميل لاتيه", description: "لاتيه بنكهة الكراميل الغنية" },
        en: { name: "Caramel Latte", description: "Rich caramel flavored latte" },
        image: "caramel_latte.jpg",
        isEspresso: false,
        prices: {
            small: 1.500,
            medium: 1.800,
            large: 2.100
        }
    },
    latte: {
        ar: { name: "لاتيه", description: "اسبريسو مع حليب مبخر" },
        en: { name: "Latte", description: "Espresso with steamed milk" },
        image: "latte.jpg",
        isEspresso: false,
        prices: {
            small: 1.000,
            medium: 1.300,
            large: 1.600
        }
    },
    v60: {
        ar: { name: "V60", description: "قهوة مفلترة بطريقة التقطير" },
        en: { name: "V60", description: "Filtered coffee using the drip method" },
        image: "v60.jpg",
        isEspresso: false,
        prices: {
            small: 1.000,
            medium: 1.300,
            large: 1.600
        }
    },
    cold_brew: {
        ar: { name: "كولد برو", description: "قهوة باردة محضرة لمدة 24 ساعة" },
        en: { name: "Cold Brew", description: "Cold coffee prepared for 24 hours" },
        image: "cold_brew.jpg",
        isEspresso: false,
        prices: {
            small: 1.500,
            medium: 1.800,
            large: 2.100
        }
    },
    red_tea: {
        ar: { name: "شاي أحمر", description: "شاي أحمر كلاسيكي" },
        en: { name: "Red Tea", description: "Classic red tea" },
        image: "red_tea.jpg",
        isEspresso: false,
        prices: {
            small: 0.200,
            medium: 0.400,
            large: 0.600
        }
    },
    mint_tea: {
        ar: { name: "شاي نعناع", description: "شاي أحمر مع النعناع المنعش" },
        en: { name: "Mint Tea", description: "Red tea with refreshing mint" },
        image: "mint_tea.jpg",
        isEspresso: false,
        prices: {
            small: 0.200,
            medium: 0.400,
            large: 0.600
        }
    },
    karak_tea: {
        ar: { name: "شاي كرك", description: "شاي هندي بالتوابل والحليب" },
        en: { name: "Karak Tea", description: "Indian tea with spices and milk" },
        image: "karak_tea.jpg",
        isEspresso: false,
        prices: {
            small: 0.200,
            medium: 0.400,
            large: 0.600
        }
    }
};

// الإضافات المتاحة
const addonsData = {
    ar: {
        extra_shot: { name: "شوت إضافي", price: 0.300 },
        oat_milk: { name: "حليب الشوفان", price: 0.400 },
        extra_syrup: { name: "شراب إضافي (نكهة)", price: 0.200 },
        whipped_cream: { name: "كريمة مخفوقة", price: 0.250 }
    },
    en: {
        extra_shot: { name: "Extra Shot", price: 0.300 },
        oat_milk: { name: "Oat Milk", price: 0.400 },
        extra_syrup: { name: "Extra Syrup (Flavor)", price: 0.200 },
        whipped_cream: { name: "Whipped Cream", price: 0.250 }
    }
};

// حالة التخصيص الحالية
let currentItem = null;
let currentPrice = 0;
let currentLang = 'ar'; // اللغة الافتراضية

// العناصر الرئيسية في الـ DOM
const popupOverlay = document.getElementById('popup-overlay');
const closePopupBtn = document.querySelector('.close-popup');
const sizeOptionsDiv = document.getElementById('size-options');
const espressoOptionsDiv = document.getElementById('espresso-options');
const addonsOptionsDiv = document.getElementById('addon-options');
const finalPriceSpan = document.getElementById('final-price');
const sizesSection = document.getElementById('sizes-section');
const espressoSection = document.getElementById('espresso-section');
const customizeButtons = document.querySelectorAll('.customize-btn');
const languageBtn = document.getElementById('language-btn');

// =================================================
// 1. وظائف التحكم في السعر
// =================================================

function formatPrice(price) {
    return price.toFixed(3) + ' BD';
}

function calculateFinalPrice() {
    if (!currentItem) return;

    let basePrice = 0;
    
    // 1. حساب سعر الحجم/الشوت
    const selectedSizeElement = sizeOptionsDiv.querySelector('.size-option.selected');
    const selectedShotElement = espressoOptionsDiv.querySelector('.espresso-option.selected');

    if (currentItem.isEspresso && selectedShotElement) {
        const shotType = selectedShotElement.dataset.shot;
        basePrice = currentItem.prices[shotType];
    } else if (!currentItem.isEspresso && selectedSizeElement) {
        const size = selectedSizeElement.dataset.size;
        basePrice = currentItem.prices[size];
    }

    // 2. حساب سعر الإضافات
    let addonsTotal = 0;
    const selectedAddons = addonsOptionsDiv.querySelectorAll('input[type="checkbox"]:checked');
    
    selectedAddons.forEach(checkbox => {
        const addonKey = checkbox.dataset.addon;
        addonsTotal += addonsData[currentLang][addonKey].price;
    });

    currentPrice = basePrice + addonsTotal;
    finalPriceSpan.textContent = formatPrice(currentPrice);
}

// =================================================
// 2. وظائف بناء الـ Popup
// =================================================

function renderSizeOptions(item) {
    sizeOptionsDiv.innerHTML = '';
    const sizes = ['small', 'medium', 'large'];
    const sizeNames = {
        small: currentLang === 'ar' ? 'صغير' : 'Small',
        medium: currentLang === 'ar' ? 'وسط' : 'Medium',
        large: currentLang === 'ar' ? 'كبير' : 'Large'
    };

    sizes.forEach(size => {
        const price = item.prices[size];
        if (price !== undefined) {
            const div = document.createElement('div');
            div.className = 'size-option';
            div.dataset.size = size;
            div.innerHTML = `
                <span>${sizeNames[size]}</span>
                <span>${formatPrice(price)}</span>
            `;
            div.addEventListener('click', () => {
                // إزالة التحديد من الجميع
                sizeOptionsDiv.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                // تحديد العنصر الحالي
                div.classList.add('selected');
                calculateFinalPrice();
            });
            sizeOptionsDiv.appendChild(div);
        }
    });

    // تحديد الحجم الأصغر كافتراضي
    const defaultSize = sizeOptionsDiv.querySelector('.size-option');
    if (defaultSize) {
        defaultSize.classList.add('selected');
    }
}

function renderEspressoOptions(item) {
    espressoOptionsDiv.innerHTML = '';
    const shots = ['single', 'double'];
    const shotNames = {
        single: currentLang === 'ar' ? 'شوت واحد' : 'Single Shot',
        double: currentLang === 'ar' ? 'شوت مزدوج' : 'Double Shot'
    };

    shots.forEach(shot => {
        const price = item.prices[shot];
        if (price !== undefined) {
            const div = document.createElement('div');
            div.className = 'espresso-option';
            div.dataset.shot = shot;
            div.innerHTML = `
                <span>${shotNames[shot]}</span>
                <span>${formatPrice(price)}</span>
            `;
            div.addEventListener('click', () => {
                espressoOptionsDiv.querySelectorAll('.espresso-option').forEach(opt => opt.classList.remove('selected'));
                div.classList.add('selected');
                calculateFinalPrice();
            });
            espressoOptionsDiv.appendChild(div);
        }
    });

    // تحديد الشوت الافتراضي
    const defaultShot = espressoOptionsDiv.querySelector('.espresso-option');
    if (defaultShot) {
        defaultShot.classList.add('selected');
    }
}

function renderAddons() {
    addonsOptionsDiv.innerHTML = '';
    const addons = addonsData[currentLang];

    for (const key in addons) {
        const addon = addons[key];
        const div = document.createElement('div');
        div.className = 'addon-item';
        div.innerHTML = `
            <label for="addon-${key}">${addon.name}</label>
            <span class="addon-price">+${formatPrice(addon.price)}</span>
            <input type="checkbox" id="addon-${key}" data-addon="${key}">
        `;
        const checkbox = div.querySelector('input');
        checkbox.addEventListener('change', calculateFinalPrice);
        addonsOptionsDiv.appendChild(div);
    }
}

function openPopup(itemId) {
    currentItem = menuItemsData[itemId];
    if (!currentItem) return;

    // تحديث محتوى الـ Popup
    document.getElementById('popup-image').src = currentItem.image;
    document.getElementById('popup-title').textContent = currentItem[currentLang].name;
    document.getElementById('popup-description').textContent = currentItem[currentLang].description;

    // إظهار وإخفاء أقسام الأحجام/الشوتات
    if (currentItem.isEspresso) {
        sizesSection.style.display = 'none';
        espressoSection.style.display = 'block';
        renderEspressoOptions(currentItem);
    } else {
        sizesSection.style.display = 'block';
        espressoSection.style.display = 'none';
        renderSizeOptions(currentItem);
    }

    // عرض الإضافات
    renderAddons();
    
    // حساب السعر الأولي
    calculateFinalPrice();

    // إظهار الـ Popup
    popupOverlay.classList.add('active');
}

function closePopup() {
    popupOverlay.classList.remove('active');
    currentItem = null;
    currentPrice = 0;
}

// =================================================
// 3. وظائف التحكم في اللغة
// =================================================

const translations = {
    ar: {
        'Customize': 'تخصيص',
        'All': 'الكل',
        'Hot': 'ساخنة',
        'Cold': 'باردة',
        'Tea': 'شاي',
        'Choose Size': 'اختر الحجم',
        'Choose Shots': 'اختر عدد الشوتات',
        'Optional Addons': 'الإضافات الاختيارية',
        'Final Price': 'السعر النهائي',
        'Add to Cart': 'أضف إلى السلة',
        'Welcome to': 'مرحباً بكم في',
        'Cyber Experience': 'تجربة سايبر لمذاق لا ينسى',
        'Follow us on Instagram': 'تابعنا على إنستغرام',
        'Hot Drinks': 'المشروبات الساخنة',
        'Cold Drinks': 'المشروبات الباردة',
        'Opening Hours': 'ساعات العمل',
        'Contact Us': 'للتواصل',
        'Address: Hamad Town, Bahrain': 'العنوان: مدينة حمد، البحرين',
        'We are pleased to serve you daily from 7 AM to 11 PM': 'نتشرف بخدمتكم يومياً من الساعة 7 صباحاً حتى 11 مساءً',
        'All Rights Reserved &copy; 2025 Lovista café | Cyber Design': 'جميع الحقوق محفوظة &copy; 2025 Lovista café | تصميم سايبر'
    },
    en: {
        'تخصيص': 'Customize',
        'الكل': 'All',
        'ساخنة': 'Hot',
        'باردة': 'Cold',
        'شاي': 'Tea',
        'اختر الحجم': 'Choose Size',
        'اختر عدد الشوتات': 'Choose Shots',
        'الإضافات الاختيارية': 'Optional Addons',
        'السعر النهائي': 'Final Price',
        'أضف إلى السلة': 'Add to Cart',
        'مرحباً بكم في': 'Welcome to',
        'تجربة سايبر لمذاق لا ينسى': 'A Cyber Experience for an Unforgettable Taste',
        'تابعنا على إنستغرام': 'Follow us on Instagram',
        'المشروبات الساخنة': 'Hot Drinks',
        'المشروبات الباردة': 'Cold Drinks',
        'ساعات العمل': 'Opening Hours',
        'للتواصل': 'Contact Us',
        'العنوان: مدينة حمد، البحرين': 'Address: Hamad Town, Bahrain',
        'نتشرف بخدمتكم يومياً من الساعة 7 صباحاً حتى 11 مساءً': 'We are pleased to serve you daily from 7 AM to 11 PM',
        'جميع الحقوق محفوظة &copy; 2025 Lovista café | تصميم سايبر': 'All Rights Reserved &copy; 2025 Lovista café | Cyber Design'
    }
};

function switchLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // تحديث النصوص باستخدام data attributes
    document.querySelectorAll('[data-ar]').forEach(element => {
        const arText = element.getAttribute('data-ar');
        const enText = element.getAttribute('data-en');
        
        if (lang === 'ar') {
            element.innerHTML = arText;
        } else {
            element.innerHTML = enText;
        }
    });

    // تحديث نصوص الأزرار التي ليس لديها data attributes
    languageBtn.querySelector('.lang-text').textContent = lang === 'ar' ? 'EN' : 'AR';
    
    // تحديث نصوص الـ Popup إذا كانت مفتوحة
    if (popupOverlay.classList.contains('active')) {
        // إعادة فتح الـ popup لتحديث المحتوى الداخلي (الأحجام والإضافات)
        openPopup(currentItem.id); 
    }
}

// =================================================
// 4. وظائف الفلترة
// =================================================

function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// =================================================
// 5. تهيئة المستمعات (Event Listeners)
// =================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. مستمعات أزرار التخصيص (Popup)
    customizeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.currentTarget.closest('.menu-item').dataset.id;
            // حفظ الـ ID في حالة التخصيص
            currentItem.id = itemId; 
            openPopup(itemId);
        });
    });

    // 2. إغلاق الـ Popup
    closePopupBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // 3. فلترة القائمة
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterMenu(e.target.dataset.filter);
        });
    });

    // 4. تبديل اللغة
    languageBtn.addEventListener('click', () => {
        const current = languageBtn.dataset.lang;
        const newLang = current === 'ar' ? 'en' : 'ar';
        languageBtn.dataset.lang = newLang;
        switchLanguage(newLang);
    });

    // 5. تبديل الثيم (لإبقاء وظيفة التبديل رغم أننا نستخدم الثيم الداكن افتراضياً)
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // تطبيق اللغة الافتراضية عند التحميل
    switchLanguage(currentLang);
});
