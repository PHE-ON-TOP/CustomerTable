function loadCustomerData() {
    fetch('Users.txt')
        .then(response => response.text())
        .then(data => {
            const customerData = document.getElementById('customerData');
            let totalPrice = 0;
            let inProgressCount = 0;
            let finishedCount = 0;
            let notStartedCount = 0;

            customerData.innerHTML = data;

            const rows = customerData.querySelectorAll('tr');

            rows.forEach(row => {
                const priceCell = row.querySelector('td:nth-child(4)');
                const statusCell = row.querySelector('td:nth-child(5)');

                if (priceCell) {
                    const priceText = priceCell.textContent.trim();
                    const price = parseFloat(priceText.replace(' บาท', '').replace(',', ''));
                    if (!isNaN(price)) {
                        totalPrice += price;
                    }
                }

                if (statusCell) {
                    const statusText = statusCell.textContent.trim();
                    if (statusText.includes('In Progress')) {
                        inProgressCount++;
                    } else if (statusText.includes('Finished')) {
                        finishedCount++;
                    } else if (statusText.includes('Not Started Yet')) {
                        notStartedCount++;
                    }
                }
            });

            document.getElementById('inProgressCount').textContent = `In Progress : ${inProgressCount}`;
            document.getElementById('finishedCount').textContent = `Finished : ${finishedCount}`;
            document.getElementById('notStartedCount').textContent = `Not Started Yet : ${notStartedCount}`;
            document.getElementById('totalPrice').textContent = totalPrice.toLocaleString() + " บาท";
        })
        .catch(error => {
            console.error('Error loading customer data:', error);
        });
}

function filterData(status) {
    const customerData = document.getElementById('customerData');
    const rows = customerData.getElementsByTagName('tr');

    for (let row of rows) {
        const statusCell = row.cells[4];
        if (!statusCell) continue;

        const statusText = statusCell.textContent.trim().toLowerCase();
        if (status === 'all') {
            row.style.display = '';
        } else if (statusText.includes(status.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadCustomerData);
