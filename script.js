function sumPrices() {
    const rows = document.querySelectorAll("#customerTable tbody tr");
    let total = 0;

    rows.forEach(row => {
        const priceText = row.querySelector("td:nth-child(4)").textContent.trim();
        const priceValue = parseInt(priceText.replace(" บาท", "").replace(",", ""));
        if (!isNaN(priceValue)) {
            total += priceValue;
        }
    });

    document.getElementById("totalPrice").textContent = total.toLocaleString();
}

sumPrices();
