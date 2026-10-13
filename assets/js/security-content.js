/* Demo values only. Replace these with approved advisories and local certificates. */
window.securityContent = {
  advisories: [
    { id: 'demo-1', year: '2026', title: 'Security Vulnerability in HikCentral Access Control', demo: true },
    { id: 'demo-2', year: '2026', title: 'Command Execution Vulnerability in Some Wireless Access Point Products', demo: true },
    { id: 'demo-3', year: '2025', title: 'Security Vulnerability in HikCentral Access Control', demo: true },
    { id: 'demo-4', year: '2025', title: 'Command Execution Vulnerability in Some Wireless Access Point Products', demo: true },
  ],
  certificates: Array.from({ length: 8 }, (_, i) => ({ title: `Certificate ${String(i + 1).padStart(2, '0')}`, image: '', alt: '', placeholder: true })),
};
