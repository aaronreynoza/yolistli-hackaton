
document.addEventListener('DOMContentLoaded', function(event) {
    const introButton = document.querySelector('#intro-button');
    if(introButton) {
        introButton.addEventListener('click', function () {
            window.localStorage.clear();
            window.location.href = 'home.html';
        });
    }
});
