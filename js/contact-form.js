(() => {
  'use strict';
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('button[type="submit"]');
  const startedAt = form.querySelector('input[name="startedAt"]');
  const pageUrl = form.querySelector('input[name="pageUrl"]');
  const cooldownKey = 'portfolio_contact_last_submit';
  const cooldownMs = 60000;
  startedAt.value = String(Date.now());
  pageUrl.value = window.location.href;
  const setStatus = (message, state = '') => { status.hidden = false; status.textContent = message; status.dataset.state = state; status.focus(); };
  const validate = () => {
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((field) => { const valid = field.checkValidity(); field.setAttribute('aria-invalid', String(!valid)); if (!valid && !firstInvalid) firstInvalid = field; });
    const message = form.elements.message;
    if (message.value.trim().length < 10) { message.setCustomValidity('Message must be at least 10 characters.'); message.setAttribute('aria-invalid', 'true'); firstInvalid ||= message; } else message.setCustomValidity('');
    if (firstInvalid) { setStatus('Please check all required fields and formats. The message must be at least 10 characters.', 'error'); firstInvalid.focus(); return false; }
    return true;
  };
  form.addEventListener('input', (event) => { if (event.target.matches('input, textarea')) { event.target.setAttribute('aria-invalid', 'false'); if (event.target.name === 'message') event.target.setCustomValidity(''); } });
  submit.addEventListener('click', (event) => { if (!validate()) event.preventDefault(); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validate()) return;
    const lastSubmit = Number(sessionStorage.getItem(cooldownKey) || 0);
    if (Date.now() - lastSubmit < cooldownMs) { setStatus('Please wait about one minute before sending another message.', 'error'); return; }
    submit.disabled = true; submit.setAttribute('aria-busy', 'true'); submit.dataset.originalLabel ||= submit.textContent; submit.textContent = 'Sending…'; setStatus('Sending your message…', 'pending');
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const result = await response.json().catch(() => ({ ok: false, code: 'invalid_response' }));
      if (!response.ok || !result.ok) throw new Error(result.code || 'send_failed');
      sessionStorage.setItem(cooldownKey, String(Date.now())); form.reset(); startedAt.value = String(Date.now()); pageUrl.value = window.location.href; setStatus('Message sent. I usually reply within 2–3 business days.', 'success');
    } catch (error) {
      setStatus(error.message === 'server_not_configured' ? 'The contact service has not been configured yet.' : 'Your message could not be sent. Please wait and try again.', 'error');
    } finally { submit.disabled = false; submit.removeAttribute('aria-busy'); submit.textContent = submit.dataset.originalLabel; }
  });
})();
