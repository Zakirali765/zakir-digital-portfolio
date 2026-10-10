export interface BriefValues {
  name: string;
  email: string;
  town: string;
  business: string;
  website: string;
  interest: string;
  description: string;
}
export function composeBrief(values: BriefValues) {
  return `Website project enquiry\n\nName: ${values.name.trim()}\nBusiness: ${values.business.trim()}\nReply email: ${values.email.trim()}\nTown / service area: ${values.town.trim()}\nCurrent website: ${values.website.trim() || 'No existing website supplied'}\nWhat I need: ${values.interest}\n\nMessage:\n${values.description.trim()}\n\nPlease reply with a short outline of what you would improve and the next step.`;
}
export function draftDestinations(brief: string, email: string, whatsapp: string) {
  return {
    email: email
      ? `mailto:${email}?subject=${encodeURIComponent('Website project enquiry — ZAKIR DIGITAL')}&body=${encodeURIComponent(brief)}`
      : null,
    whatsapp: whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(brief)}` : null,
  };
}
const form = document.querySelector<HTMLFormElement>('#brief-form');
if (form) {
  const fields = form.querySelector<HTMLFieldSetElement>('fieldset');
  if (fields) fields.disabled = false;
  form
    .querySelectorAll<HTMLElement>('.brief-actions, .brief-tools')
    .forEach((group) => (group.hidden = false));
  const status = document.querySelector<HTMLElement>('#brief-status');
  const preview = form.querySelector<HTMLElement>('.brief-preview');
  const text = form.querySelector<HTMLTextAreaElement>('#brief-text');
  const links = form.querySelector<HTMLElement>('#draft-links');
  const say = (message: string) => {
    if (status) status.textContent = message;
  };
  const email = form.dataset.email || '';
  const whatsapp = form.dataset.whatsapp || '';
  if (!email || !whatsapp) {
    form
      .querySelectorAll<HTMLButtonElement>('[data-action="email"], [data-action="whatsapp"]')
      .forEach((button) => {
        if (
          (button.dataset.action === 'email' && !email) ||
          (button.dataset.action === 'whatsapp' && !whatsapp)
        )
          button.hidden = true;
      });
    if (!email && !whatsapp)
      say('Contact destinations are not available yet. You can copy or download your brief.');
  }
  text?.addEventListener('input', () => {
    const destinations = draftDestinations(text.value, email, whatsapp);
    const anchor = links?.querySelector<HTMLAnchorElement>('a');
    if (anchor) {
      const destination = anchor.href.startsWith('mailto:')
        ? destinations.email
        : destinations.whatsapp;
      if (destination) anchor.href = destination;
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const missingField = ['name', 'business', 'email', 'town'].find(
      (field) => !String(values.get(field) || '').trim(),
    );
    if (missingField) {
      say('Add your name, business name, email and town or service area.');
      form.querySelector<HTMLInputElement>(`[name="${missingField}"]`)?.focus();
      return;
    }
    if (
      !String(values.get('business') || '').trim() ||
      String(values.get('description') || '').trim().length < 10
    ) {
      say('Add your business name and at least 10 characters about your project.');
      form.querySelector<HTMLTextAreaElement>('#description')?.focus();
      return;
    }
    const brief = composeBrief({
      name: String(values.get('name') || ''),
      email: String(values.get('email') || ''),
      town: String(values.get('town') || ''),
      business: String(values.get('business')),
      website: String(values.get('website') || ''),
      interest: String(values.get('interest')),
      description: String(values.get('description')),
    });
    if (text) text.value = brief;
    if (preview) preview.hidden = false;
    if (links) links.replaceChildren();
    const action = (event as SubmitEvent).submitter?.getAttribute('data-action') || 'email';
    const destinations = draftDestinations(brief, email, whatsapp);
    if (action === 'copy') {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(brief);
        say('Project brief copied. Nothing has been sent.');
      } catch {
        say('Automatic copy is unavailable. Select the brief below and copy it manually.');
        text?.focus();
        text?.select();
      }
    } else if (action === 'download') {
      const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'zakir-digital-project-brief.txt';
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      say('Your text brief has been downloaded. Nothing has been sent.');
    } else {
      const destination = action === 'whatsapp' ? destinations.whatsapp : destinations.email;
      if (!destination) {
        say('This contact destination is not available. Copy or download your brief instead.');
        return;
      }
      const anchor = document.createElement('a');
      anchor.href = destination;
      anchor.textContent = `Open ${action === 'whatsapp' ? 'WhatsApp' : 'email'} draft again`;
      anchor.className = 'text-link';
      if (action === 'whatsapp') {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
      links?.append(anchor);
      anchor.click();
      say(
        `Review your ${action === 'whatsapp' ? 'WhatsApp' : 'email'} draft before sending. Nothing is sent by this website. If no app opens, use the message below.`,
      );
    }
  });
}
