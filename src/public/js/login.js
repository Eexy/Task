const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#pwd');
const error = document.querySelector('.error');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  };

  fetch('http://localhost:3000/users/login', params)
    .then((res) => res.json())
    .then((res) => {
      if (!res.error) {
        window.location.href = 'http://localhost:3000/dashboard';
      } else {
        error.classList.remove('hidden');
      }
    });
});
