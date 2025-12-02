// شماره واتساپ
const WHATSAPP_NUMBER = '989154747189';

// تابع ارسال به واتساپ
function orderProduct(productName, price, weight) {
    const message = 'سلام! می‌خواهم این محصول را سفارش دهم:\n\nنام: ' + productName + '\nوزن: ' + weight + '\nقیمت: ' + price.toLocaleString('fa-IR') + ' تومان';
    
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(message);
    
    window.open(whatsappUrl, '_blank');
}

// بارگذاری محصولات
document.addEventListener('DOMContentLoaded', function() {
    const productsData = [
        {
            id: 1,
            name: 'پودر کاکائو',
            description: 'پودر کاکائو درجه یک',
            image: 'https://via.placeholder.com/300x200?text=پودر+کاکائو',
            variants: [
                { weight: '100 گرم', price: 45000 },
                { weight: '250 گرم', price: 95000 },
                { weight: '500 گرم', price: 175000 }
            ]
        },
        {
            id: 2,
            name: 'شکلات شیری',
            description: 'شکلات شیری خوشمزه',
            image: 'https://via.placeholder.com/300x200?text=شکلات+شیری',
            variants: [
                { weight: '100 گرم', price: 58000 },
                { weight: '200 گرم', price: 120000 },
                { weight: '500 گرم', price: 280000 }
            ]
        },
        {
            id: 3,
            name: 'شکلات تلخ',
            description: 'شکلات تلخ با کاکائو بالا',
            image: 'https://via.placeholder.com/300x200?text=شکلات+تلخ',
            variants: [
                { weight: '100 گرم', price: 65000 },
                { weight: '200 گرم', price: 135000 },
                { weight: '500 گرم', price: 310000 }
            ]
        }
    ];

    const productsGrid = document.getElementById('productsGrid');

    productsData.forEach(product => {
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
            <button class="order-btn" onclick="handleOrder(${product.id})">خرید از واتساپ</button>
        `;

        productsGrid.appendChild(productCard);
    });

    // قرار دادن تابع handleOrder در scope جهانی
    window.handleOrder = function(productId) {
        const product = productsData.find(p => p.id === productId);
        const selectedVariant = document.querySelector(`input[name="product-${productId}"]:checked`);
        
        if (selectedVariant) {
            const variantIndex = parseInt(selectedVariant.value);
            const variant = product.variants[variantIndex];
            orderProduct(product.name, variant.price, variant.weight);
        }
    };
});
