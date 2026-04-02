document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';

  const data = {
    name:        document.getElementById('name').value,
    attending:   parseInt(document.querySelector('[name=attending]:checked').value),
    guest_count: parseInt(document.getElementById('guest_count').value) || 0,
    dietary:     document.getElementById('dietary').value,
    message:     document.getElementById('message').value,
  };

  try {
    const res  = await fetch('/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();

    if (res.status === 201) {
      document.getElementById('rsvp-form').classList.add('d-none');
      document.getElementById('success-message').classList.remove('d-none');
    } else {
      const alert = document.getElementById('error-alert');
      alert.textContent = json.error || 'Something went wrong.';
      alert.classList.remove('d-none');
      btn.disabled = false;
      btn.textContent = 'Send RSVP';
    }
  } catch {
    const alert = document.getElementById('error-alert');
    alert.textContent = 'Network error. Please check your connection and try again.';
    alert.classList.remove('d-none');
    btn.disabled = false;
    btn.textContent = 'Send RSVP';
  }
});

// Guest count visibility logic
document.querySelectorAll('[name=attending]').forEach(radio => {
  radio.addEventListener('change', () => {
    const guestRow = document.getElementById('guest-count-row');
    if (radio.value === '0') {
      guestRow.classList.add('d-none');
      document.getElementById('guest_count').value = 0;
    } else {
      guestRow.classList.remove('d-none');
    }
  });
});