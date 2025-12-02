// شماره واتساپ
const WHATSAPP_NUMBER = '989154747189';

// تابع ارسال به واتساپ
function orderProduct(productName, price, weight) {
    const message = 'سلام! می‌خواهم این محصول را سفارش دهم:\n\nنام: ' + productName + '\nوزن: ' + weight + '\nقیمت: ' + price.toLocaleString('fa-IR') + ' تومان';
    
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(message);
    
    window.open(whatsappUrl, '_blank');
}

// داده‌های محصولات
const categoriesData = {
    tea: {
        title: '☕ چای‌های مرغوب',
        products: [
            {
                id: 'tea-1',
                name: 'چای مراکشی',
                description: 'چای مراکشی درجه یک با عطر و طعم بی‌نظیر',
                image: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=چای+مراکشی',
                variants: [
                    { weight: '200 گرم', price: 360000 },
                    { weight: '350 گرم', price: 560000 },
                    { weight: '1 کیلو', price: 1600000 },
                    { weight: '5 کیلو', price: 6500000 }
                ]
            },
            {
                id: 'tea-2',
                name: 'چای دوغزال عطری',
                description: 'چای دوغزال با رایحه عطری منحصر به فرد',
                image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=چای+دوغزال+عطری',
                variants: [
                    { weight: '500 گرم', price: 710000 }
                ]
            },
            {
                id: 'tea-3',
                name: 'چای دوغزال ساده',
                description: 'چای دوغزال با طعم اصیل و سنتی',
                image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=چای+دوغزال+ساده',
                variants: [
                    { weight: '500 گرم', price: 710000 }
                ]
            },
            {
                id: 'tea-4',
                name: 'چای دوغزال هل‌دار',
                description: 'چای دوغزال با طعم هل معطر',
                image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=چای+دوغزال+هل‌دار',
                variants: [
                    { weight: '500 گرم', price: 710000 }
                ]
            },
            {
                id: 'tea-5',
                name: 'چای بارمال عطری',
                description: 'چای بارمال با رایحه عطری خاص',
                image: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=چای+بارمال+عطری',
                variants: [
                    { weight: '500 گرم', price: 750000 }
                ]
            },
            {
                id: 'tea-6',
                name: 'چای بارمال هل‌دار',
                description: 'چای بارمال با هل درجه یک',
                image: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=چای+بارمال+هل‌دار',
                variants: [
                    { weight: '200 گرم', price: 310000 }
                ]
            },
            {
                id: 'tea-7',
                name: 'چای گلابی',
                description: 'چای با عطر و طعم گلاب طبیعی',
                image: 'https://via.placeholder.com/300x200/c3cfe2/333333?text=چای+گلابی',
                variants: [
                    { weight: '500 گرم', price: 530000 }
                ]
            },
            {
                id: 'tea-8',
                name: 'چای العطور',
                description: 'چای العطور با کیفیت استثنایی',
                image: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=چای+العطور',
                variants: [
                    { weight: '200 گرم', price: 350000 }
                ]
            }
        ]
    }
};

// بارگذاری محصولات
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    
    // حذف بخش قدیمی محصولات
    const oldProductsSection = document.getElementById('productsGrid');
    if (oldProductsSection && oldProductsSection.parentElement) {
        oldProductsSection.parentElement.remove();
    }
    
    // ساخت بخش‌های دسته‌بندی
    Object.keys(categoriesData).forEach(categoryKey => {
        const category = categoriesData[categoryKey];
        
        const section = document.createElement('section');
        section.className = 'category-section';
        section.id = categoryKey;
        
        section.innerHTML = `
            <h2 class="category-title">${category.title}</h2>
            <div class="products-grid" id="grid-${categoryKey}"></div>
        `;
        
        container.insertBefore(section, document.querySelector('footer'));
        
        const grid = document.getElementById(`grid-${categoryKey}`);
        
        category.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let variantsHTML = '<div class="product-variants">';
            product.variants.forEach((variant, index) => {
                variantsHTML += `
                    <label class="variant-option">
                        <input type="radio" name="product-${product.id}" value="${index}" ${index === 0 ? 'checked' : ''}>
                        <span>${variant.weight} - ${variant.price.toLocaleString('fa-IR')} تومان</span>
                    </label>
                `;
            });
            variantsHTML += '</div>';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                ${variantsHTML}
                <button class="order-btn" onclick="handleOrder('${product.id}', '${categoryKey}')">🛒 خرید از واتساپ</button>
            `;
            
            grid.appendChild(productCard);
        });
    });
    
    // تابع handle order
    window.handleOrder = function(productId, categoryKey) {
        const category = categoriesData[categoryKey];
        const product = category.products.find(p => p.id === productId);
        const selectedVariant = document.querySelector(`input[name="product-${productId}"]:checked`);
        
        if (selectedVariant && product) {
            const variantIndex = parseInt(selectedVariant.value);
            const variant = product.variants[variantIndex];
            orderProduct(product.name, variant.price, variant.weight);
        }
    };
});
