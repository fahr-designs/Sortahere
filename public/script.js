 form = document.getElementById('rsvp-form');
const submitButton = document.getElementById('submit-btn');
const errorAlert = document.getElementById('error-alert');
const successMessage = document.getElementById('success-message');
const guestCountRow = document.getElementById('guest-count-row');
const guestCountInput = document.getElementById('guest_count');
const attendanceRadios = document.querySelectorAll('input[name="attending"]');

attendanceRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const selectedValue = document.querySelector('input[name="attending"]:checked')?.value;

    if (selectedValue === '0') {
      guestCountRow.classList.add('d-none');
      guestCountInput.value = 0;
    } else {
      guestCountRow.classList.remove('d-none');

      if (guestCountInput.value === '0') {
        guestCountInput.value = 1;
      }
    }
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  errorAlert.classList.add('d-none');
  errorAlert.textContent = '';

  const selectedAttendance = document.querySelector('input[name="attending"]:checked');

  if (!selectedAttendance) {
    errorAlert.textContent = 'Please select whether you will be attending.';
    errorAlert.classList.remove('d-none');
    return;
  }

  const payload = {
    name: document.getElementById('name').value.trim(),
    attending: parseInt(selectedAttendance.value, 10),
    message: document.getElementById('message').value.trim()
  };

  submitButton.disabled = true;
  submitButton.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
    Sending RSVP...
  `;

  try {
    const response = await fetch('/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.status === 201) {
      form.classList.add('d-none');
      successMessage.classList.remove('d-none');
      return;
    }

    errorAlert.textContent = data.error || 'Something went wrong. Please try again.';
    errorAlert.classList.remove('d-none');
  } catch (error) {
    errorAlert.textContent = 'Network error. Please check your connection and try again.';
    errorAlert.classList.remove('d-none');
  }

  submitButton.disabled = false;
  submitButton.textContent = 'Send RSVP';
});