document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'flex';

    loadUserPreferences();
    rotateGallery();
});

function loadUserPreferences() {
    if (localStorage.getItem('darkMode') === 'enabled') enableDarkMode();
    document.getElementById('language-select').value = localStorage.getItem('language') || 'en';
}

// Dropdown Toggle
function toggleDropdown() {
    document.getElementById('dropdown-content').classList.toggle('show');
}

// Dark Mode Toggle
function toggleDarkMode() {
    const darkModeEnabled = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
}

// Language Change
function changeLanguage() {
    const language = document.getElementById('language-select').value;
    localStorage.setItem('language', language);
}

// Close dropdown when clicking outside
window.addEventListener('click', (event) => {
    if (!event.target.closest('.settings-dropdown')) {
        document.getElementById('dropdown-content').classList.remove('show');
    }
});

// Gallery Scrolling with Immediate Looping
let currentIndex = 0;
const scrollDelay = 3000;

function rotateGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    const items = document.querySelectorAll('.gallery-item');
    const itemWidth = 270;
    const gap = 10;
    const totalItemWidth = itemWidth + gap;
    const imagesShownAtATime = Math.floor(window.innerWidth / totalItemWidth); // Set based on viewport width
    const totalImages = items.length;

    const visibleImagesWidth = imagesShownAtATime * totalItemWidth;
    galleryContainer.style.width = `${totalImages * totalItemWidth}px`;
    const translation = -(currentIndex * totalItemWidth) % visibleImagesWidth;
    galleryContainer.style.transform = `translateX(${translation}px)`;

    currentIndex = (currentIndex >= totalImages - 1) ? 0 : currentIndex + 1;

    setTimeout(rotateGallery, scrollDelay);
}


// Wait for all resources to finish loading before hiding the loading screen
window.onload = function() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
    const mainContent = document.getElementById('main-content');
    mainContent.style.display = 'flex';
  };

currentIndex = 1; // Start at index 1
rotateGallery(); // Call rotateGallery initially to start the gallery
