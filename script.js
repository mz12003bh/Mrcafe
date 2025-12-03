// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المتغيرات
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const languageBtn = document.querySelector('.language-btn');
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopupBtn = document.querySelector('.close-popup');
    
    // بيانات المنتجات مع الأسعار
    const productsData = {
        'اسبريسو': {
            name: { ar: 'اسبريسو', en: 'Espresso' },
            description: { ar: 'قهوة مركزة بنكهة قوية', en: 'Strong concentrated coffee' },
            image: 'espresso.jpg',
            category: 'hot',
            type: 'espresso',
            prices: {
                'single': { price: 0.500, display: 'Single Shot = 0.500 BD' },
                'double': { price: 0.800, display: 'Double Shot = 0.800 BD' }
            },
            basePrice: 0.500
        },
        'سبانش لاتيه': {
            name: { ar: 'سبانش لاتيه', en: 'Spanish Latte' },
            description: { ar: 'لاتيه بنكهة الحليب المكثف', en: 'Latte with condensed milk flavor' },
            image: 'spanish_latte.jpg',
            category: 'hot',
            type: 'normal',
            prices: {
                'small': { price: 1.500, display: 'Small = 1.500 BD' },
                'medium': { price: 1.800, display: 'Medium = 1.800 BD' },
                'large': { price: 2.100, display: 'Large = 2.100 BD' }
            },
            basePrice: 1.500
        },
        'كراميل لاتيه': {
            name: { ar: 'كراميل لاتيه', en: 'Caramel Latte' },
            description: { ar: 'لاتيه بنكهة الكراميل الغنية', en: 'Latte with rich caramel flavor' },
            image: 'caramel_latte.jpg',
            category: 'hot',
            type: 'normal',
            prices: {
                'small': { price: 1.500, display: 'Small = 1.500 BD' },
                'medium': { price: 1.800, display: 'Medium = 1.800 BD' },
                'large': { price: 2.100, display: 'Large = 2.100 BD' }
            },
            basePrice: 1.500
        },
        'لاتيه': {
            name: { ar: 'لاتيه', en: 'Latte' },
            description: { ar: 'اسبريسو مع حليب مبخر', en: 'Espresso with steamed milk' },
            image: 'latte.jpg',
            category: 'hot',
            type: 'normal',
            prices: {
                'small': { price: 1.000, display: 'Small = 1.000 BD' },
                'medium': { price: 1.300, display: 'Medium = 1.300 BD' },
                'large': { price: 1.600, display: 'Large = 1.600 BD' }
            },
            basePrice: 1.000
        },
        'V60': {
            name: { ar: 'V60', en: 'V60' },
            description: { ar: 'قهوة مفلترة بطريقة التقطير', en: 'Filter coffee using drip method' },
            image: 'v60.jpg',
            category: 'hot',
            type: 'normal',
            prices: {
                'small': { price: 1.000, display: 'Small = 1.000 BD' },
                'medium': { price: 1.300, display: 'Medium = 1.300 BD' },
                'large': { price: 1.600, display: 'Large = 1.600 BD' }
            },
            basePrice: 1.000
        },
        'كولد برو': {
            name: { ar: 'كولد برو', en: 'Cold Brew' },
            description: { ar: 'قهوة باردة محضرة لمدة 24 ساعة', en: 'Cold coffee prepared for 24 hours' },
            image: 'cold_brew.jpg',
            category: 'cold',
            type: 'normal',
            prices: {
                'small': { price: 1.500, display: 'Small = 1.500 BD' },
                'medium': { price: 1.800, display: 'Medium = 1.800 BD' },
                'large': { price: 2.100, display: 'Large = 2.100 BD' }
            },
            basePrice: 1.500
        },
        'شاي أحمر': {
            name: { ar: 'شاي أحمر', en: 'Red Tea' },
            description: { ar: 'شاي أحمر كلاسيكي', en: 'Classic red tea' },
            image: 'red_tea.jpg',
            category: 'tea',
            type: 'normal',
            prices: {
                'small': { price: 0.200, display: 'Small = 0.200 BD' },
                'medium': { price: 0.400, display: 'Medium = 0.400 BD' },
                'large': { price: 0.600, display: 'Large = 0.600 BD' }
            },
            basePrice: 0.200
        },
        'شاي نعناع': {
            name: { ar: 'شاي نعناع', en: 'Mint Tea' },
            description: { ar: 'شاي أحمر مع النعناع المنعش', en: 'Red tea with refreshing mint' },
            image: 'mint_tea.jpg',
            category: 'tea',
            type: 'normal',
            prices: {
                'small': { price: 0.200, display: 'Small = 0.200 BD' },
                'medium': { price: 0.400, display: 'Medium = 0.400 BD' },
                'large': { price: 0.600, display: 'Large = 0.600 BD' }
            },
            basePrice: 0.200
        },
        'شاي كرك': {
            name: { ar: 'شاي كرك', en: 'Karak Tea' },
            description: { ar: 'شاي هندي بالتوابل والحليب', en: 'Indian tea with spices and milk' },
            image: 'karak_tea.jpg',
            category: 'tea',
            type: 'normal',
            prices: {
                'small': { price: 0.200, display: 'Small = 0.200 BD' },
                'medium': { price: 0.400, display: 'Medium = 0.400 BD' },
                'large': { price: 0.600, display: 'Large = 0.600 BD' }
            },
            basePrice: 0.200
        }
    };

    // الإضافات مع الأسعار
    const addonsData = [
        { id: 'extra-shot', name: { ar: 'شوت إضافي', en: 'Extra Shot' }, price: 0.300 },
        { id: 'extra-syrup', name: { ar: 'شراب إضافي', en: 'Extra Syrup' }, price: 0.200 },
        { id: 'whipped-cream', name: { ar: 'قشدة مخفوقة', en: 'Whipped Cream' }, price: 0.250 },
        { id: 'caramel-drizzle', name: { ar: 'كراميل إضافي', en: 'Caramel Drizzle' }, price: 0.200 },
        { id: 'chocolate-chips', name: { ar: 'رقائق شوكولاتة', en: 'Chocolate Chips' }, price: 0.300 }
    ];

    // حالة التطبيق
    let currentLanguage = 'ar';
    let currentProduct = null;
    let selectedSize = null;
    let selectedEspresso = null;
    let selectedAddons = [];

    // التحقق من وجود تفضيل للوضع المظلم في التخزين المحلي
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // تبديل الوضع المظلم/الفاتح
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // حفظ التفضيل في التخزين المحلي
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // تبديل اللغة
    languageBtn.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        updateLanguage();
    });

    // تصفية المنتجات حسب الفئة
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // تصفية العناصر
            menuItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // إضافة تأثيرات التمرير
    const addScrollAnimation = () => {
        const elements = document.querySelectorAll('.menu-item, .welcome, .menu-category h3');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    // إضافة فئة CSS للتحريك
    const style = document.createElement('style');
    style.textContent = `
        .menu-item, .welcome, .menu-category h3 {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .menu-item.animate, .welcome.animate, .menu-category h3.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .menu-item:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .menu-item:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .menu-item:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .menu-item:nth-child(5) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);

    // تشغيل التحريك عند التمرير
    window.addEventListener('scroll', addScrollAnimation);
    
    // تشغيل التحريك عند تحميل الصفحة
    addScrollAnimation();

    // إضافة نقرة على عناصر القائمة لفتح popup
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('h4').textContent;
            currentProduct = productsData[productName];
            
            if (currentProduct) {
                openProductPopup(currentProduct);
            }
        });
    });

    // إغلاق popup
    closePopupBtn.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // فتح popup المنتج
    function openProductPopup(product) {
        currentProduct = product;
        selectedSize = null;
        selectedEspresso = null;
        selectedAddons = [];
        
        // تحديث محتوى popup
        document.getElementById('popup-image').src = product.image;
        document.getElementById('popup-title').textContent = product.name[currentLanguage];
        document.getElementById('popup-description').textContent = product.description[currentLanguage];
        
        // إعداد قسم الأحجام
        const sizesSection = document.getElementById('sizes-section');
        const espressoSection = document.getElementById('espresso-section');
        
        if (product.type === 'espresso') {
            sizesSection.style.display = 'none';
            espressoSection.style.display = 'block';
            setupEspressoOptions(product);
        } else {
            sizesSection.style.display = 'block';
            espressoSection.style.display = 'none';
            setupSizeOptions(product);
        }
        
        // إعداد الإضافات
        setupAddonsOptions();
        
        // تحديث السعر
        updatePrice();
        
        // إظهار popup
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // إعداد خيارات الأحجام
    function setupSizeOptions(product) {
        const sizeOptions = document.getElementById('size-options');
        sizeOptions.innerHTML = '';
        
        Object.entries(product.prices).forEach(([size, data]) => {
            const button = document.createElement('button');
            button.className = 'size-btn';
            button.innerHTML = `
                <span>${size === 'small' ? 'صغير' : size === 'medium' ? 'وسط' : 'كبير'}</span>
                <span>${data.price.toFixed(3)} BD</span>
            `;
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedSize = size;
                updatePrice();
            });
            
            sizeOptions.appendChild(button);
        });
    }

    // إعداد خيارات الإسبريسو
    function setupEspressoOptions(product) {
        const espressoOptions = document.getElementById('espresso-options');
        espressoOptions.innerHTML = '';
        
        Object.entries(product.prices).forEach(([type, data]) => {
            const button = document.createElement('button');
            button.className = 'espresso-btn';
            button.innerHTML = `
                <span>${type === 'single' ? 'شوت واحد' : 'شوتين'}</span>
                <span>${data.price.toFixed(3)} BD</span>
            `;
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.espresso-btn').forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedEspresso = type;
                updatePrice();
            });
            
            espressoOptions.appendChild(button);
        });
    }

    // إعداد خيارات الإضافات
    function setupAddonsOptions() {
        const addonOptions = document.getElementById('addon-options');
        addonOptions.innerHTML = '';
        
        addonsData.forEach(addon => {
            const div = document.createElement('div');
            div.className = 'addon-checkbox';
            div.innerHTML = `
                <label>
                    <input type="checkbox" id="${addon.id}" value="${addon.price}">
                    <span>${addon.name[currentLanguage]}</span>
                    <span style="margin-left: auto;">+${addon.price.toFixed(3)} BD</span>
                </label>
            `;
            
            const checkbox = div.querySelector('input');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedAddons.push({ id: addon.id, price: addon.price });
                } else {
                    selectedAddons = selectedAddons.filter(a => a.id !== addon.id);
                }
                updatePrice();
            });
            
            addonOptions.appendChild(div);
        });
    }

    // تحديث السعر
    function updatePrice() {
        let totalPrice = 0;
        
        if (currentProduct) {
            if (currentProduct.type === 'espresso' && selectedEspresso) {
                totalPrice = currentProduct.prices[selectedEspresso].price;
            } else if (selectedSize) {
                totalPrice = currentProduct.prices[selectedSize].price;
            } else {
                totalPrice = currentProduct.basePrice;
            }
            
            // إضافة أسعار الإضافات
            selectedAddons.forEach(addon => {
                totalPrice += addon.price;
            });
        }
        
        document.getElementById('final-price').textContent = totalPrice.toFixed(3) + ' BD';
    }

    // إغلاق popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // إعادة تعيين القيم
        selectedSize = null;
        selectedEspresso = null;
        selectedAddons = [];
        
        // إلغاء تحديد جميع خانات الاختيار
        document.querySelectorAll('.addon-checkbox input').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // تحديث اللغة
    function updateLanguage() {
        // تحديث نص زر اللغة
        const langIcon = languageBtn.querySelector('i');
        const langText = languageBtn.querySelector('.lang-text');
        
        if (currentLanguage === 'ar') {
            langIcon.className = 'fas fa-language';
            langText.textContent = 'EN';
            document.dir = 'rtl';
        } else {
            langIcon.className = 'fas fa-language';
            langText.textContent = 'AR';
            document.dir = 'ltr';
        }
        
        // تحديث النصوص في popup إذا كان مفتوحاً
        if (currentProduct && popupOverlay.classList.contains('active')) {
            document.getElementById('popup-title').textContent = currentProduct.name[currentLanguage];
            document.getElementById('popup-description').textContent = currentProduct.description[currentLanguage];
            
            // إعادة إعداد الإضافات
            setupAddonsOptions();
        }
    }

    // إضافة تأثير النقر على الأزرار
    const buttons = document.querySelectorAll('.btn, .filter-btn, .size-btn, .espresso-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // زر إضافة إلى السلة
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        alert(currentLanguage === 'ar' ? 'تمت إضافة المنتج إلى السلة!' : 'Product added to cart!');
        closePopup();
    });
});
