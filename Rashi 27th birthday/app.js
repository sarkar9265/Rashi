/* ============================================
   RASHI'S 27th BIRTHDAY - APP LOGIC
   ============================================ */

// ============ MEDIA FILES ============
const MEDIA_FILES = {
    photos: [
        'Snapchat-91992653.jpg', 'Snapchat-102959891.jpg', 'Snapchat-103751821.jpg',
        'Snapchat-126178673.jpg', 'Snapchat-170358901.jpg', 'Snapchat-170727253.jpg',
        'Snapchat-217944699.jpg', 'Snapchat-236608835.jpg', 'Snapchat-238862291.jpg',
        'Snapchat-256044047.jpg', 'Snapchat-267325719.jpg', 'Snapchat-307501498.jpg',
        'Snapchat-315311743.jpg', 'Snapchat-331237824.jpg', 'Snapchat-388773102.jpg',
        'Snapchat-445537602.jpg', 'Snapchat-483110347.jpg', 'Snapchat-492176944.jpg',
        'Snapchat-584521906.jpg', 'Snapchat-633890485.jpg', 'Snapchat-661115966.jpg',
        'Snapchat-688707441.jpg', 'Snapchat-690816130.jpg', 'Snapchat-711678702.jpg',
        'Snapchat-753684278.jpg', 'Snapchat-816579131.jpg', 'Snapchat-828883226.jpg',
        'Snapchat-871918818.jpg', 'Snapchat-872065013.jpg', 'Snapchat-888126229.jpg',
        'Snapchat-1010480995.jpg', 'Snapchat-1041200414.jpg', 'Snapchat-1098429829.jpg',
        'Snapchat-1142488330.jpg', 'Snapchat-1152580296.jpg', 'Snapchat-1181150756.jpg',
        'Snapchat-1218820827.jpg', 'Snapchat-1224580350.jpg', 'Snapchat-1225150414.jpg',
        'Snapchat-1273005852.jpg', 'Snapchat-1351544433.jpg', 'Snapchat-1353886020.jpg',
        'Snapchat-1353947065.jpg', 'Snapchat-1409147975.jpg', 'Snapchat-1416171566.jpg',
        'Snapchat-1437525155.jpg', 'Snapchat-1440694176.jpg', 'Snapchat-1478678827.jpg',
        'Snapchat-1489924049.jpg', 'Snapchat-1563650634.jpg', 'Snapchat-1564691024.jpg',
        'Snapchat-1577648987.jpg', 'Snapchat-1588687194.jpg', 'Snapchat-1614600655.jpg',
        'Snapchat-1685878279.jpg', 'Snapchat-1688809913.jpg', 'Snapchat-1730569890.jpg',
        'Snapchat-1789973989.jpg', 'Snapchat-1889048950.jpg', 'Snapchat-1935927748.jpg',
        'Snapchat-1956691679.jpg', 'Snapchat-1974850800.jpg', 'Snapchat-2005438303.jpg',
        'Snapchat-2043952258.jpg', 'Snapchat-2051103694.jpg', 'Snapchat-2080003889.jpg',
        'Snapchat-2087134660.jpg', 'Snapchat-2095753832.jpg', 'Snapchat-2122209144.jpg',
        'Snapchat-2129473689.jpg'
    ]
};

