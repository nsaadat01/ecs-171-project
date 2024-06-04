document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('observatory-music');
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log("Audio started playing automatically.");
        }).catch(_ => {
            console.log("Auto-play was prevented. Consider triggering playback with a user gesture.");
        });
    }

    setTimeout(() => {
        const finalContainer = document.querySelector('.final-container');
        const congratulations = document.getElementById('congratulations');
        const youreSafe = document.getElementById('safe');
        const pause = document.getElementById('pause');
        const fornow = document.getElementById('fornow');

        // Initially, display the final container
        finalContainer.style.display = 'flex';

        // Show congratulations
        setTimeout(() => {
            congratulations.classList.replace('hide', 'show');

            // Hide congratulations and show you're safe after a delay
            setTimeout(() => {
                congratulations.classList.replace('show', 'hide');
                
                // Pause with a black screen
                finalContainer.style.backgroundColor = 'black';
                setTimeout(() => {
                    finalContainer.style.backgroundColor = '';

                    youreSafe.classList.replace('hide', 'show');

                    // Hide you're safe and show pause after a delay
                    setTimeout(() => {
                        youreSafe.classList.replace('show', 'hide');
                        
                        // Pause with a black screen
                        finalContainer.style.backgroundColor = 'black';
                        setTimeout(() => {
                            finalContainer.style.backgroundColor = '';

                            pause.classList.replace('hide', 'show');

                            // Hide pause and show for now after a delay
                            setTimeout(() => {
                                pause.classList.replace('show', 'hide');
                                
                                // Pause with a black screen
                                finalContainer.style.backgroundColor = 'black';
                                setTimeout(() => {
                                    finalContainer.style.backgroundColor = '';

                                    fornow.classList.replace('hide', 'show');

                                    // Hide for now after a delay
                                    setTimeout(() => {
                                        fornow.classList.replace('show', 'hide');

                                        // Pause with a black screen
                                        finalContainer.style.backgroundColor = 'black';
                                        
                                        // show the <press any button to continue> screen
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
                                        }, 3000);  // Wait longer before hiding the third container

                                    }, 8000); // For now displayed for 5 seconds

                                }, 3000); // Pause between messages for 2 second

                            }, 3000); // Display ""..."" for 3 seconds

                        }, 3000); // Pause (display black screen) between "you're safe" and "..."

                    }, 3000); // Display "you're safe" for 3 seconds

                }, 2000); // Pause (display black screen) between "Congratulations" and "you're safe"

            }, 3000); // Congratulations displayed for 3 seconds

        }, 2000); // Initial delay of 0.5 seconds before showing congratulations

    }, 0); // Initial delay of 0 second before showing final-container

});
