document.addEventListener('DOMContentLoaded', () => {

    const preloader = document.getElementById('preloader');
    const body = document.body;

    body.classList.add('no-scroll');

    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        body.classList.remove('no-scroll');
    }, 1000);

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.menu-link, .mobile-link');

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('show');
        body.classList.toggle('no-scroll');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {

            const targetPageName = link.getAttribute('data-page');

            menuLinks.forEach(item => item.classList.remove('active'));

            document.querySelectorAll(`[data-page="${targetPageName}"]`).forEach(matchedLink => {
                matchedLink.classList.add('active');
            });

            if (mobileMenu.classList.contains('show')) {
                hamburgerBtn.classList.remove('open');
                mobileMenu.classList.remove('show');
                body.classList.remove('no-scroll');
            }
        });
    });

    const scrollElements = document.querySelectorAll('.fade-up');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        })
    }

    handleScrollAnimation();

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});




AOS.init({
    duration: 1200,
    once: true,
    offset: 100
});




const progressBars =
    document.querySelectorAll(".progress span");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.width =
                entry.target.getAttribute("style")
                    .split(":")[1];

        }

    });

});

progressBars.forEach(bar => {

    const width = bar.style.width;

    bar.style.width = "0%";

    bar.setAttribute("data-width", width);

    observer.observe(bar);

});

progressBars.forEach(bar => {

    const width = bar.getAttribute("data-width");

    bar.style.width = width;

});


document.addEventListener('DOMContentLoaded', () => {

    const cards3D = document.querySelectorAll('.card-3d');
    const btnPrev3D = document.getElementById('prev-3d');
    const btnNext3D = document.getElementById('next-3d');

    if (cards3D.length > 0 && btnPrev3D && btnNext3D) {
        let currentCardIndex = 0;

        function update3DCards() {
            cards3D.forEach((card, index) => {
                card.classList.remove('active', 'next', 'prev', 'hidden');

                let position = index - currentCardIndex;

                if (position < 0) {
                    position += cards3D.length;
                }

                if (position === 0) {
                    card.classList.add('active');
                } else if (position === 1) {
                    card.classList.add('next');
                } else if (position === cards3D.length - 1) {
                    card.classList.add('prev');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        cards3D.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (currentCardIndex === index) return;

                currentCardIndex = index;
                update3DCards();
            });
        });

        btnNext3D.addEventListener('click', () => {
            currentCardIndex = (currentCardIndex + 1) % cards3D.length;
            update3DCards();
        });

        btnPrev3D.addEventListener('click', () => {
            currentCardIndex = (currentCardIndex - 1 + cards3D.length) % cards3D.length;
            update3DCards();
        });

        update3DCards();
    }
});


document.addEventListener('DOMContentLoaded', () => {

    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatStream = document.getElementById('chat-stream');

    if (chatInput && chatSendBtn && chatStream) {

        function sendMessage() {
            const messageText = chatInput.value.trim();

            if (messageText !== "") {
                const newMsg = document.createElement('div');
                newMsg.className = 'chat-msg user-msg';
                newMsg.style.animationDelay = '0s';

                newMsg.innerHTML = `
                    <div class="tutor-icon" style="background: #4C1D95; color: white;"><i class="fas fa-user"></i></div>
                    <div class="msg-content">
                        <h4>You <span>Just now</span></h4>
                        <p>${messageText}</p>
                    </div>
                `;

                const emojis = chatStream.querySelector('.floating-emojis');
                if (emojis) {
                    chatStream.insertBefore(newMsg, emojis);
                } else {
                    chatStream.appendChild(newMsg);
                }

                chatInput.value = '';

                chatStream.scrollTo({
                    top: chatStream.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }

        chatSendBtn.addEventListener('click', sendMessage);

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {

    const newsForm = document.getElementById('newsletter-form');
    const newsEmail = document.getElementById('newsletter-email');
    const emailMsg = document.getElementById('email-msg');

    if (newsForm && newsEmail && emailMsg) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailValue = newsEmail.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailValue === "") {

                emailMsg.textContent = "Please enter your email address.";
                emailMsg.style.color = "#ef4444";
                emailMsg.classList.add('show');
            } else if (!emailRegex.test(emailValue)) {

                emailMsg.textContent = "Invalid email format. Please check again.";
                emailMsg.style.color = "#ef4444";
                emailMsg.classList.add('show');
            } else {
                window.location.href = '404page.html';
            }
        });
    }
});

const images = document.querySelectorAll('img');

images.forEach(img => {
    if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
        const fileName = img.src.substring(img.src.lastIndexOf('/') + 1).split('.')[0];
        const cleanAltText = fileName.replace(/[-_]/g, ' ') || 'Website Image';
        img.setAttribute('alt', cleanAltText);
    }
});