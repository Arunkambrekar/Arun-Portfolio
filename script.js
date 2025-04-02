document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Navigation
    // ======================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ======================
    // Header Scroll Effect
    // ======================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ======================
    // Current Year in Footer
    // ======================
    document.getElementById('year').textContent = new Date().getFullYear();

    // ======================
    // Back to Top Button
    // ======================
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ======================
    // Contact Form Submission
    // ======================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            console.log({ name, email, subject, message });
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // ======================
    // Dark Mode Toggle
    // ======================
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', 
            document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // ======================
    // Typewriter Effect
    // ======================
    const taglines = [
        "I build responsive websites that convert",
        "Front-end developer focused on UX",
        "Turning concepts into clean code"
    ];
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (typewriterElement) {
        let lineIndex = 0;
        let isDeleting = false;
        let charIndex = 0;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseBetweenLines = 1500;
        const pauseBetweenTyping = 2000;

        function typeWriter() {
            const currentText = taglines[lineIndex];
            
            if (!isDeleting && charIndex < currentText.length) {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } 
            else if (!isDeleting) {
                isDeleting = true;
                setTimeout(typeWriter, pauseBetweenLines);
            }
            else if (isDeleting && charIndex > 0) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, deletingSpeed);
            }
            else {
                isDeleting = false;
                lineIndex = (lineIndex + 1) % taglines.length;
                setTimeout(typeWriter, pauseBetweenTyping);
            }
        }

        // Start the animation
        typeWriter();
    }

    // ======================
    // Skill Bar Animations
    // ======================
    function animateSkillBars() {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // ======================
    // Intersection Observer
    // ======================
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ======================
    // Syntax Highlighting
    // ======================
    const code = document.querySelector('.javascript');
    if (code) {
        const codeText = code.textContent;
        const keywords = ['const', 'let', 'var', 'function', 'return', 'true', 'false', 'if', 'else'];
        const strings = /(["'])(?:(?=(\\?))\2.)*?\1/g;
        
        let highlightedCode = codeText;
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        highlightedCode = highlightedCode.replace(strings, '<span class="string">$&</span>');
        code.innerHTML = highlightedCode;
    }
});