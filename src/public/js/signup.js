const form = document.querySelector('form');
const email = document.querySelector('#email');
const firstPassword = document.querySelector('#pwd');
const verifiedPassword = document.querySelector('#verif-pwd');
const error = document.querySelector('.error');
const errorMsg = document.querySelector('.error-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mail = email.value;
  const password = firstPassword.value;
  if (!(password === verifiedPassword.value)) {
    errorMsg.textContent = 'passwords dont match';
    error.style.display = 'block';
  } else {
    const params = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail, password }),
    };

    fetch('/users/signup', params)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          error.classList.remove('hidden');
          errorMsg.textContent = 'User already exist';
        } else {
          window.location.href = '/dashboard';
        }
      });
  }
});
