document.addEventListener('DOMContentLoaded', function() {

    // 1. SMOOTH SCROLLING FOR ANCHOR LINKS
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                history.pushState(null, null, href);
            }
        });
    });


    // 2. ACTIVE NAVIGATION HIGHLIGHTING
    function setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navigation a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');

            link.classList.remove('active');

            if (linkPage === currentPage ||
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    setActiveNavigation();


    // 3. MOBILE MENU TOGGLE
    function createMobileMenu() {
        const nav = document.querySelector('.navigation');
        const header = document.querySelector('.header-content');

        if (!document.querySelector('.menu-toggle') && window.innerWidth <= 768) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<span></span><span></span><span></span>';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            menuToggle.setAttribute('aria-expanded', 'false');

            header.insertBefore(menuToggle, nav);

            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                this.classList.toggle('active');

                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
            });

            document.addEventListener('click', function(e) {
                if (!header.contains(e.target)) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);


    // 4. SCROLL-TO-TOP BUTTON
    function createScrollToTop() {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '↑';
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            scrollBtn.style.display = 'none';
            document.body.appendChild(scrollBtn);

            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollBtn.style.display = 'block';
                } else {
                    scrollBtn.style.display = 'none';
                }
            });

            scrollBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    createScrollToTop();


    // 5. KEYBOARD NAVIGATION ENHANCEMENT
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const nav = document.querySelector('.navigation.active');
            const menuToggle = document.querySelector('.menu-toggle.active');

            if (nav && menuToggle) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

});
