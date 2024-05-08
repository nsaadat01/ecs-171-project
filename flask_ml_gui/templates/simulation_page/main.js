function updateOvalAndValue(field, value) {
    updateOvalSize(value);
    updateRangeValue(field, value);
}

function updateOvalSize(eccentricity) {
    var oval = document.getElementById('oval');
    var diameter = 200; // Initial diameter

    // Adjust diameter based on eccentricity
    var width = diameter * (1 + eccentricity / 100);
    var height = diameter * (1 - eccentricity / 100);

    // Set new dimensions
    oval.style.width = width + 'px';
    oval.style.height = height + 'px';
}



function updateRangeValue(id, value) {
    document.getElementById('rangeValue' + id).innerText = value;
}
