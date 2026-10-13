'use strict';

// All content and navigation work without JavaScript. This adds only enhancements.
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const email = 'wolfart.creative@gmail.com';
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
if (copyButton && copyStatus && window.isSecureContext && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    copyButton.disabled = true;
    copyStatus.textContent = '';
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Адрес почты скопирован.';
    } catch {
      copyStatus.textContent = 'Не удалось скопировать автоматически. Выделите адрес выше и скопируйте его вручную.';
    } finally {
      copyButton.disabled = false;
    }
  });
}

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let scheduled = false;
function updateCurrentSection() {
  scheduled = false;
  const offset = (document.querySelector('.site-header')?.getBoundingClientRect().height || 0) + 80;
  const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  const current = atBottom ? sections.at(-1) : sections.filter(section => section.getBoundingClientRect().top <= offset).at(-1);
  for (const link of navLinks) {
    if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
function scheduleSectionUpdate() {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateCurrentSection);
  }
}
window.addEventListener('scroll', scheduleSectionUpdate, { passive: true });
window.addEventListener('resize', scheduleSectionUpdate, { passive: true });
window.addEventListener('hashchange', scheduleSectionUpdate);
updateCurrentSection();
