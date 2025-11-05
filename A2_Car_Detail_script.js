SESSION_KEY = "demo_auth_session";
STORAGE_KEY = "demo_auth_storage";

document.getElementById("hamburger").addEventListener("click", test);


function getUser() {
    if (sessionStorage.getItem("admin")) {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.remove("hide");
        }
    }
    else {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.add("hide");
        }
    }
}
getUser();

async function loadCars() {
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

function isLogin() {
    if (sessionStorage.getItem("admin") || sessionStorage.getItem("user")) {
        for (var i of document.getElementsByClassName("login-message")) {
            i.innerText = "Welcome, " + (sessionStorage.getItem("admin") ? sessionStorage.getItem("admin") : sessionStorage.getItem("user").substring(0, sessionStorage.getItem("user").indexOf("@")));
        }
        for (let element of document.getElementsByClassName("is-login")) {
            element.classList.remove("hide");
        }
        for (let element of document.getElementsByClassName("login")) {
            element.classList.add("hide");
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

function reserveCar() {
    if (sessionStorage.getItem("user") || sessionStorage.getItem("admin"))
        window.location.href = "payment.html?id=" + getCarIdFromUrl();
    else {
        alert("please login");
        window.location.href = "user_landing.html?id=" + getCarIdFromUrl();
    }
}

function getCarIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '0'; // Default to car 0 if no ID provided
}

function LoadCarIntoPage() {
    const carId = getCarIdFromUrl();
    const car = carData[carId];

    if (!car) {
        window.location.href = 'index.html';
        return;
    }
    document.title = `${car.brand} ${car.name} - AZOOM`;
    document.getElementById("car-brand").innerText = car.brand;
    document.getElementById("car-name").innerText = car.name;
    document.getElementById("car-description").innerText = car.longdescription;
    document.getElementById("car-price").innerText = "$" + car.price;
    document.getElementById("car-spec-engine").innerText = car.specs["engine"];
    document.getElementById("car-spec-power").innerText = car.specs["power"];
    document.getElementById("car-spec-torque").innerText = car.specs["torque"];
    document.getElementById("car-spec-transmission").innerText = car.specs["transmission"];
    document.getElementById("car-spec-speed").innerText = car.specs["0-100 km/h"];
    document.getElementById("car-spec-top-speed").innerText = car.specs["top speed"];
    document.getElementById("car-spec-weight").innerText = car.specs["weight"];
    document.getElementById("car-spec-fuel").innerText = car.specs["fuel type"];
    document.getElementById("car-spec-seating").innerText = car.specs["seating"];
    document.getElementById("reserve-text").innerText = "Reserve your " + car.name + " today and discover what true automotive luxury feels like."
    document.getElementById("carImage").src = car.image
    var featureTitle = document.getElementsByClassName("feature-text-title");
    var featuredesc = document.getElementsByClassName("feature-description");
    console.log(featureTitle);
    for (let i = 0; i < 3; ++i) {
        featureTitle[i].innerText = car.features[i];
        featuredesc[i].innerText = car["features-description"][i];

    }
}
if (carData) {
    LoadCarIntoPage();
}
else {
    loadCars().then(() => {
        LoadCarIntoPage();
    });
}