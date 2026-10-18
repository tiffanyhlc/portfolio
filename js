// Small touches of motion for the portfolio. The page works fine without this file.

document.documentElement.classList.add('js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Sections gently slide up as you scroll to them
if (!reduceMotion && 'IntersectionObserver' in window) {
  const items = [...document.querySelectorAll('.rv')]
    .filter(el => el.getBoundingClientRect().top > innerHeight); // only things below the screen
  items.forEach(el => el.classList.add('pre'));
  const watcher = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pre');
        watcher.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach(el => watcher.observe(el));
}

// 2. Your name drifts and fades as you scroll down
const heroName = document.getElementById('heroName');
if (!reduceMotion && heroName) {
  addEventListener('scroll', () => {
    const y = Math.min(scrollY, 700);
    heroName.style.transform = `translateY(${y * 0.18}px)`;
    heroName.style.opacity = 1 - y / 900;
  }, { passive: true });
}

// 3. Lavender cursor ring that grows over links (mouse only)
const cursor = document.getElementById('cursor');
if (cursor && matchMedia('(hover: hover)').matches && !reduceMotion) {
  addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }, { passive: true });
  document.querySelectorAll('a, button, .frame, .num').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
} else if (cursor) {
  cursor.remove();
}

// 4. "Copy email" button
const copyBtn = document.getElementById('copy');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = document.getElementById('mail').textContent;
    const done = () => {
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy email'), 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(email).then(done);
  });
}