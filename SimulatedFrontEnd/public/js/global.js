// 
$('#logoutButton').on('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    window.location.replace('/home.html');
});

// Session Timeout
var timer = document.getElementById("timer");
var duration = 250;

setInterval(updateTimer, 1000);

function updateTimer() {
    duration--;
    if (duration < 1) {
        localStorage.clear();
        window.location.replace('/home.html');
    } else {
        timer.innerText = duration;
    }
}

window.addEventListener("mousemove",resetTimer);

function resetTimer() {
    duration = 250;
}