// ============ BIRTHDAY MESSAGE ============
const BIRTHDAY_MESSAGE = `Tamatarrrr happy birthday mera lulu... 🍅💕

Ami tumake khub bhalobasi... 💗✨

Rashi, you have no idea how completely you've transformed my world 🌍💫 Since you walked into my life, everything has changed — like someone turned on all the lights in a room I didn't even know was dark 🌅✨

You've done so many miracles already — just by being YOU 🪄💝 Your smile has healed wounds I didn't know I was carrying. Your love has given me strength I never thought I had. Your presence has made every single day feel like a celebration 🎊💖

And you know what? So many more miracles are yet to come 🌠🔮 We've got a whole lifetime of magic ahead of us — new adventures, new memories, more laughter, more love, and more reasons to fall for you all over again 💑✨

You will always — ALWAYS — be the best thing that ever happened in my life 🏆💗 Nothing compares to you. No sunset, no song, no dream could ever be as beautiful as what we share 🌹💫

I promise you this — I will never, EVER make you feel lonely 🤝💕 Not for a single second. I'll be your person — in every storm, every silence, and every celebration. You'll always have me right beside you, holding your hand 🫶

I love you so much, my Tamatarrrr 🍅💘 More than words could ever say, more than all the stars in the sky ⭐💫 You are my everything, and today, on your 27th birthday, I just want you to know —

The world became a better place 27 years ago because of YOU 🎂🎉💝

Happy Birthday, my love! Here's to forever 🥂💕✨`;

// ============ STATE ============
let currentFilter = 'all';
let allMediaItems = [];
let filteredItems = [];
let carouselIndex = 0;
let carouselTimer = null;
let currentLightboxIndex = 0;
let candlesBlown = false;
let audioContext = null;
let micStream = null;

const CAROUSEL_INTERVAL = 4000; // 4 seconds auto-advance

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    initStarsCanvas();
    setupQuestionGate();
});

// ============ STARS CANVAS (Gate Screen) ============
function initStarsCanvas() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        const count = Math.floor((canvas.width * canvas.height) / 3000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                alpha: Math.random(),
                speed: Math.random() * 0.02 + 0.005,
                dir: Math.random() > 0.5 ? 1 : -1,
                // Mix of blue, pink, white tones
                color: ['126, 200, 227', '248, 164, 200', '196, 181, 224', '255, 215, 0'][Math.floor(Math.random() * 4)]
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.alpha += s.speed * s.dir;
            if (s.alpha >= 1) { s.dir = -1; s.alpha = 1; }
            if (s.alpha <= 0.1) { s.dir = 1; s.alpha = 0.1; }
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }

    resize();
    createStars();
    drawStars();
    window.addEventListener('resize', () => { resize(); createStars(); });
}

// ============ QUESTION GATE ============
function setupQuestionGate() {
    const input = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-answer');
    const hint = document.getElementById('hint-text');

    const checkAnswer = () => {
        const answer = input.value.trim().toLowerCase();
        if (answer === 'coral green') {
            hint.textContent = '💕 You know me so well!';
            hint.style.color = '#A8E6CF';
            hint.classList.remove('wrong');
            input.disabled = true;
            submitBtn.disabled = true;
            setTimeout(transitionToMain, 1200);
        } else if (answer === '') {
            hint.textContent = 'Come on, type something! 💭';
            hint.classList.add('wrong');
            setTimeout(() => hint.classList.remove('wrong'), 500);
        } else {
            hint.textContent = 'Nope! Try again, you should know this! 💔';
            hint.classList.add('wrong');
            input.value = '';
            input.focus();
            setTimeout(() => hint.classList.remove('wrong'), 500);
        }
    };

    submitBtn.addEventListener('click', checkAnswer);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
}

