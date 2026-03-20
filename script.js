// 1. Initialize Animations (AOS)
AOS.init({ duration: 1200, once: true });

// 2. Global Variables for Music
const music = document.getElementById('bg-music');
const mIcon = document.getElementById('m-icon');
let isPlaying = false;

// 3. Toggle Music Function (This is what was missing)
function toggleMusic() {
    if (isPlaying) {
        music.pause();
        mIcon.innerText = "🔇";
        isPlaying = false;
    } else {
        music.play();
        mIcon.innerText = "🎵";
        isPlaying = true;
    }
}

// 4. Entrance Logic
document.getElementById('enter-btn').addEventListener('click', () => {
    const overlay = document.getElementById('entrance-overlay');
    
    // Hide overlay
    overlay.classList.add('hidden');
    setTimeout(() => {
        overlay.style.display = 'none';
        navbar.style.display = 'block'; 
    }, 2000);

    // Play Music and Update State
    music.play().then(() => {
        isPlaying = true;
        mIcon.innerText = "🎵";
    }).catch(e => console.log("Audio blocked by browser. User must interact first."));
});

function createFireflies() {
    const container = document.getElementById('fireflies');
    const fireflyCount = 40; // Increase count for more magic

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        // Randomize size for depth (some look far, some look close)
        const size = Math.random() * 4 + 2 + 'px';
        firefly.style.width = size;
        firefly.style.height = size;

        // Random starting position
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = (Math.random() * 100 + 100) + 'vh'; // Start below view

        // Randomize speed and delay
        firefly.style.animation = `drift ${Math.random() * 15 + 10}s linear infinite`;
        firefly.style.animationDelay = Math.random() * 10 + 's';
        
        container.appendChild(firefly);
    }
}

// 6. Countdown Logic
// const weddingDate = new Date("May 2, 2026 13:30:00").getTime();
const weddingDate = new Date("May 2, 2026 14:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minsEl = document.getElementById("mins");
    const secsEl = document.getElementById("secs");

    if(daysEl) daysEl.innerText = d < 10 ? '0' + d : d;
    if(hoursEl) hoursEl.innerText = h < 10 ? '0' + h : h;
    if(minsEl) minsEl.innerText = m < 10 ? '0' + m : m;
    if(secsEl) secsEl.innerText = s < 10 ? '0' + s : s;
}

// Initialize
window.onload = () => {
    createFireflies();
    setInterval(updateCountdown, 1000);
    updateCountdown();
};

// 7. RSVP Success Handling
document.getElementById('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('rsvpSuccess').style.display = 'block';
    }, 500);
});



// Add this to the end of your script.js
const showMoreBtn = document.getElementById('show-more-btn');
const hiddenItems = document.querySelectorAll('.hidden-item');

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
        hiddenItems.forEach((item, index) => {
            // 1. Show the element in the DOM
            item.style.display = 'block';
            
            // 2. Trigger the animation slightly after so it fades in
            setTimeout(() => {
                item.classList.add('reveal');
            }, index * 100); 
        });

        // 3. Remove the button
        this.style.display = 'none';

        // 4. Refresh AOS for the new images
        setTimeout(() => {
            AOS.refresh();
        }, 600);
    });
}

// --- NEW: HAMBURGER & NAV LOGIC ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-item');

// Toggle Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

function handleScroll() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return; // Safety check

    // Check if user has scrolled down more than 300 pixels
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', handleScroll);

// Also run it on load in case the user refreshed the page while scrolled down
window.addEventListener('load', handleScroll);