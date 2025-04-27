document.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    function updateCartTotal() {
        let subtotal = 0;
        const quantityInputs = document.querySelectorAll('input[type="number"]'); // إعادة اختيار العناصر بعد الحذف
        quantityInputs.forEach(input => {
            const quantity = input.value;
            const price = parseFloat(input.closest('tr').querySelector('td:nth-child(3)').innerText.replace('$', ''));
            const total = quantity * price;
            subtotal += total;
            input.closest('tr').querySelector('td:nth-child(4)').innerText = `$${total.toFixed(2)}`;
        });

        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        taxElement.innerText = `$${tax.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;
    }

    quantityInputs.forEach(input => {
        input.addEventListener('change', updateCartTotal);
    });

    updateCartTotal();

    // تعريف المتغيرات لعناصر التحكم في العربة
    const removeButtons = document.querySelectorAll('.remove-btn');

    // وظيفة الحذف
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr');  // يحصل على السطر الخاص بالزر المضغوط عليه
            row.remove();  // إزالة السطر من الجدول
            updateCartTotal();  // تحديث ملخص العربة بعد الحذف
        });
    });
});
