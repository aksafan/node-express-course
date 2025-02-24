const loginForm = document.getElementById('loginForm');
const helloButton = document.getElementById('getHello');
const responseElement = document.getElementById('response');

let token = '';

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/v1/logon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();

        if (res.ok) {
            token = data.token;
            sessionStorage.setItem('token', token);
            responseElement.textContent = `Login successful! Token: ${token}`;
        } else {
            responseElement.textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        responseElement.textContent = `Error: ${error.message}`;
    }
});

helloButton.addEventListener('click', async () => {
    try {
        const res = await fetch('/api/v1/hello', {
            method: 'GET',
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        const data = await res.json();

        if (res.ok) {
            responseElement.textContent = `Hello Route Response: ${data.message}`;
        } else {
            responseElement.textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        responseElement.textContent = `Error: ${error.message}`;
    }
});
