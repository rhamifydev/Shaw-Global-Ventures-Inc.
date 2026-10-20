/**
 * SHAW GLOBAL VENTURES INC. (SGV)
 * Reusable Web Component Engine: Header, Mobile Sidebar, Modal & Footer
 * Matches high-precision Federal Government Contractor visual standards.
 */

(function () {
  'use strict';

  /**
   * Reusable Header Component (<site-header active="home|about"></site-header>)
   */
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const active = (this.getAttribute('active') || '').toLowerCase();
      
      const homeActive = active === 'home' ? 'active' : '';
      const aboutActive = (active === 'about' || active === 'about-us') ? 'active' : '';
      const aboutCurrent = aboutActive ? 'aria-current="page"' : '';

      this.innerHTML = `
        <div class="header-master-wrapper" id="master-header">
          <!-- Federal Command Ribbon -->
          <aside class="gov-topbar" aria-label="Federal contractor data ribbon">
            <div class="container gov-topbar-inner">
              <div class="gov-badge-group">
                <span class="gov-pill veteran-badge">
                  <svg class="star-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Veteran-Led Enterprise
                </span>
                <span class="gov-pill hide-on-mobile">
                  DBA: GES Social Media Management
                </span>
                <span class="gov-pill hide-on-mobile">
                  Status: Active in SAM.gov
                </span>
              </div>

              <div class="gov-data-codes">
                <div class="code-item">
                  <span class="code-label">UEI:</span>
                  <span class="code-val" id="top-uei">[YOUR UEI]</span>
                  <button class="copy-btn" data-copy="[YOUR UEI]" title="Copy UEI" aria-label="Copy UEI to clipboard">Copy</button>
                </div>
                <div class="code-item">
                  <span class="code-label">CAGE:</span>
                  <span class="code-val" id="top-cage">[YOUR CAGE]</span>
                  <button class="copy-btn" data-copy="[YOUR CAGE]" title="Copy CAGE" aria-label="Copy CAGE to clipboard">Copy</button>
                </div>
                <div class="code-item hide-on-mobile">
                  <span class="code-label">Primary NAICS:</span>
                  <span class="code-val">541820 • 541810 • 423450</span>
                </div>
              </div>
            </div>
          </aside>

          <!-- Main Navigation Bar -->
          <header class="site-header" role="banner">
            <div class="container nav-container">
              <a href="index.html" class="brand-link" aria-label="Shaw Global Ventures Home">
                <img src="assets/logo.svg" alt="Shaw Global Ventures Inc. - Northbound Compass Emblem" class="brand-logo-img">
              </a>

              <nav aria-label="Main Navigation">
                <ul class="nav-menu">
                  <li><a href="index.html" class="nav-link ${homeActive}">Home</a></li>
                  <li><a href="about.html" class="nav-link ${aboutActive}" ${aboutCurrent}>About Us</a></li>
                  <li><a href="index.html#services" class="nav-link">Core Capabilities</a></li>
                  <li><a href="index.html#procurement-specs" class="nav-link">Contractor Data</a></li>
                  <li><a href="index.html#partner-contact" class="nav-link">Partner With SGV</a></li>
                </ul>
              </nav>

              <div class="nav-actions">
                <button type="button" class="btn btn-outline-midnight desktop-only-btn" data-open-modal="capability">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Capability Statement
                </button>

                <a href="index.html#partner-contact" class="btn btn-brass nav-cta-btn">
                  Discuss Procurement
                </a>

                <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-drawer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </header>
        </div>
      `;
    }
  }

  /**
   * Reusable Mobile Sidebar / Drawer Component (<site-sidebar active="home|about"></site-sidebar>)
   */
  class SiteSidebar extends HTMLElement {
    connectedCallback() {
      const active = (this.getAttribute('active') || '').toLowerCase();
      
      const homeActive = active === 'home' ? 'active' : '';
      const aboutActive = (active === 'about' || active === 'about-us') ? 'active' : '';

      this.innerHTML = `
        <div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop" aria-hidden="true"></div>
        <aside class="mobile-drawer" id="mobile-drawer" aria-label="Mobile Navigation" aria-hidden="true">
          <div class="drawer-header">
            <img src="assets/logo.svg" alt="Shaw Global Ventures Logo" class="drawer-logo">
            <button class="drawer-close-btn" id="drawer-close-btn" aria-label="Close navigation menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav class="drawer-nav" aria-label="Mobile Drawer Navigation">
            <ul class="drawer-menu">
              <li>
                <a href="index.html" class="drawer-link ${homeActive}">
                  <span>Home</span>
                  <svg class="drawer-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="about.html" class="drawer-link ${aboutActive}">
                  <span>About Us</span>
                  <svg class="drawer-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="index.html#services" class="drawer-link">
                  <span>Core Service Areas</span>
                  <svg class="drawer-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="index.html#procurement-specs" class="drawer-link">
                  <span>Federal Contractor Data</span>
                  <svg class="drawer-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
              <li>
                <a href="index.html#partner-contact" class="drawer-link">
                  <span>Partner With SGV</span>
                  <svg class="drawer-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
              </li>
            </ul>
          </nav>

          <div class="drawer-actions">
            <button type="button" class="btn btn-outline-midnight drawer-modal-btn" data-open-modal="capability">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              Capability Statement (PDF)
            </button>

            <a href="index.html#partner-contact" class="btn btn-brass drawer-cta-btn">
              Discuss Procurement
            </a>
          </div>

          <!-- Federal Credentials Card at Bottom of Sidebar -->
          <div class="drawer-footer-credentials">
            <div class="drawer-cred-badges">
              <span class="gov-pill veteran-badge"><svg class="star-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Veteran-Led</span>
              <span class="gov-pill">Active in SAM.gov</span>
            </div>

            <div class="drawer-cred-dba">
              DBA: GES Social Media Management
            </div>

            <div class="drawer-cred-codes">
              <div class="code-item">
                <span class="code-label">UEI:</span>
                <span class="code-val">[YOUR UEI]</span>
                <button class="copy-btn" data-copy="[YOUR UEI]" title="Copy UEI" aria-label="Copy UEI">Copy</button>
              </div>
              <div class="code-item">
                <span class="code-label">CAGE:</span>
                <span class="code-val">[YOUR CAGE]</span>
                <button class="copy-btn" data-copy="[YOUR CAGE]" title="Copy CAGE" aria-label="Copy CAGE">Copy</button>
              </div>
            </div>

            <div class="drawer-cred-naics">
              <span class="code-label">Primary NAICS:</span>
              <span class="code-val">541820 • 541810 • 423450</span>
            </div>
          </div>
        </aside>
      `;
    }
  }

  /**
   * Reusable Capability Modal Component (<capability-modal></capability-modal>)
   */
  class CapabilityModal extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="modal-overlay" id="capability-modal" role="dialog" aria-modal="true" aria-labelledby="modal-cap-title">
          <div class="modal-content">
            <div class="modal-bar-actions">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 8px;">
                <svg class="star-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                OFFICIAL CAPABILITY STATEMENT • SHAW GLOBAL VENTURES INC.
              </span>
              <div style="display: flex; gap: 12px; align-items: center;">
                <button type="button" class="btn btn-outline-brass modal-print-btn" style="padding: 5px 12px; font-size: 0.78rem;">
                  Print / Save PDF
                </button>
                <button type="button" class="modal-close-btn" aria-label="Close modal">&times;</button>
              </div>
            </div>

            <div class="capability-sheet">
              <div class="cap-sheet-header">
                <div>
                  <h2 class="cap-sheet-title" id="modal-cap-title">SHAW GLOBAL VENTURES INC.</h2>
                  <div class="cap-sheet-subtitle">DBA: GES SOCIAL MEDIA MANAGEMENT • VETERAN-LED SMALL BUSINESS</div>
                  <div style="font-size: 0.88rem; color: #536479; margin-top: 4px;">
                    Government Contracting | Digital Outreach | Supply Solutions
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-family: var(--font-serif); font-style: italic; color: var(--color-brass-dark); font-size: 0.95rem;">
                    “True north for public service.”
                  </div>
                  <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-teal); margin-top: 4px;">
                    SAM.GOV ACTIVE
                  </div>
                </div>
              </div>

              <div class="cap-sheet-section">
                <div class="cap-section-heading">Corporate Identifiers &amp; Federal Codes</div>
                <div class="cap-meta-grid">
                  <div>
                    <strong>Legal Business Name:</strong><br>
                    Shaw Global Ventures Inc.
                  </div>
                  <div>
                    <strong>Unique Entity ID (UEI):</strong><br>
                    <span style="font-family: var(--font-mono); font-weight: 600;">[YOUR UEI]</span>
                  </div>
                  <div>
                    <strong>CAGE Code:</strong><br>
                    <span style="font-family: var(--font-mono); font-weight: 600;">[YOUR CAGE]</span>
                  </div>
                  <div>
                    <strong>Operating DBA:</strong><br>
                    GES Social Media Management
                  </div>
                  <div>
                    <strong>Socio-Economic Status:</strong><br>
                    Veteran-Led Small Business
                  </div>
                  <div>
                    <strong>Contract Role:</strong><br>
                    Prime &amp; Subcontractor
                  </div>
                </div>
              </div>

              <div class="cap-sheet-section">
                <div class="cap-section-heading">Core Competencies &amp; Service Pillars</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 0.88rem;">
                  <div>
                    <strong style="color: var(--color-midnight);">Pillar 1: Social Media Management &amp; Digital Outreach</strong>
                    <p style="color: #4b5563; margin-top: 4px;">Constituent engagement, public transparency, crisis communication protocol, Section 508 accessibility compliance.</p>
                  </div>
                  <div>
                    <strong style="color: var(--color-midnight);">Pillar 2: Marketing, Advertising &amp; PR Support</strong>
                    <p style="color: #4b5563; margin-top: 4px;">Multi-channel civic awareness campaigns, recruitment initiatives, press releases, and stakeholder communications.</p>
                  </div>
                  <div>
                    <strong style="color: var(--color-midnight);">Pillar 3: Medical and PPE Supplies</strong>
                    <p style="color: #4b5563; margin-top: 4px;">Medical grade examination gloves, N95/surgical masks, face shields, isolation gowns, and rapid distribution contracts.</p>
                  </div>
                  <div>
                    <strong style="color: var(--color-midnight);">Pillar 4: Janitorial &amp; Facility Supplies</strong>
                    <p style="color: #4b5563; margin-top: 4px;">Commercial disinfectants, institutional paper goods, floor care machinery, custodial tools, Green Seal solutions.</p>
                  </div>
                </div>
              </div>

              <div class="cap-sheet-section">
                <div class="cap-section-heading">North American Industry Classification System (NAICS)</div>
                <div class="cap-naics-list">
                  <div class="cap-naics-item"><strong>541820</strong> (Primary) - Public Relations Agencies</div>
                  <div class="cap-naics-item"><strong>541810</strong> - Advertising Agencies</div>
                  <div class="cap-naics-item"><strong>541830</strong> - Media Buying Agencies</div>
                  <div class="cap-naics-item"><strong>423450</strong> - Medical, Dental &amp; Hospital Equipment Wholesalers</div>
                  <div class="cap-naics-item"><strong>423850</strong> - Service Establishment Equipment &amp; Supplies</div>
                  <div class="cap-naics-item"><strong>561720</strong> - Janitorial Services Support</div>
                </div>
              </div>

              <div class="cap-sheet-section">
                <div class="cap-section-heading">Differentiators &amp; Value Proposition</div>
                <ul style="padding-left: 18px; font-size: 0.88rem; color: #374151; line-height: 1.6;">
                  <li><strong>Veteran-Led Discipline:</strong> Strict adherence to operational schedules, transparent deliverables, and contract specification precision.</li>
                  <li><strong>Dual-Vector Service Capability:</strong> Unified contracting vehicle capable of delivering sophisticated digital public relations alongside critical physical supplies.</li>
                  <li><strong>Responsiveness &amp; Agility:</strong> Dedicated single-point-of-contact contracting officer liaison ensuring zero bureaucratic lag.</li>
                </ul>
              </div>

              <div style="border-top: 1px solid #ded4bf; padding-top: 16px; font-size: 0.82rem; color: #536479; display: flex; justify-content: space-between;">
                <div><strong>Inquiries:</strong> contracts@shawglobalventures.com</div>
                <div><strong>Website:</strong> www.shawglobalventures.com</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  /**
   * Reusable Footer Component (<site-footer></site-footer>)
   */
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <footer class="site-footer" role="contentinfo">
          <div class="container">
            <div class="footer-top-grid">
              <div>
                <div class="footer-logo-box">
                  <img src="assets/logo-white.svg" alt="Shaw Global Ventures White Emblem" style="height: 48px; width: auto;">
                </div>
                <p class="footer-mission">
                  Providing digital communications, public outreach, and essential supply solutions to government agencies and institutions with veteran-led precision and dependable delivery.
                </p>
                <div class="footer-motto-quote">
                  “True north for public service.”
                </div>
              </div>

              <div>
                <h4 class="footer-col-title">Navigation</h4>
                <ul class="footer-links">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="index.html#services">Core Capabilities</a></li>
                  <li><a href="index.html#procurement-specs">Federal Contractor Data</a></li>
                  <li><a href="index.html#partner-contact">Partner With SGV</a></li>
                </ul>
              </div>

              <div>
                <h4 class="footer-col-title">Contractor Data</h4>
                <ul class="footer-links">
                  <li><a href="index.html#procurement-specs">Designated NAICS Codes</a></li>
                  <li><a href="index.html#procurement-specs">Federal CAGE &amp; UEI</a></li>
                  <li><a href="index.html#procurement-specs">Teaming Opportunities</a></li>
                  <li><a href="#hero" data-open-modal="capability">Capability Statement</a></li>
                  <li><a href="index.html#partner-contact">RFP / Tender Submission</a></li>
                </ul>
              </div>

              <div>
                <h4 class="footer-col-title">Procurement Contact</h4>
                <ul class="footer-links" style="font-family: var(--font-mono); font-size: 0.82rem;">
                  <li style="color: var(--color-parchment);">Shaw Global Ventures Inc.</li>
                  <li>DBA: GES Social Media Management</li>
                  <li style="color: var(--color-brass);">contracts@shawglobalventures.com</li>
                  <li>Veteran-Led Small Business</li>
                  <li style="color: #79ded7;">Active in SAM.gov</li>
                </ul>
              </div>
            </div>

            <div class="footer-bottom">
              <div>
                &copy; 2026 Shaw Global Ventures Inc. All rights reserved.
              </div>
              <div class="dba-legal-badge">
                Doing Business As: GES Social Media Management
              </div>
              <div>
                Built with precision • Brand Direction 01: Northbound
              </div>
            </div>
          </div>
        </footer>
      `;
    }
  }

  // Register Custom Elements
  if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }
  if (!customElements.get('site-sidebar')) {
    customElements.define('site-sidebar', SiteSidebar);
  }
  if (!customElements.get('capability-modal')) {
    customElements.define('capability-modal', CapabilityModal);
  }
  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }

})();
