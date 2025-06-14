export function smoothScrollTo(element, options = {}) {
  const { duration = 1000, ease = (t) => t * (2 - t), offset = 0 } = options;

  const start = element.scrollTop;
  const end = element.scrollHeight - element.clientHeight + offset;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = ease(progress);

    element.scrollTop = start + (end - start) * easeProgress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
