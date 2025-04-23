class NavbarLoader {
    static async loadNavbar() {
        try {
            const response = await fetch('/default/layout.html');
            const html = await response.text();
            
            document.body.insertAdjacentHTML('afterbegin', html);
            
            this.setActiveLink();
        } catch (error) {
            console.error('Không thể load được thanh điều hướng:', error);
        }
    }

    static setActiveLink() {
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-list a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentLocation) {
                link.classList.add('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    NavbarLoader.loadNavbar();
});