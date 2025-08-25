(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const yearSpan = document.getElementById('year');
  const backToTop = document.querySelector('.back-to-top');

  if(yearSpan){ yearSpan.textContent = new Date().getFullYear(); }

  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll with reduced motion respect
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if(!target) return;
      e.preventDefault();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      history.pushState(null, '', targetId);
    });
  });

  // Back to top visibility
  const toggleBackToTop = () => {
    if(!backToTop) return;
    const scrolled = window.scrollY > 400;
    backToTop.style.opacity = scrolled ? '1' : '0.2';
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
})();
