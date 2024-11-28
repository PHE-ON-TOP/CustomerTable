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

            const priceElements = document.querySelectorAll('#customerData td:nth-child(4)');
            priceElements.forEach(priceElement => {
                const priceText = priceElement.textContent.trim();
                const price = parseFloat(priceText.replace(' บาท', '').replace(',', '').trim());
                if (!isNaN(price)) {
                    totalPrice += price;
                }
            });

            const statusElements = document.querySelectorAll('#customerData td:nth-child(5)');
            statusElements.forEach(statusElement => {
                const statusText = statusElement.textContent.trim();
                if (statusText.includes('In progress')) {
                    inProgressCount++;
                } else if (statusText.includes('Finished')) {
                    finishedCount++;
                } else if (statusText.includes('Not started yet')) {
                    notStartedCount++;
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
        if (status === 'all') {
            row.style.display = '';
        } else if (statusCell && statusCell.textContent.includes(status)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadCustomerData);
