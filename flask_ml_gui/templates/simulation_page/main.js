function updateOvalAndValue(field, value) {
    updateOvalSize(value);
    updateRangeValue(field, value);
}

function updateOvalSize(eccentricity) {
    var oval = document.getElementById('oval');
    var diameter = 200; // Initial diameter

    // Adjust diameter based on eccentricity
    var width = diameter * (1 + (eccentricity * 20) / 100);
    var height = diameter * (1 - (eccentricity * 20) / 100);

    // Set new dimensions
    oval.style.width = width + 'px';
    oval.style.height = height + 'px';
}



function updateRangeValue(id, value) {
    console.log("Slider ID:", id);
    console.log("Slider Value:", value);
    document.getElementById('rangeValue' + id).innerText = value;
}
