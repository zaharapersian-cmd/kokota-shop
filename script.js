// شماره واتساپ خودتان را اینجا وارد کنید (با کد کشور، بدون + و فاصله)
// مثال: برای 09123456789 بنویسید: 989123456789
const WHATSAPP_NUMBER = ''; // شماره خود را اینجا وارد کنید

// محصولات با ساختار چندمدلی (وزن‌های مختلف)
const products = [
    {
        id: 1,
        name: 'پودر کاکائو',
        category: 'cocoa',
        image: 'https://via.placeholder.com/300x200/8B4513/FFFFFF?text=پودر+کاکائو',
        description: 'پودر کاکائو درجه یک با کیفیت عالی',
        variants: [
            { weight: '100 گرم', price: '45,000' },
            { weight: '250 گرم', price: '95,000' },
            { weight: '500 گرم', price: '175,000' }
        ]
    },
    {
        id: 2,
        name: 'شکلات تلخ',
        category: 'chocolate',
        image: 'https://via.placeholder.com/300x200/5D4037/FFFFFF?text=شکلات+تلخ',
        description: 'شکلات تلخ ۷۰٪ کاکائو',
        variants: [
            { weight: '100 گرم', price: '65,000' },
            { weight: '200 گرم', price: '120,000' }
        ]
    },
    {
        id: 3,
        name: 'شکلات شیری',
        category: 'chocolate',
        image: 'https://via.placeholder.com/300x200/D2691E/FFFFFF?text=شکلات+شیری',
        description: 'شکلات شیری خوشمزه',
        variants: [
            { weight: '100 گرم', price: '55,000' },
            { weight: '200 گرم', price: '100,000' }
        ]
    },
    {
        id: 4,
        name: 'نوشیدنی کاکائو',
        category: 'drinks',
        image: 'https://via.placeholder.com/300x200/CD853F/FFFFFF?text=نوشیدنی+کاکائو',
        description: 'پودر نوشیدنی کاکائو فوری',
        variants: [
            { weight: '200 گرم', price: '75,000' },
            { weight: '400 گرم', price: '135,000' }
        ]
    },
    {
        id: 5,
        name: 'کره کاکائو',
        category: 'cocoa',
        image: 'https://via.placeholder.com/300x200/A0522D/FFFFFF?text=کره+کاکائو',
        description: 'کره کاکائو طبیعی ۱۰۰٪',
        variants: [
            { weight: '250 گرم', price: '125,000' },
            { weight: '500 گرم', price: '230,000' }
        ]
    },
    {
        id: 6,
        name: 'پودر نسکافه',
        category: 'drinks',
        image: 'https://via.placeholder.com/300x200/6F4E37/FFFFFF?text=پودر+نسکافه',
        description: 'پودر نسکافه با طعم شکلات',
        variants: [
            { weight: '100 گرم', price: '85,000' },
            { weight: '200 گرم', price: '155,000' }
        ]
    }
];

// نمایش محصولات
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const variantsHTML = product.variants.map((variant, index) => `
            <div class="variant-option" onclick="selectVariant(${product.id}, ${index})">
                <span class="variant-weight">${variant.weight}</span>
                <span class="variant-price">${variant.price} تومان</span>
            </div>
        `).join('');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-variants">
                    ${variantsHTML}
                </div>
                <button class="order-button" onclick="orderProduct(${product.id})">سفارش محصول</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// انتخاب مدل محصول
let selectedVariants = {};

function selectVariant(productId, variantIndex) {
    selectedVariants[productId] = variantIndex;
}

// فیلتر محصولات بر اساس دسته‌بندی
function filterProducts(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// سفارش محصول از طریق واتساپ
function orderProduct(productId) {
    // بررسی شماره واتساپ
    if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER === '989154747189') {
        alert('لطفاً ابتدا شماره واتساپ را در فایل script.js وارد کنید!');
        return;
    }

    const product = products.find(p => p.id === productId);
    const variantIndex = selectedVariants[productId] || 0;
    const selectedVariant = product.variants[variantIndex];
    
    const message = `سلام! 
من می‌خواهم محصول زیر را سفارش دهم:

📦 محصول: ${product.name}
⚖️ وزن: ${selectedVariant.weight}
💰 قیمت: ${selectedVariant.price} تومان
📝 توضیحات: ${product.description}

لطفاً موجودی را چک کنید.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// نمایش محصولات هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
});
