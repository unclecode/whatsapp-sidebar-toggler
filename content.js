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

    // Toggle functionality with three modes: default, condensed, hidden
    let mode = 'default'; // Possible values: 'default', 'condensed', 'hidden'

    toggleButton.addEventListener('click', () => {
        // Cycle through modes: default -> condensed -> hidden -> default
        switch (mode) {
            case 'default':
                // Switch to condensed mode
                mode = 'condensed';

                // Set sidebar parent to take less space (30%)
                sidebar.style.width = '';
                sidebar.style.flex = '0 0 30%';
                sidebar.style.overflow = '';

                // Find and condense chat list items
                const chatList = document.querySelector('div[aria-label="Chat list"]');
                if (chatList) {
                    // Apply condensed styles to chat list itself
                    chatList.style.fontSize = '0.9em';

                    // If the chat list has a fixed height attribute, adjust it to reflect condensed items
                    const originalHeight = chatList.style.height;
                    if (originalHeight && originalHeight.endsWith('px')) {
                        const heightValue = parseInt(originalHeight);
                        if (!isNaN(heightValue)) {
                            // Calculate approximately what the new height should be (about 62.5% of original)
                            const newHeight = Math.round(heightValue * 0.625);
                            chatList.style.height = newHeight + 'px';
                        }
                    }

                    // Apply styles to make chat items more compact
                    const listItems = chatList.querySelectorAll('[role="listitem"]');
                    const itemHeight = 45; // New reduced height for each item

                    listItems.forEach((item, index) => {
                        // Reduce height of list items
                        item.style.height = itemHeight + 'px';
                        item.style.minHeight = itemHeight + 'px';
                        item.style.overflow = 'hidden';

                        // Adjust translateY based on new item height
                        const currentTransform = item.style.transform;
                        if (currentTransform && currentTransform.includes('translateY')) {
                            // Extract current Y position and replace with new position based on index
                            const newTransform = 'translateY(' + (index * itemHeight) + 'px)';
                            item.style.transform = newTransform;
                        }

                        // Reduce padding and margin in the list item
                        const itemContainers = item.querySelectorAll('div');
                        itemContainers.forEach(container => {
                            container.style.padding = container.style.padding ?
                                Math.max(parseInt(container.style.padding) - 2, 0) + 'px' : '0px';
                            container.style.margin = container.style.margin ?
                                Math.max(parseInt(container.style.margin) - 2, 0) + 'px' : '0px';
                            container.style.overflow = 'hidden';
                        });

                        // Make avatars smaller
                        const avatar = item.querySelector('.x1n2onr6.x14yjl9h.xudhj91.x18nykt9.xww2gxu');
                        if (avatar) {
                            avatar.style.height = '36px';
                            avatar.style.width = '36px';
                            avatar.style.margin = '0 6px 0 0';
                        }

                        // Make avatar image smaller
                        const avatarImg = avatar ? avatar.querySelector('img') : null;
                        if (avatarImg) {
                            avatarImg.style.height = '36px';
                            avatarImg.style.width = '36px';
                        }

                        // Condense the username/contact name
                        const contactName = item.querySelector('._ak8q .x1c4vz4f span');
                        if (contactName) {
                            contactName.style.fontSize = '0.9em';
                            contactName.style.lineHeight = '1.2';
                        }

                        // Condense timestamp
                        const timestamp = item.querySelector('._ak8i');
                        if (timestamp) {
                            timestamp.style.fontSize = '0.8em';
                        }

                        // Condense the message preview
                        const messagePreview = item.querySelector('._ak8k');
                        if (messagePreview) {
                            messagePreview.style.maxWidth = '130px';
                            messagePreview.style.overflow = 'hidden';
                            messagePreview.style.textOverflow = 'ellipsis';
                            messagePreview.style.whiteSpace = 'nowrap';
                            messagePreview.style.fontSize = '0.85em';
                            messagePreview.style.lineHeight = '1.2';

                            // If there are emojis in the message preview, make them smaller
                            const emojis = messagePreview.querySelectorAll('.emoji');
                            emojis.forEach(emoji => {
                                emoji.style.transform = 'scale(0.85)';
                                emoji.style.transformOrigin = 'left center';
                            });
                        }

                        // Reduce space for notification badges
                        const notificationArea = item.querySelector('._ak8i [aria-label]');
                        if (notificationArea) {
                            notificationArea.style.transform = 'scale(0.85)';
                            notificationArea.style.transformOrigin = 'right center';
                        }

                        // Reduce the size of the message status icons (like the double check marks)
                        const statusIcons = item.querySelectorAll('[data-icon]');
                        statusIcons.forEach(icon => {
                            icon.style.transform = 'scale(0.85)';
                            icon.style.transformOrigin = 'left center';
                        });
                    });
                }

                // Change icon to condensed mode icon (half-sized sidebar)
                icon.innerHTML = `
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
                        <path d="M3 5v14h18V5H3zm6 2h10v10H9V7z"></path>
                    </svg>
                `;



                break;

            case 'condensed':
                // Switch to hidden mode
                mode = 'hidden';

                // Hide sidebar completely
                sidebar.style.width = '0';
                sidebar.style.flex = '0 0 0%';
                sidebar.style.overflow = 'hidden';

                // Change icon to hidden mode icon
                icon.innerHTML = `
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
                        <path d="M3 5v14h18V5H3zm2 2h14v10H5V7z"></path>
                    </svg>
                `;
                break;

            case 'hidden':
                // Return to default mode
                mode = 'default';

                // Reset sidebar to default
                sidebar.style.width = '';
                sidebar.style.flex = '';
                sidebar.style.overflow = '';

                // Reset chat list items to default
                const defaultChatList = document.querySelector('div[aria-label="Chat list"]');
                if (defaultChatList) {
                    // Reset chat list container styles
                    defaultChatList.style.fontSize = '';
                    defaultChatList.style.height = '';

                    // Reset all list items
                    const defaultListItems = defaultChatList.querySelectorAll('[role="listitem"]');
                    defaultListItems.forEach((item, index) => {
                        // Reset list item height and min-height
                        item.style.height = '';
                        item.style.minHeight = '';
                        item.style.overflow = '';

                        // Reset transform to original value (72px per item)
                        const currentTransform = item.style.transform;
                        if (currentTransform && currentTransform.includes('translateY')) {
                            // Restore default transform - spacing items 72px apart
                            const newTransform = 'translateY(' + (index * 72) + 'px)';
                            item.style.transform = newTransform;
                        }

                        // Reset container padding, margins and overflow
                        const itemContainers = item.querySelectorAll('div');
                        itemContainers.forEach(container => {
                            container.style.padding = '';
                            container.style.margin = '';
                            container.style.overflow = '';
                        });

                        // Reset avatar size
                        const avatar = item.querySelector('.x1n2onr6.x14yjl9h.xudhj91.x18nykt9.xww2gxu');
                        if (avatar) {
                            avatar.style.height = '49px';
                            avatar.style.width = '49px';
                            avatar.style.margin = '';
                        }

                        // Reset avatar image size
                        const avatarImg = avatar ? avatar.querySelector('img') : null;
                        if (avatarImg) {
                            avatarImg.style.height = '';
                            avatarImg.style.width = '';
                        }

                        // Reset contact name styles
                        const contactName = item.querySelector('._ak8q .x1c4vz4f span');
                        if (contactName) {
                            contactName.style.fontSize = '';
                            contactName.style.lineHeight = '';
                        }

                        // Reset timestamp style
                        const timestamp = item.querySelector('._ak8i');
                        if (timestamp) {
                            timestamp.style.fontSize = '';
                        }

                        // Reset message preview styles
                        const messagePreview = item.querySelector('._ak8k');
                        if (messagePreview) {
                            messagePreview.style.maxWidth = '';
                            messagePreview.style.overflow = '';
                            messagePreview.style.textOverflow = '';
                            messagePreview.style.whiteSpace = '';
                            messagePreview.style.fontSize = '';
                            messagePreview.style.lineHeight = '';

                            // Reset emoji sizes
                            const emojis = messagePreview.querySelectorAll('.emoji');
                            emojis.forEach(emoji => {
                                emoji.style.transform = '';
                                emoji.style.transformOrigin = '';
                            });
                        }

                        // Reset notification badge size
                        const notificationArea = item.querySelector('._ak8i [aria-label]');
                        if (notificationArea) {
                            notificationArea.style.transform = '';
                            notificationArea.style.transformOrigin = '';
                        }

                        // Reset message status icons size
                        const statusIcons = item.querySelectorAll('[data-icon]');
                        statusIcons.forEach(icon => {
                            icon.style.transform = '';
                            icon.style.transformOrigin = '';
                        });
                    });
                }

                // Change icon back to default mode icon
                icon.innerHTML = `
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
                        <path d="M3 5v14h18V5H3zm16 2v10H9V7h10z"></path>
                    </svg>
                `;

                setTimeout(() => {
                    document.querySelectorAll('div[aria-label="chat-list-filters"] button')[1].click()
                    setTimeout(() => {
                        document.querySelectorAll('div[aria-label="chat-list-filters"] button')[0].click()
                    }, 50);
                }, 50);
                break;
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