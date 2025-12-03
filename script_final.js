// انتظار تحميل المستند بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة المتغيرات
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
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
            // التحقق مما إذا كان العنصر مرئيًا في نافذة العرض
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
    
    // تحريك الصور عند التحويم
    const menuItemImages = document.querySelectorAll('.menu-item-image');
    
    menuItemImages.forEach(image => {
        image.addEventListener('mouseover', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseout', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // إضافة تأثير النقر على الأزرار
    const buttons = document.querySelectorAll('.btn, .filter-btn');
    
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
});



// PRODUCT POPUP CLEAN
const popup=document.getElementById("productPopup");
const popupImg=document.getElementById("popupImg");
const popupTitle=document.getElementById("popupTitle");
const popupDesc=document.getElementById("popupDesc");
const popupPrice=document.getElementById("popupPrice");
const popupClose=document.querySelector(".popup-close");

document.querySelectorAll(".menu-item").forEach(item=>{
    item.addEventListener("click",()=>{
        const basePrice=item.querySelector(".price").innerText;
        popupImg.src=item.querySelector("img").src;
        popupTitle.innerText=item.querySelector("h4").innerText;
        popupDesc.innerText=item.querySelector("p").innerText;
        document.getElementById("priceSmall").value=basePrice;
        document.getElementById("priceMedium").value=basePrice;
        document.getElementById("priceLarge").value=basePrice;
        popupPrice.innerText=basePrice;
        popup.style.display="flex";
    });
});
popupClose.onclick=()=>popup.style.display="none";
popup.onclick=e=>{if(e.target===popup)popup.style.display="none";}
