document.addEventListener('DOMContentLoaded', function() {
    const switchInput = document.getElementById('billing-switch');
    const priceCards = document.querySelectorAll('.price-card');
    const monthlyText = document.querySelector('.toggle-text.active');
    const annualText = monthlyText.nextElementSibling.nextElementSibling;

    if (switchInput) {
        switchInput.addEventListener('change', function() {
            const isAnnual = switchInput.checked;

            // 1. Update text emphasis (Monthly/Annual)
            if (isAnnual) {
                monthlyText.classList.remove('active');
                annualText.classList.add('active');
            } else {
                monthlyText.classList.add('active');
                annualText.classList.remove('active');
            }

            // 2. Update prices in the cards
            priceCards.forEach(card => {
                const priceElement = card.querySelector('.price');
                let newPrice;
                let unitText;

                if (isAnnual) {
                    // Annual price is stored as total price (e.g., 278)
                    const totalAnnualPrice = card.dataset.annualPrice;
                    // Calculate price per month for display (e.g., 278 / 12 = 23.17)
                    newPrice = (totalAnnualPrice / 12).toFixed(0); 
                    unitText = '/month (Billed Annually)';
                } else {
                    // Monthly price
                    newPrice = card.dataset.monthlyPrice;
                    unitText = '/month';
                }

                priceElement.innerHTML = `$${newPrice}<span>${unitText}</span>`;
            });
        });
    }
});