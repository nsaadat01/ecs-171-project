document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('alert-sound');
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log("Audio started playing automatically.");
        }).catch(error => {
            console.log("Auto-play was prevented. Consider triggering playback with a user gesture.");
        });
    }

    setTimeout(() => {
        const alertContainer = document.querySelector('.alert-container');
        alertContainer.style.display = 'none';
        setTimeout(() => {
            const finalContainer = document.querySelector('.final-container');
            const firstline = document.getElementById('firstline').children;
            const secondline = document.getElementById('secondline').children;

            finalContainer.style.display = 'flex';

            let delay = 0;
            for (let i = 0; i < firstline.length; i++) {
                setTimeout(() => {
                    firstline[i].style.display = 'block';
                }, delay);
                delay += 500;
            }

            setTimeout(() => {
                for (let i = 0; i < secondline.length; i++) {
                    setTimeout(() => {
                        secondline[i].style.display = 'block';
                    }, delay);
                    delay += 500;
                }
            }, 500 * firstline.length);  // Ensure we start after the last of the first line

            setTimeout(() => {
                const thirdContainer = document.getElementById('third-container');
                finalContainer.style.display = 'none';
                thirdContainer.style.display = 'block';

                let blinkInterval = setInterval(() => {
                    thirdContainer.style.opacity = (thirdContainer.style.opacity == 0 ? 1 : 0);
                }, 1000);

                // Listen for any key press or click to navigate to index.html
                document.addEventListener('keydown', navigateHome);
                document.addEventListener('click', navigateHome);

                function navigateHome() {
                    clearInterval(blinkInterval);
                    window.location.href = 'index.html';
                    document.removeEventListener('keydown', navigateHome);
                    document.removeEventListener('click', navigateHome);
                }
            }, delay + 8000);  // Wait longer before hiding the final container
        }, 2000); // delay between displaying stuff
    }, 30500);  // Alert container displayed for 30 seconds
});
