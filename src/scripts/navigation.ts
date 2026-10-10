const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#site-nav');
if (toggle && nav) {
  const mobile = window.matchMedia('(max-width: 900px)');
  const close = (returnFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    nav.hidden = mobile.matches;
    if (returnFocus) toggle.focus();
  };
  const sync = () => {
    toggle.hidden = !mobile.matches;
    close();
  };
  sync();
  mobile.addEventListener('change', sync);
  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') close(true);
    else {
      nav.hidden = false;
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      nav.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  });
  nav.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a');
    if (link && mobile.matches) {
      close();
      const destination =
        link.pathname === window.location.pathname
          ? document.getElementById(link.hash.slice(1))
          : null;
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true);
  });
  document.addEventListener('click', (event) => {
    if (
      mobile.matches &&
      !nav.contains(event.target as Node) &&
      !toggle.contains(event.target as Node)
    )
      close();
  });
  document.addEventListener('focusin', (event) => {
    if (
      mobile.matches &&
      toggle.getAttribute('aria-expanded') === 'true' &&
      !nav.contains(event.target as Node) &&
      !toggle.contains(event.target as Node)
    )
      close();
  });
}
if (
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
  'IntersectionObserver' in window
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll('main > .section').forEach((section) => observer.observe(section));
}
