
document.addEventListener('DOMContentLoaded', function(event) {
    var introButton = document.querySelector('#intro-button');
    if(introButton) {
        introButton.addEventListener('click', function () {
            window.location.href = 'home.html';
        });
    }
});
