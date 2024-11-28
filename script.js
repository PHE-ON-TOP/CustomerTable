const correctPassword = "28/12";

function checkPassword() {
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
    const passwordSection = document.getElementById("passwordSection");
    const customerData = document.getElementById("customerData");

    if (password === correctPassword) {
        passwordSection.style.display = "none";
        customerData.style.display = "block";
        sumPrices();
    } else {
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.opacity = 1;
        }, 10);
        setTimeout(() => {
            errorMessage.style.opacity = 0;
        }, 2000);
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);
    }
}

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