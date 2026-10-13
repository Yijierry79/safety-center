(() => {
  'use strict';
  const tablist = document.querySelector('.resource-tabs');
  if (!tablist) return;
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  const indicator = tablist.querySelector('.resource-tabs-indicator');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;

  function activate(index, focus = false, animate = true) {
    const changed = index !== selected;
    selected = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].getAnimations().forEach(animation => animation.cancel());
      panels[i].hidden = i !== index;
    });
    document.querySelector('.resources-page').dataset.resourceTab = panels[index].id.replace('resource-', '');
    indicator.style.width = `${tabs[index].offsetWidth}px`;
    indicator.style.transform = `translateX(${tabs[index].offsetLeft - tabs[0].offsetLeft}px)`;
    if (focus) tabs[index].focus({preventScroll:true});
    if (changed && animate && !preference.matches) panels[index].animate(
      [{opacity:.5, transform:'translateY(6px)'}, {opacity:1, transform:'none'}],
      {duration:220, easing:'cubic-bezier(.16,1,.3,1)'}
    );
  }
  tabs.forEach((tab, index) => tab.addEventListener('click', () => activate(index)));
  tablist.addEventListener('keydown', event => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (current + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    activate(next, true);
  });
  addEventListener('resize', () => activate(selected, false, false));
  preference.addEventListener('change', () => activate(selected, false, false));
  document.querySelectorAll('[data-resource-placeholder]').forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.editorial-card').querySelector('.editorial-status').textContent = `${button.dataset.resourcePlaceholder} content coming soon.`;
    });
  });
  activate(0, false, false);
})();
