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
  const masterHeader = document.getElementById('master-header') || document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta-btn, .drawer-modal-btn');

  // Dynamically compute exact header height for flawless body offset
  function syncHeaderHeight() {
    if (masterHeader) {
      const height = masterHeader.offsetHeight;
      document.documentElement.style.setProperty('--header-actual-height', `${height}px`);
    }
  }

  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('orientationchange', () => setTimeout(syncHeaderHeight, 150));

  // Master header shadow and compacting on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      masterHeader?.classList.add('scrolled');
    } else {
      masterHeader?.classList.remove('scrolled');
    }
  });

  function openDrawer() {
    drawer?.classList.add('active');
    backdrop?.classList.add('active');
    drawer?.setAttribute('aria-hidden', 'false');
    backdrop?.setAttribute('aria-hidden', 'false');
    toggleBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('active');
    backdrop?.classList.remove('active');
    drawer?.setAttribute('aria-hidden', 'true');
    backdrop?.setAttribute('aria-hidden', 'true');
    toggleBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', () => {
    const isOpen = drawer?.classList.contains('active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/**
 * One-click copy for UEI, CAGE and NAICS codes (vital for contracting officers)
 */
function initCopyCodeButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
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
  });
}

/**
 * Capability Statement Executive Modal
 */
function initCapabilityModal() {
  const openButtons = document.querySelectorAll('[data-open-modal="capability"]');
  const modalOverlay = document.getElementById('capability-modal');
  const closeButton = document.querySelector('.modal-close-btn');
  const printButton = document.querySelector('.modal-print-btn');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  closeButton?.addEventListener('click', closeModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });

  printButton?.addEventListener('click', () => {
    window.print();
  });
}

/**
 * Connecting Service Area Cards to RFP Intake Form
 */
function initServiceScopeLinks() {
  const scopeLinks = document.querySelectorAll('[data-service-scope]');
  const scopeSelect = document.getElementById('rfp-scope');
  const ctaSection = document.getElementById('partner-contact');

  scopeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const scopeVal = link.getAttribute('data-service-scope');
      
      if (scopeSelect && scopeVal) {
        scopeSelect.value = scopeVal;
      }

      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' });
        const reqField = document.getElementById('rfp-requirements');
        setTimeout(() => reqField?.focus(), 600);
      }
    });
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