// ============ TRANSITION TO MAIN ============
function transitionToMain() {
    const gate = document.getElementById('question-gate');
    const main = document.getElementById('birthday-main');

    // Create transition overlay with heart burst
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    const heartsBurst = document.createElement('div');
    heartsBurst.className = 'hearts-burst';

    // Create burst hearts
    const heartChars = ['♥', '💕', '✨', '💖', '🌟', '💗', '🎉', '💝'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'burst-heart';
        heart.textContent = heartChars[i % heartChars.length];
        const angle = (i / 20) * 360;
        const distance = 80 + Math.random() * 120;
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;
        heart.style.animation = `burstOut 1.2s ease-out ${i * 0.05}s forwards`;
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        // Override the animation with inline keyframes via transform
        heart.style.cssText += `
            animation: none;
            opacity: 1;
            font-size: ${1 + Math.random() * 1.5}rem;
        `;
        // Use JS animation
        heartsBurst.appendChild(heart);

        // Animate manually
        setTimeout(() => {
            heart.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.5)`;
            heart.style.opacity = '0';
        }, 50 + i * 40);
    }

    overlay.appendChild(heartsBurst);
    document.body.appendChild(overlay);

    setTimeout(() => {
        gate.classList.remove('active');
        gate.style.display = 'none';
        main.classList.remove('hidden');

        // Initialize everything
        initHero();
        initCarousel();
        initMessage();
        initCandle();
        initScrollAnimations();
        tryAutoPlayMusic();

        // Fade out overlay
        overlay.style.transition = 'opacity 0.8s ease';
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 800);
    }, 1200);
}

// ============ HERO SECTION ============
function initHero() {
    createPetals();
    initConfetti();
}

function createPetals() {
    const container = document.getElementById('hero-petals');
    const petalColors = ['#7EC8E3', '#B8E2F2', '#F8A4C8', '#FDCFE1', '#C4B5E0', '#A8E6CF'];

    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (5 + Math.random() * 8) + 's';
        petal.style.animationDelay = Math.random() * 6 + 's';
        petal.style.width = (10 + Math.random() * 15) + 'px';
        petal.style.height = petal.style.width;
        petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.opacity = 0.2 + Math.random() * 0.3;
        container.appendChild(petal);
    }
}

function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let confettiPieces = [];
    let running = true;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    const colors = ['#7EC8E3', '#F8A4C8', '#C4B5E0', '#A8E6CF', '#FFD700', '#FDCFE1', '#B8E2F2'];

    function createPiece() {
        return {
            x: Math.random() * canvas.width,
            y: -20,
            w: 6 + Math.random() * 6,
            h: 4 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 2,
            vy: 1 + Math.random() * 3,
            opacity: 0.7 + Math.random() * 0.3
        };
    }

    // Burst at start
    for (let i = 0; i < 80; i++) {
        const p = createPiece();
        p.y = Math.random() * canvas.height * 0.5;
        confettiPieces.push(p);
    }

    function animate() {
        if (!running) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Slowly add new pieces
        if (confettiPieces.length < 40 && Math.random() > 0.92) {
            confettiPieces.push(createPiece());
        }

        confettiPieces.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();

            if (p.y > canvas.height + 20) {
                confettiPieces[i] = createPiece();
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Stop heavy confetti after a while to save battery
    setTimeout(() => {
        confettiPieces = confettiPieces.slice(0, 15);
    }, 8000);
}

// ============ MULTI-CARD CAROUSEL & BACKGROUND ============
let bgItems = [];

function initCarousel() {
    // Convert to item format
    const photos = MEDIA_FILES.photos.map(f => ({ file: f, type: 'photo' }));
    allMediaItems = shuffleArray(photos);
    filteredItems = [...allMediaItems];
    carouselIndex = 0;

    renderCarousel();
    setupCarouselControls();
    startCarouselAutoPlay();
    initGalleryBackground();
}

function initGalleryBackground() {
    const bgContainer = document.getElementById('global-background');
    if (!bgContainer) return;
    
    // We will maintain 4 floating background items
    const MAX_BG_ITEMS = 4;
    
    for (let i = 0; i < MAX_BG_ITEMS; i++) {
        setTimeout(() => spawnBgItem(bgContainer), i * 2000);
    }
}

function spawnBgItem(container) {
    if (filteredItems.length === 0) return;
    
    // Pick a random media item
    const item = filteredItems[Math.floor(Math.random() * filteredItems.length)];
    
    let el = document.createElement('img');
    el.src = `media/${item.file}`;
    
    el.className = 'global-bg-item';
    
    // Randomize position and rotation
    const left = 10 + Math.random() * 60; // 10% to 70%
    const top = 10 + Math.random() * 60; // 10% to 70%
    const rot = (Math.random() - 0.5) * 30; // -15deg to 15deg
    
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.setProperty('--rot', `${rot}deg`);
    
    container.appendChild(el);
    
    // Trigger fade in
    setTimeout(() => el.classList.add('show'), 50);
    
    // Remove after some time and spawn a new one
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
            spawnBgItem(container);
        }, 4000); // Wait for fade out
    }, 6000 + Math.random() * 4000); // Show for 6-10s
}

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getVisibleCards() {
    const w = window.innerWidth;
    if (w <= 400) return 1;
    if (w <= 768) return 2;
    return 3;
}

function renderCarousel() {
    const track = document.getElementById('carousel-track');
    const counter = document.getElementById('carousel-counter');
    track.innerHTML = '';

    filteredItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.dataset.index = index;

        const img = document.createElement('img');
        img.src = `media/${item.file}`;
        img.alt = 'Memory with Rashi';
        img.loading = index < 6 ? 'eager' : 'lazy';
        card.appendChild(img);

        // Click opens lightbox
        card.addEventListener('click', () => openLightbox(index));
        track.appendChild(card);
    });

    updateCarouselPosition();
}

function updateCarouselPosition() {
    const track = document.getElementById('carousel-track');
    const cards = track.querySelectorAll('.carousel-card');
    const counter = document.getElementById('carousel-counter');
    const visibleCards = getVisibleCards();

    if (cards.length === 0) return;

    // Calculate card width + gap
    const card = cards[0];
    const gap = 14;
    const cardWidth = card.offsetWidth + gap;

    // Clamp index
    const maxIndex = Math.max(0, filteredItems.length - visibleCards);
    carouselIndex = Math.min(carouselIndex, maxIndex);
    carouselIndex = Math.max(0, carouselIndex);

    // Shift track
    const offset = carouselIndex * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;

    // Highlight center card
    const centerIndex = carouselIndex + Math.floor(visibleCards / 2);
    cards.forEach((c, i) => {
        c.classList.toggle('center', i === centerIndex);
    });

    // Update counter
    counter.textContent = `${carouselIndex + 1} – ${Math.min(carouselIndex + visibleCards, filteredItems.length)} / ${filteredItems.length}`;

    // Restart progress bar animation
    const viewport = document.getElementById('carousel-viewport');
    viewport.style.animation = 'none';
    void viewport.offsetWidth;
    viewport.style.animation = '';
}

function nextSlide() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, filteredItems.length - visibleCards);
    carouselIndex = carouselIndex >= maxIndex ? 0 : carouselIndex + 1;
    updateCarouselPosition();
}

function prevSlide() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, filteredItems.length - visibleCards);
    carouselIndex = carouselIndex <= 0 ? maxIndex : carouselIndex - 1;
    updateCarouselPosition();
}

function setupCarouselControls() {
    document.getElementById('carousel-prev').addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    document.getElementById('carousel-next').addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // Swipe support
    const viewport = document.getElementById('carousel-viewport');
    let touchStartX = 0;

    viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoPlay();
        }
    }, { passive: true });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('hidden')) return;
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
    });

    // Re-calc on resize
    window.addEventListener('resize', () => {
        updateCarouselPosition();
    });
}

function startCarouselAutoPlay() {
    if (carouselTimer) clearInterval(carouselTimer);
    carouselTimer = setInterval(nextSlide, CAROUSEL_INTERVAL);
}

function resetAutoPlay() {
    clearInterval(carouselTimer);
    startCarouselAutoPlay();
}



// ============ LIGHTBOX ============
function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderLightboxContent(index);
    // Pause carousel
    clearInterval(carouselTimer);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
    // Pause any playing video
    const video = lightbox.querySelector('video');
    if (video) video.pause();
    // Resume carousel
    startCarouselAutoPlay();
}

function renderLightboxContent(index) {
    const content = document.getElementById('lightbox-content');
    const counter = document.getElementById('lightbox-counter');
    const item = filteredItems[index];

    // Pause previous video if any
    const prevVideo = content.querySelector('video');
    if (prevVideo) prevVideo.pause();

    content.innerHTML = '';

    const img = document.createElement('img');
    img.src = `media/${item.file}`;
    img.alt = 'Memory';
    content.appendChild(img);

    counter.textContent = `${index + 1} / ${filteredItems.length}`;
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    renderLightboxContent(currentLightboxIndex);
});
document.getElementById('lightbox-next').addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
    renderLightboxContent(currentLightboxIndex);
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
        currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
        renderLightboxContent(currentLightboxIndex);
    }
    if (e.key === 'ArrowRight') {
        currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
        renderLightboxContent(currentLightboxIndex);
    }
});

// Swipe support for lightbox
let lbTouchStartX = 0;
let lbTouchEndX = 0;
document.getElementById('lightbox-content').addEventListener('touchstart', (e) => {
    lbTouchStartX = e.changedTouches[0].screenX;
}, { passive: true });
document.getElementById('lightbox-content').addEventListener('touchend', (e) => {
    lbTouchEndX = e.changedTouches[0].screenX;
    const diff = lbTouchStartX - lbTouchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // Swipe left - next
            currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
        } else {
            // Swipe right - prev
            currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
        }
        renderLightboxContent(currentLightboxIndex);
    }
}, { passive: true });

// ============ BIRTHDAY MESSAGE ============
function initMessage() {
    const messageEl = document.getElementById('message-text');
    messageEl.innerHTML = formatMessage(BIRTHDAY_MESSAGE);
}

function formatMessage(text) {
    // Wrap Bengali text
    let formatted = text.replace(
        /Ami tumake khub bhalobasi\.\.\./g,
        '<span class="bengali">Ami tumake khub bhalobasi...</span>'
    );
    // Highlight key phrases
    const highlights = [
        'best thing that ever happened in my life',
        'never, EVER make you feel lonely',
        'I love you so much',
        'whole lifetime of magic',
        'You are my everything'
    ];
    highlights.forEach(phrase => {
        formatted = formatted.replace(phrase, `<span class="highlight">${phrase}</span>`);
    });
    return formatted;
}

// ============ CANDLE BLOWING ============
function initCandle() {
    const micBtn = document.getElementById('enable-mic-btn');

    micBtn.addEventListener('click', async () => {
        try {
            await enableMicrophone();
            micBtn.textContent = '🎤 Listening... Blow now!';
            micBtn.style.background = 'rgba(126, 200, 227, 0.3)';
            micBtn.style.borderColor = 'var(--sky)';
        } catch (err) {
            micBtn.textContent = '📱 Shake your phone instead!';
            micBtn.style.borderColor = 'var(--gold)';
            // Fallback to device motion
            enableGyroscope();
        }
    });

    // Also enable gyroscope as a parallel option
    enableGyroscope();
}

async function enableMicrophone() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStream = stream;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let blowDuration = 0;
    const BLOW_THRESHOLD = 140; // Volume threshold for blow detection
    const BLOW_DURATION_NEEDED = 15; // Frames of sustained blow needed

    function detectBlow() {
        if (candlesBlown) return;

        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;

        if (average > BLOW_THRESHOLD) {
            blowDuration++;
            // Make flames flicker more as user blows
            flickerFlames(Math.min(blowDuration / BLOW_DURATION_NEEDED, 1));

            if (blowDuration >= BLOW_DURATION_NEEDED) {
                blowOutCandles();
                return;
            }
        } else {
            blowDuration = Math.max(0, blowDuration - 2);
            if (blowDuration === 0) {
                resetFlameFlicker();
            }
        }

        requestAnimationFrame(detectBlow);
    }

    detectBlow();
}

function enableGyroscope() {
    let shakeCount = 0;
    let lastAccel = { x: 0, y: 0, z: 0 };
    const SHAKE_THRESHOLD = 20;

    function handleMotion(e) {
        if (candlesBlown) return;

        const accel = e.accelerationIncludingGravity || e.acceleration;
        if (!accel) return;

        const deltaX = Math.abs(accel.x - lastAccel.x);
        const deltaY = Math.abs(accel.y - lastAccel.y);
        const deltaZ = Math.abs(accel.z - lastAccel.z);

        lastAccel = { x: accel.x || 0, y: accel.y || 0, z: accel.z || 0 };

        if (deltaX + deltaY + deltaZ > SHAKE_THRESHOLD) {
            shakeCount++;
            flickerFlames(Math.min(shakeCount / 8, 1));

            if (shakeCount > 8) {
                blowOutCandles();
                window.removeEventListener('devicemotion', handleMotion);
            }
        }
    }

    // Request permission on iOS 13+
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        document.getElementById('enable-mic-btn').addEventListener('click', () => {
            DeviceMotionEvent.requestPermission().then(response => {
                if (response === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                }
            });
        }, { once: true });
    } else if (typeof DeviceMotionEvent !== 'undefined') {
        window.addEventListener('devicemotion', handleMotion);
    }
}

function flickerFlames(intensity) {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        const scale = 1 - intensity * 0.5;
        const translateX = (Math.random() - 0.5) * intensity * 20;
        flame.style.transform = `scaleY(${scale}) translateX(${translateX}px)`;
        flame.style.opacity = 1 - intensity * 0.4;
    });
}

function resetFlameFlicker() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.transform = '';
        flame.style.opacity = '';
    });
}

function blowOutCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    const flames = document.querySelectorAll('.flame');
    const smokes = document.querySelectorAll('.smoke');

    flames.forEach((flame, i) => {
        setTimeout(() => {
            flame.classList.add('blown-out');
        }, i * 200);
    });

    smokes.forEach((smoke, i) => {
        setTimeout(() => {
            smoke.classList.add('active');
        }, i * 200 + 400);
    });

    // Show success message
    setTimeout(() => {
        document.getElementById('blow-status').classList.add('hidden');
        document.getElementById('candle-blown-msg').classList.remove('hidden');

        // Burst confetti celebration
        celebrateCandle();
    }, 1000);

    // Clean up mic
    if (micStream) {
        micStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
        audioContext.close();
    }
}

function celebrateCandle() {
    const section = document.getElementById('candle-section');
    const emojis = ['🎉', '🎊', '✨', '💫', '🌟', '⭐', '💖', '🎂'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('span');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: absolute;
                font-size: ${1 + Math.random() * 2}rem;
                left: ${Math.random() * 100}%;
                top: ${30 + Math.random() * 40}%;
                pointer-events: none;
                z-index: 20;
                animation: petalFall ${3 + Math.random() * 4}s ease-out forwards;
                opacity: 0.8;
            `;
            section.appendChild(emoji);
            setTimeout(() => emoji.remove(), 7000);
        }, i * 80);
    }
}

// ============ BACKGROUND MUSIC ============
function tryAutoPlayMusic() {
    const audio = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    let isPlaying = false;

    const playMusic = () => {
        audio.volume = 0.4;
        audio.play().then(() => {
            isPlaying = true;
            toggleBtn.classList.remove('is-muted');
        }).catch(() => {
            // Auto-play blocked, user needs to click
            toggleBtn.classList.add('is-muted');
        });
    };

    // Try to play immediately
    playMusic();

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            toggleBtn.classList.add('is-muted');
        } else {
            audio.play().then(() => {
                isPlaying = true;
                toggleBtn.classList.remove('is-muted');
            });
        }
    });

    // Also try play on first user interaction
    document.addEventListener('click', () => {
        if (!isPlaying && audio.paused) {
            playMusic();
        }
    }, { once: true });
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.section-heading, .message-card, .memories-carousel, .candle-wrapper');

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
}
