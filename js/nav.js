// Mobile navigation for the login and registration pages.
if (!window.cyfutureNavReady) {
  window.cyfutureNavReady = true;
  const siteHeader = document.querySelector('body > header');
  if (siteHeader && document.body.classList.contains('inner-page')) {
    const updateHeader = () => {
      siteHeader.style.background = window.scrollY > 60 ? 'rgba(6,18,33,.96)' : 'rgba(5,15,30,.45)';
      siteHeader.style.boxShadow = window.scrollY > 60 ? '0 10px 35px rgba(0,0,0,.35)' : 'none';
    };
    window.addEventListener('scroll', updateHeader);
    updateHeader();
  }
  const toggle = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (toggle && links && document.body.classList.contains('auth-page')) {
    function setOpen(open) {
      links.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    }
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('active')));
    toggle.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(!links.classList.contains('active'));
      }
    });
    links.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });
  }
}
