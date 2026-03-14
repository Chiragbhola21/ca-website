/* ============================================
   CONTACT FORM VALIDATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    // Name
    const name = form.querySelector('#name');
    if (name && !name.value.trim()) {
      showError(name, 'Please enter your name');
      isValid = false;
    }

    // Email
    const email = form.querySelector('#email');
    if (email) {
      if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }
    }

    // Phone
    const phone = form.querySelector('#phone');
    if (phone && !phone.value.trim()) {
      showError(phone, 'Please enter your phone number');
      isValid = false;
    }

    // Message
    const message = form.querySelector('#message');
    if (message && !message.value.trim()) {
      showError(message, 'Please enter your message');
      isValid = false;
    }

    if (isValid) {
      // Show success
      const btn = form.querySelector('.btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;

      // Simulate send
      setTimeout(() => {
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = '#22c55e';

        setTimeout(() => {
          form.reset();
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    }
  });
});

function showError(input, message) {
  const group = input.closest('.form-group');
  group.classList.add('error');
  const error = group.querySelector('.form-error');
  if (error) error.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---- Tax Calculator ---- */
document.addEventListener('DOMContentLoaded', () => {
  const calcForm = document.getElementById('taxCalcForm');
  if (!calcForm) return;

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const income = parseFloat(document.getElementById('calcIncome')?.value) || 0;
    const regime = document.getElementById('calcRegime')?.value || 'new';
    
    let tax = 0;

    if (regime === 'new') {
      // New Tax Regime FY 2025-26
      if (income <= 300000) tax = 0;
      else if (income <= 700000) tax = (income - 300000) * 0.05;
      else if (income <= 1000000) tax = 20000 + (income - 700000) * 0.10;
      else if (income <= 1200000) tax = 50000 + (income - 1000000) * 0.15;
      else if (income <= 1500000) tax = 80000 + (income - 1200000) * 0.20;
      else tax = 140000 + (income - 1500000) * 0.30;
    } else {
      // Old Regime
      if (income <= 250000) tax = 0;
      else if (income <= 500000) tax = (income - 250000) * 0.05;
      else if (income <= 1000000) tax = 12500 + (income - 500000) * 0.20;
      else tax = 112500 + (income - 1000000) * 0.30;
    }

    // Cess 4%
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    const resultEl = document.getElementById('calcResult');
    if (resultEl) {
      resultEl.style.display = 'block';
      document.getElementById('resultTax').textContent = '₹' + Math.round(tax).toLocaleString('en-IN');
      document.getElementById('resultCess').textContent = '₹' + Math.round(cess).toLocaleString('en-IN');
      document.getElementById('resultTotal').textContent = '₹' + Math.round(totalTax).toLocaleString('en-IN');
    }
  });
});
