// Carousel functionality
const carousel = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function showSlide(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
}

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

// Form submission and message logging
const form = document.getElementById('reachOutForm');
const messageLog = document.getElementById('messageLog');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Thank you for reaching out! We will get back to you soon.');
            form.reset();
            loadMessages();
        } else {
            throw new Error('Failed to submit message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

async function loadMessages() {
    try {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        messageLog.innerHTML = messages.map(msg => 
            `[${new Date(msg.timestamp).toLocaleString()}] Name: ${msg.name}, Email: ${msg.email}, Message: ${msg.message}`
        ).join('<br><br>');
    } catch (error) {
        console.error('Error:', error);
        messageLog.textContent = 'Failed to load messages.';
    }
}

// Load messages on page load
loadMessages();