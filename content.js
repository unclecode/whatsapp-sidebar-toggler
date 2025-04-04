// Wait for WhatsApp to load
function waitForWhatsApp() {
    console.log('[WhatsApp Sidebar Toggle] Waiting for WhatsApp Web to load...');
    const header = document.querySelector('header');
    const sidebar = document.querySelector('#side');

    if (header && sidebar) {
        console.log('[WhatsApp Sidebar Toggle] Elements found, adding toggle button...');
        addToggleButton(header, sidebar.parentElement);
    } else {
        setTimeout(waitForWhatsApp, 500);
    }
}

function addToggleButton(header, sidebar) {
    // Create toggle button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = '_ajv7 x1n2onr6 x1okw0bk x5yr21d x14yjl9h xudhj91 x18nykt9 xww2gxu xlkovuz x16j0l1c xyklrzc x1mh8g0r x1anpbxc x18wx58x xo92w5m';

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'x1afcbsf x1heor9g x1y1aw1k x1sxyh0 xwib8y2 xurb0ha xxk0z11 xvy4d1p x78zum5 xl56j7k x6s0dn4';
    toggleButton.setAttribute('aria-label', 'Toggle Sidebar');
    toggleButton.setAttribute('title', 'Toggle Sidebar');

    // Create icon

    const icon = document.createElement('span');
    icon.innerHTML = `
  <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
    <path d="M3 5v14h18V5H3zm16 2v10H9V7h10z"></path>
  </svg>
    `;

    // Toggle functionality
    let isHidden = false;
    toggleButton.addEventListener('click', () => {
        isHidden = !isHidden;
        if (isHidden) {
            sidebar.style.width = '0';
            sidebar.style.flex = '0 0 0%';
            sidebar.style.overflow = 'hidden';
            icon.innerHTML = `
                 <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
                    <path d="M3 5v14h18V5H3zm2 2h14v10H5V7z"></path>
                </svg>
            `;
        } else {
            sidebar.style.width = '';
            sidebar.style.flex = '';
            sidebar.style.overflow = '';
            icon.innerHTML = `
                <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
                    <path d="M3 5v14h18V5H3zm16 2v10H9V7h10z"></path>
                </svg>
            `;
        }
    });

    // Assemble and add to DOM
    toggleButton.appendChild(icon);
    buttonContainer.appendChild(toggleButton);

    // Find the header's last child and insert after it
    const headerButtonsContainer = header.querySelector('div > div > div > div > span > div');
    if (headerButtonsContainer) {
        headerButtonsContainer.appendChild(buttonContainer);
        console.log('[WhatsApp Sidebar Toggle] Toggle button added successfully');
    } else {
        console.warn('[WhatsApp Sidebar Toggle] Could not find header buttons container');
    }
}

// Start the process when DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    waitForWhatsApp();
} else {
    document.addEventListener('DOMContentLoaded', waitForWhatsApp);
}