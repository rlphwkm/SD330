let displayOn = true;
let timeFormat24 = true;
let currentTemperature = Math.floor(Math.random() * 10) + 32;
let tempInCelsius = false;
let minuteTimer;
let timerAlarm = new Audio('./FRIDGE/alarm.wav'); // Alarm sound file
let tvAudio = new Audio('./FRIDGE/generic-news-music.wav'); // News music file for TV view
let musicPlayer = new Audio('./FRIDGE/background-music.wav'); // Separate song file for music player

// Toggle fridge display
function toggleDisplay() {
    const onOffBtn = document.getElementById("onOffBtn");
    const content = document.getElementById("content");
    const navButtons = document.getElementsByClassName("navButton");

    if (displayOn) {
        onOffBtn.textContent = "ON";
        content.innerHTML = '';
        for (let btn of navButtons) {
            btn.classList.add("disabled");
        }
    } else {
        onOffBtn.textContent = "OFF";
        for (let btn of navButtons) {
            btn.classList.remove("disabled");
        }
    }
    displayOn = !displayOn;
}

// Clock with 12/24-hour toggle
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const options = timeFormat24 ? { hour12: false } : { hour12: true };
    clock.textContent = now.toLocaleTimeString([], options);
}

// Toggle time format on clock click
document.addEventListener("DOMContentLoaded", () => {
    const clock = document.getElementById("clock");
    clock.addEventListener("click", toggleTimeFormat);
});

function toggleTimeFormat() {
    timeFormat24 = !timeFormat24;
    updateClock();
}

setInterval(updateClock, 1000);

// Show content based on button clicked
function showContent(type) {
    const content = document.getElementById("content");

    // Stop any currently playing sounds before switching content
    tvAudio.pause();
    musicPlayer.pause();

    switch (type) {
        case 'temperature':
            content.innerHTML = `<h2>Current Temperature: ${currentTemperature}°${tempInCelsius ? 'C' : 'F'}</h2>
                                 <button onclick="toggleTemperature()">°F/°C</button>
                                 <button onclick="increaseTemperature()">+</button>
                                 <button onclick="decreaseTemperature()">-</button>`;
            break;
        case 'shelf':
            content.innerHTML = `<img src="https://as1.ftcdn.net/v2/jpg/04/23/38/62/1000_F_423386207_qJUAhufBuplmQ04Hl2VreMQiNMecqXqX.jpg" alt="Shelf View">`;
            break;
        case 'tv':
            content.innerHTML = `<img src="https://www.shutterstock.com/shutterstock/videos/1106459161/thumb/11.jpg?" alt="TV View">`;
            tvAudio.loop = true;   // Set TV audio to loop in the background
            tvAudio.play();        // Play news music when TV view is displayed
            break;
        case 'browser':
            content.innerHTML = `<iframe src="https://google.com" title="Embedded Browser"></iframe>`;
            break;
        case 'settings':
            content.innerHTML = `<h2 style="text-align:center;">Settings Menu</h2>`;
            break;
        case 'music':
            content.innerHTML = `<button onclick="playMusic()">Play</button>
                                 <button onclick="pauseMusic()">Pause</button>`;
            break;
        case 'timer':
            content.innerHTML = `<h2>Minute Timer</h2>
                                 <button onclick="startMinuteTimer()">Start 1-Minute Timer</button>
                                 <p id="timerDisplay">00:00</p>`;
            break;
        case 'shoppingList':
            content.innerHTML = `<h2>Shopping List</h2>
                                 <ul id="list">
                                     <li>Milk</li>
                                     <li>Eggs</li>
                                     <li>Butter</li>
                                     <li>Cheese</li>
                                     <li>Yogurt</li>
                                 </ul>
                                 <input type="text" id="itemInput" placeholder="Add item">
                                 <button onclick="addItem()">Add</button>`;
            break;
    }
}

// Toggle °F/°C
function toggleTemperature() {
    if (tempInCelsius) {
        currentTemperature = Math.round(currentTemperature * 9 / 5 + 32);
    } else {
        currentTemperature = Math.round((currentTemperature - 32) * 5 / 9);
    }
    tempInCelsius = !tempInCelsius;
    showContent('temperature');
}

function increaseTemperature() {
    currentTemperature++;
    showContent('temperature');
}

function decreaseTemperature() {
    currentTemperature--;
    showContent('temperature');
}

// Minute timer with sound alarm
function startMinuteTimer() {
    let timeLeft = 60; // Start from 60 seconds
    const timerDisplay = document.getElementById("timerDisplay");
    
    // Update the timer every second
    minuteTimer = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        // Format timer display
        timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(minuteTimer);
            timerAlarm.play(); // Play alarm when timer hits 0
        }
    }, 1000);
}

// Music player controls
function playMusic() {
    tvAudio.pause();  // Ensure the TV audio is paused when playing separate music
    musicPlayer.play();
}

function pauseMusic() {
    musicPlayer.pause();
}

// Shopping list
function addItem() {
    const itemInput = document.getElementById("itemInput");
    const list = document.getElementById("list");
    if (itemInput.value) {
        const li = document.createElement("li");
        li.textContent = itemInput.value;
        list.appendChild(li);
        itemInput.value = "";
    }
}
