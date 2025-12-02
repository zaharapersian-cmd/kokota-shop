function orderProduct(productName, price, weight) {
    const WHATSAPP_NUMBER = '989154747189';
    
    // ساخت متن پیام
    const message = 'سلام! می‌خواهم این محصول را سفارش دهم:\n\n' +
                   'نام: ' + productName + '\n' +
                   'وزن: ' + weight + '\n' +
                   'قیمت: ' + price.toLocaleString('fa-IR') + ' تومان';
    
    // Encode کردن متن
    const encodedMessage = encodeURIComponent(message);
    
    // ساخت لینک واتساپ
    const whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodedMessage;
    
    // باز کردن لینک
    window.open(whatsappUrl, '_blank');
}
