document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
});


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

    window.location.href = "index.html"
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

function toggle(id) {
    for (var i of document.getElementsByClassName("dashboard-tab-content")) {
        i.classList.add("hide");
    }
    document.getElementById(id).classList.remove("hide");

}

function seeStatus(status)
{
    status= status.toLowerCase();
    switch(status)
    {
        case "active": return "booking-active";
        case "returned": return "booking-return";
        case "completed": return "booking-complete";
        case "canceled": return "booking-cancel";
        default: return "";
    }
}

function initDashboard() {
    var counter = 0;
    //booking
    const booking = document.getElementById("booking-tab-db-items");

    for (const data of userData) {
        var temp = document.createElement("div");
        temp.classList.add("dashboard-content");
        temp.innerHTML = `<div class="dashboard-content-left">
                            <!--Booking specifics-->
                            <div class="booking-details-top">
                                <h3 class="booking-name">`+ data.name + `</h3>
                                <div class="booking-status `+ seeStatus(data.status) +`">
                                    <p>`+ data.status + `</p>
                                </div>
                            </div>
                            <div class="booking-details-bottom">
                                <p class="booking-id">Booking: `+ data.bookId + `</p>
                                <p class="booking-date">`+ data.dateStart + ` to ` + data.dateEnd + `</p>
                            </div>
                        </div>
                        <div class="dashboard-content-right">
                            <p class="booking-price">$`+ data.totalCost.toFixed().toString() + `</p>
                            <button class="content-action-btn" data-user="`+ counter + `"onclick="processRental(this.dataset.user)">
                                <p>Manage</p>
                                <i data-lucide="move-right"></i>
                            </button>
                        </div>`;

        booking.appendChild(temp);
        ++counter;

    }
    lucide.createIcons();
    populateFleet();    
}

if (carData) {
    initDashboard();
}
else {
    loadCars().then(() => {
        initDashboard();
    });
}


function onValueChange(value) {
    const bookingCard = document.querySelectorAll('#booking-tab-db-items > .dashboard-content');
    if (!value || value === "") {
        for (const card of bookingCard)
            card.classList.remove("hide");

        return;
    }
    for (const card of bookingCard) {
        const name = card.querySelectorAll('.booking-name');
        var temp = name[0].innerText.toLowerCase();

        if (!temp.includes(value.toLowerCase())) {
            card.classList.add("hide");
        }
        else {
            card.classList.remove("hide");
        }
    }
}





function populateFleet() {
    const fleetGrid = document.getElementById("fleet-ctn-grid");
    for (car of carData) {
        
        let card = document.createElement('div');
        card.classList.add("dashboard-content");
        let cardContentLeft = document.createElement('div');
        cardContentLeft.classList.add("dashboard-content-left-fleet");
        let carDetailTop = document.createElement('div');
        carDetailTop.classList.add("car-details-top");
        let carName = document.createElement('p');
        carName.classList.add("car-db-name");
        carName.innerText = car.name;
        let carCat = document.createElement('p');
        carCat.classList.add("car-db-cat");
        carCat.innerText = car.category;
        let carDetailBot = document.createElement('div');
        carDetailBot.classList.add("car-details-bottom");
        let carPrice = document.createElement('p');
        carPrice.classList.add("car-db-price");
        carPrice.innerText = "$" + car.price.toFixed(2).toString() +"/day";
        let cardContentRight = document.createElement('div');
        cardContentRight.classList.add("dashboard-content-right");
        let carDetailStatus = document.createElement('div');
        carDetailStatus.classList.add("car-status");
        let carStatusReal = document.createElement('p');
        
        var random = Math.random();
        if(random <= 0.5)
        {
            carStatusReal.innerText = "Avaliable";
        }
        else
        {
            carStatusReal.innerText = "Rented";
            carDetailStatus.classList.add("rented");
        }

        
        carDetailTop.append(carName);
        carDetailTop.append(carCat);

        carDetailBot.append(carPrice);
        
        carDetailStatus.append(carStatusReal);

        cardContentLeft.append(carDetailTop);
        cardContentLeft.append(carDetailBot);

        cardContentRight.append(carDetailStatus);
        
        card.append(cardContentLeft);
        card.append(cardContentRight);

        fleetGrid.append(card);

    }

}

function processRental(data)
{
    window.location.href = "rental_process.html?id="+data;
}

