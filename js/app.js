/**
 * SHAW GLOBAL VENTURES INC. (SGV)
 * Client-Side Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCopyCodeButtons();
  initCapabilityModal();
  initServiceScopeLinks();
  initProcurementForm();
});

/**
 * Navbar elevation on scroll and accessible mobile drawer
 */
function initNavbar() {
  function getElements() {
    return {
      masterHeader: document.getElementById('master-header') || document.querySelector('.site-header'),
      toggleBtn: document.getElementById('mobile-nav-toggle'),
      drawer: document.getElementById('mobile-drawer'),
      backdrop: document.getElementById('mobile-drawer-backdrop'),
      closeBtn: document.getElementById('drawer-close-btn')
    };
  }

  // Dynamically compute exact header height for flawless body offset
  function syncHeaderHeight() {
    const { masterHeader } = getElements();
    if (masterHeader) {
      const height = masterHeader.offsetHeight;
      if (height > 0) {
        document.documentElement.style.setProperty('--header-actual-height', `${height}px`);
      }
    }
  }

  // Sync initially and on resize / orientation change
  syncHeaderHeight();
  setTimeout(syncHeaderHeight, 50);
  setTimeout(syncHeaderHeight, 300);
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('orientationchange', () => setTimeout(syncHeaderHeight, 150));

  // Master header shadow and compacting on scroll
  window.addEventListener('scroll', () => {
    const { masterHeader } = getElements();
    if (masterHeader) {
      if (window.scrollY > 25) {
        masterHeader.classList.add('scrolled');
      } else {
        masterHeader.classList.remove('scrolled');
      }
    }
  });

  function openDrawer() {
    const { drawer, backdrop, toggleBtn } = getElements();
    drawer?.classList.add('active');
    backdrop?.classList.add('active');
    drawer?.setAttribute('aria-hidden', 'false');
    backdrop?.setAttribute('aria-hidden', 'false');
    toggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    const { drawer, backdrop, toggleBtn } = getElements();
    drawer?.classList.remove('active');
    backdrop?.classList.remove('active');
    drawer?.setAttribute('aria-hidden', 'true');
    backdrop?.setAttribute('aria-hidden', 'true');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Global delegated click handler for drawer interactions
  document.addEventListener('click', (e) => {
    // Mobile toggle clicked
    if (e.target.closest('#mobile-nav-toggle')) {
      const { drawer } = getElements();
      const isOpen = drawer?.classList.contains('active');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
      return;
    }

    // Close button or backdrop clicked
    if (e.target.closest('#drawer-close-btn') || e.target.closest('#mobile-drawer-backdrop')) {
      closeDrawer();
      return;
    }

    // Drawer links clicked
    if (e.target.closest('.drawer-link, .drawer-cta-btn, .drawer-modal-btn')) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    const { drawer } = getElements();
    if (e.key === 'Escape' && drawer?.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/**
 * One-click copy for UEI, CAGE and NAICS codes (delegated for custom element support)
 */
function initCopyCodeButtons() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const textToCopy = btn.getAttribute('data-copy');
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Copied';
      btn.style.color = '#79ded7';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.color = '';
      }, 2000);
    } catch (err) {
      console.warn('Clipboard write failed, using fallback', err);
    }
  });
}

/**
 * Capability Statement Executive Modal (delegated for custom element support)
 */
function initCapabilityModal() {
  function getModal() {
    return document.getElementById('capability-modal');
  }

  function openModal() {
    const modalOverlay = getModal();
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    const modalOverlay = getModal();
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('click', (e) => {
    // Open trigger
    const openBtn = e.target.closest('[data-open-modal="capability"]');
    if (openBtn) {
      e.preventDefault();
      openModal();
      return;
    }

    // Close trigger
    if (e.target.closest('.modal-close-btn')) {
      closeModal();
      return;
    }

    // Background overlay click
    const modalOverlay = getModal();
    if (modalOverlay && e.target === modalOverlay) {
      closeModal();
      return;
    }

    // Print button
    if (e.target.closest('.modal-print-btn')) {
      window.print();
    }
  });

  document.addEventListener('keydown', (e) => {
    const modalOverlay = getModal();
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Connecting Service Area Cards to RFP Intake Form
 */
function initServiceScopeLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-service-scope]');
    if (!link) return;

    const scopeVal = link.getAttribute('data-service-scope');
    const scopeSelect = document.getElementById('rfp-scope');
    const ctaSection = document.getElementById('partner-contact');

    if (scopeSelect && scopeVal) {
      scopeSelect.value = scopeVal;
    }

    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
      const reqField = document.getElementById('rfp-requirements');
      setTimeout(() => reqField?.focus(), 600);
    }
  });
}

/**
 * Interactive Procurement & RFP Intake Submission
 */
function initProcurementForm() {
  const form = document.getElementById('procurement-intake-form');
  const successBanner = document.getElementById('form-success-banner');
  const resetBtn = document.getElementById('form-reset-btn');

  if (!form || !successBanner) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validity check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Transmitting RFP Requirements...';
    submitBtn.disabled = true;

    // Simulate fast enterprise transmission
    setTimeout(() => {
      form.style.display = 'none';
      successBanner.classList.add('active');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 700);
  });

  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    successBanner.classList.remove('active');
  });
}
