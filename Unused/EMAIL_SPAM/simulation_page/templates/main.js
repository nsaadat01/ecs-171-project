const oval = document.getElementById('oval');
const uncertaintySlider = document.getElementById('OrbitUncertainity');
const velocitySlider = document.getElementById('RelativeVelocity');
const eccentricitySlider = document.getElementById('Eccentricity');
const perihelionDistanceSlider = document.getElementById('PerihelionDistance');
const rangeValueUncertaintyDisplay = document.getElementById('rangeValueOrbitUncertainity');
const rangeValueVelocityDisplay = document.getElementById('rangeValueRelativeVelocity');
const rangeValuePerihelionDistanceDisplay = document.getElementById('rangeValuePerihelionDistance');

let angle = 0;
let baseRadius = 100; // Base radius of the circular path
let animationFrame;
let speed = parseFloat(velocitySlider.value); // Initial speed
let eccentricity = parseFloat(eccentricitySlider.value)

/*
function updateOrbitRangeValue(id, value) {
  document.getElementById(`rangeValue${id}`).innerText = value;
  cancelAnimationFrame(animationFrame);
  animateOval();
} */

function positionSlidersInCircle() {
  const slidersContainer = document.querySelector('.sliders');
  const sliders = document.querySelectorAll('.slidecontainer');
  
  // Calculate the center coordinates of the sliders container
  const centerX = slidersContainer.offsetWidth / 2;
  const centerY = slidersContainer.offsetHeight / 2;
  
  const radius = 350; // Radius of the circle, adjust as needed
  const angleStep = (2 * Math.PI) / sliders.length;

  sliders.forEach((slider, index) => {
      const angle = index * angleStep;
      // Calculate coordinates relative to the center of the sliders container
      const x = centerX + radius * Math.cos(angle) - slider.offsetWidth / 2;
      const y = centerY + radius * Math.sin(angle) - slider.offsetHeight / 2;
      slider.style.left = `${x}px`;
      slider.style.top = `${y}px`;
  });
}

document.addEventListener('DOMContentLoaded', positionSlidersInCircle);


function animateOval() {
/*  let uncertainty = parseFloat(slider.value);
  let a = radius; // Semi-major axis
  let b = radius * (1 - (uncertainty / 10)); // Semi-minor axis
  
  angle += speed / 100000;
  
  let x = a * Math.cos(angle);
  let y = b * Math.sin(angle);
  
  oval.style.transform = `translate(${x}px, ${y}px)`;

  animationFrame = requestAnimationFrame(animateOval); */
  let uncertainty = parseFloat(uncertaintySlider.value);
  let perihelionDistance = parseFloat(perihelionDistanceSlider.value);
  let a = baseRadius * perihelionDistance * 1.2; // Adjust the semi-major axis based on perihelion distance
  let b = a * (1 - (uncertainty / 10)); // Semi-minor axis
  angle += speed * 0.00001; // Adjust the speed factor to control the speed of movement
  
  let x = a * Math.cos(angle);
  let y = b * Math.sin(angle);
  
  oval.style.transform = `translate(${x}px, ${y}px)`;

  animationFrame = requestAnimationFrame(animateOval);
}

// Initialize the animation
document.addEventListener('DOMContentLoaded', (event) => {
  animateOval();
  speed = normalizeSpeed(parseFloat(velocitySlider.value));

});


function updateOvalAndValue(field, value) {
    updateOvalSize(value);
    updateRangeValue(field, value);
}

function updateOvalSize(eccentricity) {
    var oval = document.getElementById('oval');
    var diameter = 100; // Initial diameter

    // Adjust diameter based on eccentricity
    var width = diameter * (1 + (eccentricity * 20) / 100);
    var height = diameter * (1 - (eccentricity * 20) / 100);

    // Set new dimensions
    oval.style.width = width + 'px';
    oval.style.height = height + 'px';
}


function normalizeSpeed(value) {
  const minSpeed = 1207.815;
  const maxSpeed = 160681.488;
  return ((value + 10000) - minSpeed) / (maxSpeed - minSpeed) * 10000; // Normalize to range [0, 1]
}

function updateRangeValue(id, value) {
    console.log("Slider ID:", id);
    console.log("Slider Value:", value);
    document.getElementById('rangeValue' + id).innerText = value;
    if (id === 'RelativeVelocity') {
        speed = normalizeSpeed(parseFloat(value));
    }

    if(id === 'Eccentricity') {

    }
    cancelAnimationFrame(animationFrame);
    animateOval();
}
/*
function sendDataToFlask(data) {
  // Send data to Flask endpoint using AJAX
  fetch('/flaaaaaaaaaaaaaaaaaaask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle response from Flask
    console.log('Response from Flask:', data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function handleSubmit(event) {
  const sliderContainers = document.querySelectorAll('.slidecontainer');
  const data = {};
  sliderContainers.forEach(container => {
    const sliderId = container.id;
    const sliderValue = container.querySelector('input[type="range"]').value;
    data[sliderId] = sliderValue;
  });
  sendDataToFlask(data);
} 

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', handleSubmit); */

