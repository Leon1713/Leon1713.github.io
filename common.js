
let carData;

if (localStorage.getItem("carData")) {
    carData = JSON.parse(localStorage.getItem("carData"));
}
else {
    loadCars().then(() => {
        localStorage.setItem("carData", JSON.stringify(carData));
    });
}

async function loadCars() {

    if (localStorage.getItem("carData"))
        return;

    try {
        const response = await fetch('A2_CarData.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Car data loaded:', data);

        // Example: access specific car
        carData = data;

    } catch (error) {
        console.error('Failed to fetch car data:', error);
    }
}

function getUser() {
    if (sessionStorage.getItem("admin")) {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.remove("hide");
            i.href = "A2_Rental_Dashboard.html";
        }
    }
    else if (sessionStorage.getItem("user")) {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.remove("hide");
            i.href = "user_dashboard.html";
        }
    }
    else {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.add("hide");
        }
    }
}
getUser();
function isLogin() {
    if (sessionStorage.getItem("admin") || sessionStorage.getItem("user")) {
        for (var i of document.getElementsByClassName("login-message")) {
            i.innerText = "Welcome, " + (sessionStorage.getItem("admin") ? sessionStorage.getItem("admin") : sessionStorage.getItem("user").substring(0, sessionStorage.getItem("user").indexOf("@")));
            for (let element of document.getElementsByClassName("is-login")) {
                element.classList.remove("hide");
            }
            for (let element of document.getElementsByClassName("login")) {
                element.classList.add("hide");
            }
        }
    }
}
    isLogin();
    function setLogin() {
        const loginDialogue = document.getElementById("login-overlay");
        if (loginDialogue.classList.contains("hide"))
            loginDialogue.classList.remove("hide");
        else
            loginDialogue.classList.add("hide");
    }

    function logout() {
        sessionStorage.removeItem("admin");
        sessionStorage.removeItem("user");
        for (let element of document.getElementsByClassName("is-login")) {
            element.classList.add("hide");
        }
        for (let element of document.getElementsByClassName("login")) {
            element.classList.remove("hide");
        }
        getUser();
        window.location.href = "index.html";
    }

    function test() {
        const hamburger = document.getElementById("hamburger");
        const hamburgerMenu = document.getElementById("hamburger-menu-container");
        const svg = document.getElementById("hamburgerDiv");
        if (hamburger.classList.length > 0) {
            hamburger.classList.remove("active");
            hamburgerMenu.classList.add("hamburger-menu-inactive")
            hamburgerMenu.classList.remove("hamburger-menu-active")
        }
        else {
            hamburger.classList.add("active");
            hamburgerMenu.classList.add("hamburger-menu-active")
            hamburgerMenu.classList.remove("hamburger-menu-inactive")
        }

    }
    function getCarIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || '-1'; // Default to car 0 if no ID provided
    }
