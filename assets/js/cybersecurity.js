(() => {
  'use strict';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const content = window.securityContent;
  const subscribeDialog = document.querySelector('#subscription-dialog');
  const certificateDialog = document.querySelector('#certificate-dialog');
  let trigger = null;
  let lastCertificateRect = null;

  function openDialog(dialog, opener) {
    trigger = opener;
    dialog.showModal();
    document.body.style.overflowY = 'hidden';
  }
  function resetDialogState() {
    document.body.style.overflowY = '';
    trigger?.focus({ preventScroll: true });
  }
  for (const dialog of [subscribeDialog, certificateDialog]) {
    dialog.addEventListener('close', resetDialogState);
    dialog.addEventListener('click', event => {
      const box = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) closeDialog(dialog);
    });
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => closeDialog(dialog));
    dialog.addEventListener('cancel', event => { event.preventDefault(); closeDialog(dialog); });
  }
  function closeDialog(dialog) {
    if (dialog === certificateDialog && !reducedMotion && lastCertificateRect) {
      const card = document.querySelector('#certificate-preview-content');
      const box = card.getBoundingClientRect();
      const target = lastCertificateRect;
      const animation = card.animate([
        { transform: 'none', opacity: 1 },
        { transform: `translate(${target.left + target.width / 2 - box.left - box.width / 2}px,${target.top + target.height / 2 - box.top - box.height / 2}px) scale(${target.width / box.width})`, opacity: .1 },
      ], { duration: 260, easing: 'cubic-bezier(.4,0,1,1)' });
      animation.finished.then(() => dialog.close()).catch(() => dialog.close());
    } else dialog.close();
  }

  document.querySelector('[data-open-subscribe]')?.addEventListener('click', event => {
    document.querySelector('#subscription-form').reset();
    document.querySelector('.form-status').textContent = '';
    document.querySelector('#subscription-form button').disabled = false;
    openDialog(subscribeDialog, event.currentTarget);
    document.querySelector('#subscription-email').focus();
  });
  document.querySelector('#subscription-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector('input');
    email.value = email.value.trim();
    if (!form.reportValidity()) return;
    form.querySelector('button').disabled = true;
    form.querySelector('.form-status').textContent = 'Demo complete. Your email has not been submitted and no subscription was created.';
  });

  const list = document.querySelector('#advisory-list');
  if (list) {
    for (const advisory of content.advisories) {
      const detail = document.createElement('details');
      detail.className = 'advisory-row';
      detail.dataset.year = advisory.year;
      const summary = document.createElement('summary');
      summary.append(document.createTextNode(advisory.title));
      const arrows = document.createElement('span');
      arrows.className = 'advisory-arrow';
      arrows.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 2; i++) {
        const image = document.createElement('img');
        image.src = 'assets/figma/52fe3.png';
        image.alt = '';
        arrows.append(image);
      }
      summary.append(arrows);
      const body = document.createElement('div');
      body.className = 'advisory-detail';
      const tag = document.createElement('span');
      tag.className = 'demo-label';
      tag.textContent = `Demonstration only · ${advisory.year}`;
      const paragraph = document.createElement('p');
      paragraph.textContent = 'This entry uses sample content from the design to demonstrate the advisory experience. It is not a published Streamax advisory. Approved advisory details will be added here.';
      body.append(tag, paragraph);
      detail.append(summary, body);
      detail.addEventListener('toggle', () => {
        if (detail.open) {
          list.querySelectorAll('details').forEach(other => { if (other !== detail) other.open = false; });
          if (!reducedMotion) body.animate([{ opacity: .5, transform: 'translateY(-5px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.16,1,.3,1)' });
        }
      });
      list.append(detail);
    }
    document.querySelector('#advisory-year').addEventListener('change', event => {
      let count = 0;
      const year = event.target.value;
      list.querySelectorAll('.advisory-row').forEach(row => {
        row.open = false;
        row.hidden = year !== 'all' && row.dataset.year !== year;
        if (!row.hidden) count++;
      });
      document.querySelector('.advisory-empty').hidden = count !== 0;
      document.querySelector('#filter-status').textContent = `${count} demonstration advisories shown${year === 'all' ? '' : ` for ${year}`}.`;
    });
  }

  function applyCertificate(card, certificate) {
    card.querySelector('.certificate-placeholder span').textContent = certificate.title;
    if (certificate.image) {
      const placeholder = card.querySelector('.certificate-placeholder');
      placeholder.hidden = true;
      let image = card.querySelector('.certificate-image');
      if (!image) {
        image = document.createElement('img');
        image.className = 'certificate-image';
        card.querySelector('.certificate-ground').append(image);
      }
      image.src = certificate.image;
      image.alt = certificate.alt || certificate.title;
    }
  }
  document.querySelectorAll('.certificate-grid .certificate-card').forEach((card, index) => applyCertificate(card, content.certificates[index]));
  document.querySelectorAll('[data-open-certificate]').forEach(button => {
    button.addEventListener('click', event => {
      const source = event.currentTarget.closest('.certificate-card');
      lastCertificateRect = source.getBoundingClientRect();
      const clone = source.cloneNode(true);
      clone.querySelector('button').remove();
      clone.removeAttribute('data-certificate-index');
      document.querySelector('#certificate-preview-content').replaceChildren(clone);
      certificateDialog.setAttribute('aria-label', `${content.certificates[Number(event.currentTarget.dataset.openCertificate)].title} preview`);
      openDialog(certificateDialog, event.currentTarget);
      if (!reducedMotion) {
        const target = document.querySelector('#certificate-preview-content');
        const box = target.getBoundingClientRect();
        const rect = lastCertificateRect;
        target.animate([
          { transform: `translate(${rect.left + rect.width / 2 - box.left - box.width / 2}px,${rect.top + rect.height / 2 - box.top - box.height / 2}px) scale(${rect.width / box.width})`, opacity: .5 },
          { transform: 'none', opacity: 1 },
        ], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)' });
      }
    });
  });

  if (!reducedMotion) {
    const heading = document.querySelector('.cyber-main h1');
    gsap.from(heading, { y: 12, opacity: .8, duration: .85, ease: 'expo.out', clearProps: 'transform,opacity' });
    const cards = document.querySelectorAll('.feature-card');
    if (cards.length) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          gsap.from(cards, { y: 14, opacity: .82, duration: .75, stagger: .08, ease: 'expo.out', clearProps: 'transform,opacity' });
          observer.disconnect();
        }
      }, { threshold: .1 });
      observer.observe(cards[0]);
    }
  }
})();
