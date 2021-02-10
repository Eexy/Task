const modalActionBtn = document.querySelectorAll('[data-target-type=modal]');
const overlay = document.querySelector('.overlay');

function closeModal(modalName) {
  overlay.style.display = 'none';
  const modal = document.querySelector(modalName);
  modal.style.transform = 'translateY(-1000%)';
}

function showModal(modalName) {
  overlay.style.display = 'block';
  const modal = document.querySelector(modalName);
  modal.style.transform = 'translateY(0%)';
}

modalActionBtn.forEach((btn) => {
  if (btn.dataset.targetAction === 'open') {
    btn.addEventListener('click', () => {
      showModal(btn.dataset.target);
    });
  } else if (btn.dataset.targetAction === 'close') {
    btn.addEventListener('click', () => {
      closeModal(btn.dataset.target);
    });
  }
});
