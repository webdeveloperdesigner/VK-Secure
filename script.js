// Target Launch Date: 1 month + 12 days (42 days), 8 hours, 21 minutes, 9 seconds from now
const targetDate = new Date().getTime() + (42 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000) + (21 * 60 * 1000) + (9 * 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

    // Update Navbar Flip Pill Timer
    const navTimer = document.getElementById("nav-timer");
    if (navTimer) {
        navTimer.innerText = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    }
}

// Run immediately and start interval
updateCountdown();
setInterval(updateCountdown, 1000);

// Auto-Flip Status Pill every 4 seconds (or on click)
const flipPill = document.getElementById('status-flip-pill');
if (flipPill) {
    setInterval(() => {
        flipPill.classList.toggle('flipped');
    }, 4000);
    
    flipPill.addEventListener('click', () => {
        flipPill.classList.toggle('flipped');
    });
}

// Interactive Form Handling (Hero Form)
document.getElementById('notify-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email-input');
    const successMsg = document.getElementById('form-success');
    
    if (emailInput.value) {
        successMsg.classList.remove('hidden');
        emailInput.value = '';
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 5000);
    }
});

// Interactive Form Handling (CTA Section Form)
const ctaForm = document.getElementById('cta-notify-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('cta-email-input');
        const successMsg = document.getElementById('cta-form-success');
        
        if (emailInput.value) {
            successMsg.classList.remove('hidden');
            emailInput.value = '';
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        }
    });
}
