document.getElementById('fetch-products').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/v1/products');

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || !data.message) {
            throw new Error(`Error: No data found`);
        }

        const productList = document.getElementById('product-list');

        productList.innerHTML = '';

        data.message.forEach(product => {
            const productItem = document.createElement('div');
            productItem.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(productItem);
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
});