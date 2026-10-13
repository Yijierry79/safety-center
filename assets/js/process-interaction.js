(() => {
  'use strict';
  const process = document.querySelector('.response-process');
  if (process) {
    const buttons = [...process.querySelectorAll('.process-button')];
    const defaultWidths = [374, 380, 380, 372, 351];
    const defaultPositions = [0, 300, 604, 911, 1215];
    const defaultCenters = [174.5, 221.5, 220.5, 215.5, 208.5];
    const compactWidths = [203, 203, 202, 199, 187];
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let active = -1;

    function render(animate = true) {
      const unit = innerWidth / 1728;
      const duration = animate && !preference.matches ? .48 : 0;
      const widths = active < 0 ? [...defaultWidths] : [...compactWidths];
      if (active >= 0) widths[active] = 1705 - widths.reduce((sum, width, index) => sum + (index === active ? 0 : width), 0);
      let position = active < 0 ? 0 : 9;
      process.dataset.active = String(active);
      buttons.forEach((button, index) => {
        const selected = index === active;
        const shapes = [...button.querySelectorAll('.process-shape')];
        const previousWidths = shapes.map(shape => shape.getBoundingClientRect().width);
        const label = button.querySelector('.process-label');
        const description = button.querySelector('.process-description');
        const x = active < 0 ? defaultPositions[index] : position;
        const center = active < 0 ? defaultCenters[index] : widths[index] / 2 + (index === 0 ? -29.5 : 12);
        button.style.width = `${widths[index] * unit}px`;
        button.setAttribute('aria-expanded', String(selected));
        if (selected) button.setAttribute('aria-describedby', description.id);
        else button.removeAttribute('aria-describedby');
        description.hidden = !selected;
        const options = {duration, ease:'expo.out', overwrite:true};
        gsap.to(button, {...options, x:x * unit});
        shapes.forEach((shape, shapeIndex) => {
          gsap.killTweensOf(shape);
          gsap.set(shape, {scaleX:previousWidths[shapeIndex] / (widths[index] * unit)});
          gsap.to(shape, {...options, scaleX:1, opacity:shapeIndex === (active < 0 ? 0 : 1) ? 1 : 0});
        });
        gsap.to(label, {...options, x:center * unit, xPercent:-50, opacity:active < 0 || selected ? 1 : 0});
        gsap.set(description, {x:center * unit, xPercent:-50});
        if (selected) gsap.fromTo(description, {opacity:0}, {...options, opacity:1, duration:duration ? .3 : 0});
        position += widths[index] - 38;
      });
    }
    buttons.forEach((button, index) => {
      button.title = button.getAttribute('aria-label');
      button.addEventListener('click', () => {active = active === index ? -1 : index; render();});
    });
    process.addEventListener('keydown', event => {
      if (event.key === 'Escape' && active >= 0) {event.preventDefault(); active = -1; render();}
    });
    addEventListener('resize', () => render(false));
    preference.addEventListener('change', () => render(false));
    render(false);
  }

  document.querySelector('[data-template-placeholder]')?.addEventListener('click', () => {
    document.querySelector('#template-status').textContent = 'Report template coming soon.';
  });
})();
