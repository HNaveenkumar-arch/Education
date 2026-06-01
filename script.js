document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PRELOADER LOGIC (3 Seconds Delay) ---
    const preloader = document.getElementById('preloader');
    const body = document.body;

    // Prevent scrolling while preloader is active
    body.classList.add('no-scroll');

    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        body.classList.remove('no-scroll');
    }, 3000); // 3000ms = 3 Seconds

    // --- 2. MOBILE MENU LOGIC ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.menu-link, .mobile-link');

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('show');
        body.classList.toggle('no-scroll');
    });

    // --- 3. ACTIVE LINK MANAGEMENT ---
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
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

    // --- 4. SCROLL ANIMATION LOGIC ---
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

    // Check elements on load
    handleScrollAnimation();

    // Check elements on scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});



/////
const titles = [
    "Learn Without Limits",
    "Shape Your Future Today",
    "Knowledge That Creates Opportunities"
];

const descriptions = [
    "Unlock your potential with expert-led courses, interactive lessons, and a learning experience designed for future success.",

    "Master new skills, earn certifications, and build a successful career through industry-focused education programs.",

    "Join thousands of learners worldwide and gain practical experience through engaging online learning environments."
];

const images = document.querySelectorAll(".hero-image");

let current = 0;

setInterval(() => {

    current++;

    if (current >= titles.length) {
        current = 0;
    }

    document.getElementById("heroTitle").textContent =
        titles[current];

    document.getElementById("heroText").textContent =
        descriptions[current];

    images.forEach(img => {
        img.classList.remove("active");
    });

    images[current].classList.add("active");

}, 4000);

AOS.init({
    duration: 1200,
    once: true,
    offset: 100
});



// Progress Bar Animation

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

    // --- 3D TESTIMONIAL SLIDER LOGIC (SYMMETRICAL) ---
    const cards3D = document.querySelectorAll('.card-3d');
    const btnPrev3D = document.getElementById('prev-3d');
    const btnNext3D = document.getElementById('next-3d');

    if (cards3D.length > 0 && btnPrev3D && btnNext3D) {
        let currentCardIndex = 0;

        function update3DCards() {
            cards3D.forEach((card, index) => {
                // Clear all previous state classes
                card.classList.remove('active', 'next', 'prev', 'hidden');

                // Calculate position relative to the currently active card
                let position = index - currentCardIndex;

                // Wrap around logic so it loops infinitely
                if (position < 0) {
                    position += cards3D.length;
                }

                // Apply correct class based on position for Left & Right balance
                if (position === 0) {
                    card.classList.add('active'); // Center Card
                } else if (position === 1) {
                    card.classList.add('next'); // Card on the Right
                } else if (position === cards3D.length - 1) {
                    card.classList.add('prev'); // Card on the Left
                } else {
                    card.classList.add('hidden'); // Remaining cards go to the back
                }
            });
        }

        // --- CLICK EVENT FOR INDIVIDUAL CARDS ---
        cards3D.forEach((card, index) => {
            card.addEventListener('click', () => {
                // If the clicked card is already active, do nothing
                if (currentCardIndex === index) return;

                // Change current index to the clicked card's index
                currentCardIndex = index;
                update3DCards();
            });
        });

        // NEXT Button Click
        btnNext3D.addEventListener('click', () => {
            currentCardIndex = (currentCardIndex + 1) % cards3D.length;
            update3DCards();
        });

        // PREV Button Click
        btnPrev3D.addEventListener('click', () => {
            currentCardIndex = (currentCardIndex - 1 + cards3D.length) % cards3D.length;
            update3DCards();
        });

        // Initialize Slider on page load
        update3DCards();
    }
});


document.addEventListener('DOMContentLoaded', () => {

    // --- LIVE CHAT INPUT LOGIC ---
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatStream = document.getElementById('chat-stream');

    if (chatInput && chatSendBtn && chatStream) {

        // Function to send and display message
        function sendMessage() {
            const messageText = chatInput.value.trim();

            if (messageText !== "") {
                // Create a new div for the user's message
                const newMsg = document.createElement('div');
                newMsg.className = 'chat-msg user-msg';
                newMsg.style.animationDelay = '0s'; // Show immediately

                // Message HTML structure
                newMsg.innerHTML = `
                    <div class="tutor-icon" style="background: #4C1D95; color: white;"><i class="fas fa-user"></i></div>
                    <div class="msg-content">
                        <h4>You <span>Just now</span></h4>
                        <p>${messageText}</p>
                    </div>
                `;

                // Insert the new message just before the floating emojis so emojis stay on top
                const emojis = chatStream.querySelector('.floating-emojis');
                if (emojis) {
                    chatStream.insertBefore(newMsg, emojis);
                } else {
                    chatStream.appendChild(newMsg);
                }

                // Clear the input box
                chatInput.value = '';

                // Smoothly auto-scroll to the bottom of the chat
                chatStream.scrollTo({
                    top: chatStream.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }

        // Trigger send on Button Click
        chatSendBtn.addEventListener('click', sendMessage);

        // Trigger send on pressing 'Enter' key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {

    // --- NEWSLETTER FORM VALIDATION LOGIC ---
    const newsForm = document.getElementById('newsletter-form');
    const newsEmail = document.getElementById('newsletter-email');
    const emailMsg = document.getElementById('email-msg');

    if (newsForm && newsEmail && emailMsg) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents page reload

            const emailValue = newsEmail.value.trim();
            // Basic regex to check email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailValue === "") {
                // Empty email
                emailMsg.textContent = "Please enter your email address.";
                emailMsg.style.color = "#ef4444"; // Red error color
                emailMsg.classList.add('show');
            } else if (!emailRegex.test(emailValue)) {
                // Invalid format
                emailMsg.textContent = "Invalid email format. Please check again.";
                emailMsg.style.color = "#ef4444"; // Red error color
                emailMsg.classList.add('show');
            } else {
                // Valid email: Hide error and clear input (No success message)
                emailMsg.classList.remove('show');
                newsEmail.value = "";
            }
        });
    }
});