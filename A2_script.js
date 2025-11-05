
// Dark Mode Toggle




let category = "";
let brands = ""
let carSize;

var customer_login_buttons = document.getElementsByClassName("customer-login");
for (var e of customer_login_buttons) {
    e.addEventListener("click", () => {
        window.location.href = "user_landing.html";
    })
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
    getUser();
}

async function loadCars() {
    try {
        const response = await fetch('A2_CarData.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Car data loaded:', data);

        // Example: access specific car
        carSize = data.length
        carData = data;

    } catch (error) {
        console.error('Failed to fetch car data:', error);
    }
}
function observeEf() {
    const fadeElements = document.querySelectorAll('.why-us-card,.animateOnScroll');
    fadeElements.forEach(element => {
        element.classList.add("animate");
    })
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animateScrollUp');
                entry.target.classList.remove('animate')
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    fadeElements.forEach(el => observer.observe(el));
}
if (carData) {
    carSize = carData.length;
    checkGrid();
}
else {
    loadCars().then(() => {
        console.log("Cars ready", carData);
        checkGrid();
    });
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

const catSelect = document.getElementById("cat-select");
if (catSelect)
    catSelect.addEventListener("change", (e) => {
        setCat(e.target.value);
    });

const brandSelect = document.getElementById("brand-select");
if (brandSelect)
    brandSelect.addEventListener("change", (e) => {
        setBrand(e.target.value);
    });
function setCat(val) {
    category = val;
    Filter();
}
function setBrand(val) {
    brands = val;
    Filter();
}

function Filter() {
    const gridDiv = document.getElementById("car-grid");
    gridDiv.innerHTML = "";
    if (category == "" && brands == "") {
        populateGrid(0);
        return;
    }
    const maxCar = document.getElementById("car-range");
    let size = Object.keys(carData).length;
    let countCar = 0;
    for (let i = 0; i < size; ++i) {
        if ((brands == "" && carData[i].category != category && category != "") || (category == "" && carData[i].brand != brands && brands != "") || ((carData[i].brand != brands || carData[i].category != category) && brands != "" && category != ""))
            continue;
        ++countCar
        let aNode = document.createElement("a");
        aNode.href = 'A2_Car_Detail.html?id=' + i;
        aNode.classList.add("car-card");
        aNode.classList.add("animateOnScroll");
        aNode.innerHTML = ` <div class="car-image">
                    <img src="`+ carData[i].image + `"
                        alt="` + carData[i].name + `" class="car-img">
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <div class="car-details">
                            <p class="car-brand">`+ carData[i].brand + `</p>
                            <h3 class="car-name">`+ carData[i].name + `</h3>
                        </div>
                        <p class="car-price">$`+ carData[i].price + `</p>
                    </div>
                    <p class="car-description">
                        `+ carData[i].description + `
                    </p>
                    <div class="car-link">
                        <span>View Details</span>
                        <span class="link-icon">→</span>
                    </div>
                </div>`

        gridDiv.appendChild(aNode);

    }
    maxCar.innerText = "Showing " + countCar + " of " + size + " Vehicles"
    observeEf();
}
document.getElementById("hamburger").addEventListener("click", test);

// Booking Confirmation Popup
const form = document.querySelector('.booking-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Booking confirmed! Thank you for choosing AZONE.');
        form.reset();
    });
}

function populateGrid(num = 0) {
    const maxCar = document.getElementById("car-range");
    if (maxCar)
        maxCar.innerText = "Showing " + carSize + " of " + carSize + " Vehicles"
    const gridDiv = document.getElementById("car-grid");
    let size;
    if (num == 0)
        size = Object.keys(carData).length;

    else {
        size = num
    }

    for (let i = 0; i < size; ++i) {
        console.log(i);
        let aNode = document.createElement("a");
        aNode.href = 'A2_Car_Detail.html?id=' + i;
        aNode.classList.add("car-card");
        aNode.classList.add("animateOnScroll");
        aNode.innerHTML = ` <div class="car-image">
                    <img src="`+ carData[i].image + `"
                        alt="` + carData[i].name + `" class="car-img" width="348" height="256">
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <div class="car-details">
                            <p class="car-brand">`+ carData[i].brand + `</p>
                            <h3 class="car-name">`+ carData[i].name + `</h3>
                        </div>
                        <p class="car-price">$`+ carData[i].price + `</p>
                    </div>
                    <p class="car-description">
                        `+ carData[i].description + `
                    </p>
                    <div class="car-link">
                        <span>View Details</span>
                        <span class="link-icon">→</span>
                    </div>
                </div>`

        gridDiv.appendChild(aNode);

    }
    observeEf();

}
function checkGrid() {
    if (window.location.pathname == "/index.html") {
        populateGrid(6);
    }
    else {
        populateGrid(0);
    }
}

