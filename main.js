// ── Tab navigation ──────────────────────────────────────
const navBtns = document.querySelectorAll('.nav-btn');
const panels  = document.querySelectorAll('.tab-panel');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panels.forEach(p => {
      p.classList.toggle('active', p.id === 'tab-' + btn.dataset.tab);
    });
    document.querySelector('.main').scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ── Expandable project cards ────────────────────────────
document.querySelectorAll('.project-card[data-card]').forEach(card => {
  card.addEventListener('click', e => {
    // Don't collapse if user clicked the GitHub link
    if (e.target.closest('.project-link')) return;

    const isExpanded = card.classList.contains('expanded');
    const expandedContent = card.querySelector('.card-expanded-content');
    const hint = card.querySelector('.card-toggle-hint');

    if (isExpanded) {
      // Collapse: animate height from current px back to 0
      expandedContent.style.height = expandedContent.scrollHeight + 'px';
      requestAnimationFrame(() => {
        expandedContent.style.height = '0px';
      });
      card.classList.remove('expanded');
      hint.textContent = 'click to expand';
    } else {
      // Expand: animate height from 0 to scrollHeight
      card.classList.add('expanded');
      expandedContent.style.height = expandedContent.scrollHeight + 'px';
      hint.textContent = 'click to collapse';
      // After transition, set to auto so content can reflow freely
      expandedContent.addEventListener('transitionend', () => {
        if (card.classList.contains('expanded')) {
          expandedContent.style.height = 'auto';
        }
      }, { once: true });
    }
  });
});