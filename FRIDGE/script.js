let displayOn = true;

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

    function showContent(type) {
        const content = document.getElementById("content");

        switch (type) {
            case 'temperature':
                content.innerHTML = `<h2>Fridge Temperature: 5°C</h2>`;
                content.style.display = "flex";
                content.style.justifyContent = "center";
                content.style.alignItems = "center";
                break;
            case 'shelf':
                content.innerHTML = `<img src="https://as1.ftcdn.net/v2/jpg/04/23/38/62/1000_F_423386207_qJUAhufBuplmQ04Hl2VreMQiNMecqXqX.jpg" alt="Shelf View">`;
                content.style.display = "flex";
                break;
            case 'tv':
                content.innerHTML = `<img src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=" alt="TV View">`;
                content.style.display = "flex";
                break;
            case 'browser':
                content.innerHTML = `<iframe src="https://duckduckgo.com" title="Embedded Browser"></iframe>`;
                content.style.display = "block";
                break;
            case 'settings':
                content.innerHTML = `<h2 style="text-align:center;">Settings Menu</h2>`;
                content.style.display = "flex";
                break;
        }
    }

    function updateClock() {
        const clock = document.getElementById("clock");
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }

    setInterval(updateClock, 1);