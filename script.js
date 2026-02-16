// ========================================
// MEMORIES GALLERY TOGGLE
// ========================================
function toggleMemories() {
    const memoriesSection = document.getElementById('memories');
    memoriesSection.classList.toggle('active');
    
    // Smooth scroll to memories section
    if (memoriesSection.classList.contains('active')) {
        setTimeout(() => {
            memoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// ========================================
// PLAYLIST OPENER
// ========================================
function openPlaylist() {
    // EDIT: Replace with your actual Spotify playlist URL
    const playlistURL = 'https://open.spotify.com/playlist/3o6LqygnwBuOQS7bmjEXuy?si=e1c19511f8fa41fe&pt=25ba06a16b22149d1e23fc83415e0259';
    window.open(playlistURL, '_blank');
}

// ========================================
// CATCH THE HEARTS GAME
// ========================================
let score = 0;
let timeLeft = 30;
let gameInterval;
let heartInterval;
let isGameActive = false;

function startGame() {
    // Reset game state
    score = 0;
    timeLeft = 30;
    isGameActive = true;
    
    // Update UI
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('gameOver').classList.remove('active');
    
    // Remove any existing hearts
    const existingHearts = document.querySelectorAll('.heart');
    existingHearts.forEach(heart => heart.remove());
    
    // Start timer countdown
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Spawn hearts every 800ms
    heartInterval = setInterval(spawnHeart, 800);
}

function spawnHeart() {
    if (!isGameActive) return;
    
    const gameContainer = document.getElementById('gameContainer');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    
    // Random position within game container (relative positioning)
    // Calculate available space accounting for heart size and padding
    const maxX = gameContainer.offsetWidth - 80;  // Account for heart width
    const maxY = gameContainer.offsetHeight - 120; // Account for heart height and info section
    
    heart.style.left = (Math.random() * maxX + 20) + 'px';  // Add padding from edges
    heart.style.top = (Math.random() * maxY + 100) + 'px';  // Position below game info
    
    // Click handler
    heart.onclick = function() {
        if (isGameActive) {
            score++;
            document.getElementById('score').textContent = score;
            heart.remove();
            
            // Create pop effect
            heart.style.transform = 'scale(1.5)';
            heart.style.opacity = '0';
        }
    };
    
    gameContainer.appendChild(heart);
    
    // Remove heart after 2 seconds if not clicked
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 2000);
}

function endGame() {
    isGameActive = false;
    clearInterval(gameInterval);
    clearInterval(heartInterval);
    
    // Remove all hearts
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => heart.remove());
    
    // Show game over screen
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').classList.add('active');
}

function resetGame() {
    document.getElementById('gameOver').classList.remove('active');
    document.getElementById('startBtn').style.display = 'inline-block';
}

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// FLIP CARD AND OPEN MODAL FUNCTIONALITY
// ========================================
function flipCard(card) {
    // Get the image and description from the card
    const imgSrc = card.querySelector('.card-front img').src;
    const description = card.querySelector('.card-description p').textContent;
    
    // Open modal with this information
    openPhotoModal(imgSrc, description);
}

function openPhotoModal(imageSrc, description) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    
    // Set modal content
    modalImage.src = imageSrc;
    modalDescription.textContent = description;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePhotoModal();
    }
});
