// SPA navigation, animation, and tab logic

// Helper to switch visible page
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        // Animate out if active
        if (page.classList.contains('active')) {
            page.classList.remove('active');
            page.style.animationName = 'fadeOutDown';
            setTimeout(() => {
                page.style.display = 'none';
                page.style.opacity = 0;
            }, 450);
        }
    });
    // Animate in new page
    const nextPage = document.getElementById('page-' + pageId);
    if (nextPage) {
        setTimeout(() => {
            nextPage.style.display = 'block';
            nextPage.style.opacity = 1;
            nextPage.classList.add('active');
            nextPage.style.animationName = 'fadeInUp';
        }, 390);
    }
    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// SPA navigation via nav bar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const pageId = link.dataset.page;
        if (pageId) switchPage(pageId);
    });
});

// SPA navigation via Next button
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const next = btn.dataset.next;
        if (next) switchPage(next);
    });
});

// Tabs in About Us section
function showTab(tabName) {
    document.querySelectorAll('#page-about .tab-link').forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    document.querySelectorAll('#page-about .tab-content').forEach(content => {
        if (content.id === 'tab-' + tabName) {
            content.style.display = 'block';
            content.style.animation = 'tabFadeIn 0.32s';
        } else {
            content.style.display = 'none';
            content.style.animation = '';
        }
    });
}

// Tab click (within About Us page: top tabs)
document.querySelectorAll('#page-about .tab-link').forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();
        showTab(tab.dataset.tab);
    });
});

// Tab click from About Us dropdown in nav
document.querySelectorAll('.dropdown-content .tab-link').forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();
        // Show About Us page
        switchPage('about');
        // Show the relevant tab
        showTab(tab.dataset.tab);
    });
});

// Set default About Us tab on page load
document.addEventListener('DOMContentLoaded', () => {
    showTab('network');
});
