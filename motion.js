const PageMotion = (() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const toggle = document.querySelector('#motion-toggle');
  const animations = new Set();
  const byElement = new WeakMap();
  let paused = false;
  const enabled = () => !paused && !preference.matches && !document.hidden;

  function animate(element, frames, options = {}) {
    if (!element || !enabled() || !element.animate) return;
    byElement.get(element)?.cancel();
    const animation = element.animate(frames, {
      duration: 340,
      easing: 'cubic-bezier(.22, 1, .36, 1)',
      ...options,
    });
    byElement.set(element, animation);
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
  }

  function enter(element, distance = 7) {
    animate(element, [
      { opacity: .45, transform: `translateY(${distance}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ]);
  }

  function capture(sequence) {
    return new Map([...sequence.querySelectorAll('[data-sequence-event]')].map((element) =>
      [element.dataset.sequenceEvent, element.getBoundingClientRect()]));
  }

  function settle(sequence, positions) {
    sequence.querySelectorAll('[data-sequence-event]').forEach((element) => {
      const previous = positions.get(element.dataset.sequenceEvent);
      if (!previous) { enter(element); return; }
      const next = element.getBoundingClientRect();
      const x = previous.left - next.left;
      const y = previous.top - next.top;
      if (Math.abs(x) + Math.abs(y) < 1) return;
      animate(element, [
        { transform: `translate(${x}px, ${y}px)` },
        { transform: 'translate(0, 0)' },
      ]);
    });
  }

  function sync() {
    root.dataset.motion = enabled() ? 'playing' : 'paused';
    toggle.hidden = preference.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} animations across this page`);
    toggle.querySelector('span').textContent = paused ? 'Resume motion' : 'Pause motion';
    if (!enabled()) animations.forEach((animation) => animation.cancel());
  }

  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  if (preference.addEventListener) preference.addEventListener('change', sync);
  else preference.addListener(sync);
  document.addEventListener('visibilitychange', sync);
  sync();

  document.addEventListener('DOMContentLoaded', () => {
    const flowing = document.querySelectorAll('.causal-study, .story-relations, .method-steps, .results-panel');
    const entrances = document.querySelectorAll('.story-heading, .section-intro, .video-heading, .resources-heading, .paper-figure, .resource-grid');
    if (!('IntersectionObserver' in window)) {
      flowing.forEach((element) => { element.dataset.motionVisible = 'true'; });
      return;
    }
    const flowObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => { target.dataset.motionVisible = String(isIntersecting); });
    }, { threshold: 0 });
    flowing.forEach((element) => flowObserver.observe(element));
    const entranceObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        enter(target, 12);
        entranceObserver.unobserve(target);
      });
    }, { threshold: .08 });
    entrances.forEach((element) => entranceObserver.observe(element));
  });

  return Object.freeze({ enter, capture, settle });
})();
