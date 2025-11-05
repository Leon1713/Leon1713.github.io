let currSelectedCar = -1;
let myMap = new Map();
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
    alert("Leaving Dashboard");
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

function initPage() {
    myMap.clear();
    document.getElementById("user-mail").innerText = sessionStorage.getItem("user");
    //populate grid from storage
    const gridDiv = document.getElementById("u-c-grid");
    var counter = 0;
    var mCounter = 0;
    for (const data of userData) {
        if (data.uname != sessionStorage.getItem("user").substring(0, sessionStorage.getItem("user").indexOf("@"))) {
            ++counter;
            continue;
        }
        var temp = document.createElement('div');
        temp.classList.add("user-content");
        temp.innerHTML = `<div class="user-content-top">
                    <h3 id="booking-sn" data-indice="`+ counter + `" class="booking-sn">Booking ` + data.bookId + `</h3>
                    <div class="booking-status `+ seeStatus(data.status) + `">
                        <p>`+ data.status + `</p>
                    </div>
                </div>
                <div class="user-content-mid-top">
                    <div class="user-content-image">
                        <img data-source-location="src/components/pages/UserDashboardPage.tsx:175:28"
                            src="`+ carData[Number(data.car)].image + `"
                            alt="`+ carData[Number(data.car)].name + `" width="80" class="w-20 h-16 object-cover rounded" data-dynamic="alt src"
                            style="">
                    </div>
                    <div class="user-content-info">
                        <h4 class="content-name">`+ carData[Number(data.car)].name + `</h4>
                        <p class="content-brand">`+ carData[Number(data.car)].brand + `</p>
                    </div>  
                </div>
                <div class="user-content-bot">
                    <div class="bot-ctn">
                        <i data-lucide="calendar"></i>
                        <p>`+ data.dateStart + ` to ` + data.dateEnd + `</p>
                    </div>
                    <div class="bot-ctn">
                        <i data-lucide="map-pin"></i>
                        <div class="pickup">
                            <p>Pickup: </p>
                            <p>`+ data.pickupAdd + `</p>
                        </div>
                    </div>
                    <div class="bot-ctn">
                        <i data-lucide="map-pin"></i>
                        <div class="return">
                            <p>Return: </p>
                            <p>`+ data.returnAdd + `</p>
                        </div>
                    </div>
                    <div class="cost bot-ctn">
                        <i data-lucide="dollar-sign"></i>
                        <p>Total: $`+ data.totalCost.toFixed(2).toString() + `</p>
                    </div>
                </div>
                <button class="view-car-btn" data-carId="1" onclick="viewPayment(`+ counter.toString() + `)">Complete payment</button>`;

        gridDiv.appendChild(temp);
        myMap.set(counter, mCounter);
        ++counter;
        ++mCounter
    }
    lucide.createIcons();
}

if (carData) {
    initPage();
}
else {
    loadCars().then(() => {
        initPage();
    })
}

function viewPayment(index) {
    const overlayPrice = document.getElementById("overlay-price");
    overlayPrice.innerText = userData[index].totalCost.toFixed(2).toString();
    currSelectedCar = index;

    const overlay = document.getElementById('pay-overlay');
    overlay.classList.remove("hide");
}

function sd() {
    alert("hi");
}
function closeB() {
    let x = document.getElementById("pay-overlay");
    x.classList.add("hide");
}

function pay() {
    const bookingStatus = document.getElementsByClassName("booking-status");
    if (currSelectedCar === -1) {
        closeB();
    }
    userData[currSelectedCar].status = "Completed";
    removeStatus();
    bookingStatus[myMap.get(currSelectedCar)].classList.add("booking-complete");
    bookingStatus[myMap.get(currSelectedCar)].children[0].innerText = userData[currSelectedCar].status;
    
    localStorage.setItem("user-data", JSON.stringify(userData));
    closeB();
}


function seeStatus(status) {
    const bookingStatus = document.getElementsByClassName("booking-status");

    status = status.toLowerCase();
    switch (status) {
        case "active": return "booking-active";
        case "returned": return "booking-return";
        case "completed": return "booking-complete";
        case "canceled": return "booking-cancel";
        default: return "";
    }
}

function removeStatus() {
    const bookingStatus = document.getElementsByClassName("booking-status");

    for (var status of bookingStatus) {
        status.classList.remove("booking-active")
        status.classList.remove("booking-return")
        status.classList.remove("booking-complete")
        status.classList.remove("booking-cancel")
    }
}