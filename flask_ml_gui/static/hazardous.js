document.getElementById('startOverlay').addEventListener('click', function() {
    this.style.display = 'none'; // Hide the overlay
    const audio = document.getElementById('emergencyAlert');
    audio.play();
    displayMessages();
});

function displayMessages() {
    const messages = document.querySelectorAll('.message');
    let currentMessage = 0;

    function flickerMessage(message) {
        let count = 0;
        const totalFlickers = 6; // Since each flicker is on and off, we need 3 full cycles
        message.style.display = 'inline'; // Ensure the message is visible initially

        const flickerInterval = setInterval(() => {
            message.style.display = (message.style.display === 'inline') ? 'none' : 'inline';
            count++;
            if (count >= totalFlickers) {
                clearInterval(flickerInterval);
                message.style.display = 'none'; // Ensure message is hidden after flickering
                currentMessage++;
                if (currentMessage < messages.length) {
                    setTimeout(() => flickerMessage(messages[currentMessage]), 0); // Delay before next message
                } else {
                    endSequence();
                }
            }
        }, 1000); // Toggle display every 833 milliseconds
    }

    flickerMessage(messages[currentMessage]); // Start flickering the first message
}

function endSequence() {
    const container = document.getElementById('shakeContainer');
    container.classList.remove('hidden');
    container.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'index.html'; // Redirect after the fade out
    }, 3000); // Wait 3 seconds during fade out
}