function toggle(key) {
    const list = document.getElementsByClassName("progress-content-ctn");
    for (e of list) {
        if (e !== document.getElementById(key))
            e.classList.add("hide");
        else {
            if (e.id === "overview-tab") {
                addAnimation();
            }
            else {
                removeAnimation();
            }
            e.classList.remove("hide");
        }
    }
}

function addAnimation() {
    let childOverview = document.getElementById('overview-tab');
    childOverview = childOverview.children;

    for (let i = 0; i < childOverview.length; ++i) {
        setTimeout(() => {
            childOverview[i].classList.add("animateOverview");
        }, 100 * i);
    }

}
function removeAnimation() {
    let childOverview = document.getElementById('overview-tab');
    childOverview = childOverview.children;
    for (let i = 0; i < childOverview.length; ++i) {

        childOverview[i].classList.remove("animateOverview");
    }
}

function processRent(element) {
    if (element.classList.contains("buttonNotFocus"))
        return;

    let rentprogress = document.getElementById("rental-progress");
    let user = userData[Number(getCarIdFromUrl())];

    const progressFill = document.getElementById("progress-filler");
    let temp = document.getElementsByClassName("rental-action-button");

    let proStats = document.getElementById("progress-parent");
    let proStatChild = proStats.children;
    if (element.dataset.action === "rent") {
        progressFill.style.width = "50%";
        rentprogress.innerText = "50% Complete"
        element.classList.remove("buttonFocus");
        element.classList.add("buttonNotFocus");
        proStatChild[1].classList.add("highlight");
        user.status = "Active";
        updateStatus(seeStatus(user.status))
    }
    else if (element.dataset.action === "return") {
        rentprogress.innerText = "75% Complete"

        progressFill.style.width = "75%";
        element.classList.remove("buttonFocus");
        element.classList.add("buttonNotFocus");
        proStatChild[2].classList.add("highlight");
        user.status = "Returned";

        updateStatus(seeStatus(user.status))


    }
    else if (element.dataset.action === "complete") {
        rentprogress.innerText = "100% Complete"

        progressFill.style.width = "100%";
        element.classList.remove("buttonFocus");
        element.classList.add("buttonNotFocus");
        proStatChild[3].classList.add("highlight");
        user.status = "Completed";
        updateStatus(seeStatus(user.status))


    }
    else if (element.dataset.action === "cancel") {
        progressFill.style.width = "0%";
        rentprogress.innerText = "0% Complete"

        for (e of temp) {
            e.classList.remove("buttonFocus");
            e.classList.add("buttonNotFocus");
        }
        for (element of proStatChild) {
            element.classList.remove("highlight");
        }


        user.status = "Canceled";

        updateStatus(seeStatus(user.status))

    }

    for (i = 0; i < temp.length; ++i) {
        if (temp[i] === element && (!element.classList.contains("cancelBook") && !temp[i + 1].classList.contains("cancelBook"))) {
            temp[i + 1].classList.remove("buttonNotFocus");
            temp[i + 1].classList.add("buttonFocus");
        }
    }
    localStorage.setItem("user-data", JSON.stringify(userData));
}

function doInspection()
{
    const currCost = document.getElementById("final-cost");
    let i = Number(getCarIdFromUrl());
    const inspectList = document.getElementById("inspect-list");
    let entry = document.createElement("div");
    entry.classList.add("inspect-entry");
    entry.innerHTML =`<div class="entry-left">
                                <p class="entry-date">11/4/25</p>
                                <p class="inspect-condition">Condition: good</p>
                                <p class="inspect-damage">Damages: minor scratch on vehicle</p>
                                <p class="inspect-note">Notes: kill me now</p>
                            </div>
                            <div class="entry-right">
                                <p class="inspect-cost">$250</p>
                                <p class="inspect-repair">Repair Cost</p>
                            </div>`;
                            inspectList.append(entry);
    var inspectionArr=
        {
            condition : "Excellent",
            damages : "Dummy damage",
            repairCost : 250,
            notes : "dummy notes"
        };

        if( !userData[i].inspection)
        {
               let newUser = {...userData[i], inspection:[] };
               userData[i] = newUser;
        }
    userData[i].inspection.push(inspectionArr);
    for(inspect of userData[i].inspection)
    {
        userData[i].totalCost += inspect.repairCost;
    }

    localStorage.setItem("user-data", JSON.stringify(userData));
    
    currCost.innerText =  userData[i].totalCost.toFixed(2).toString();
    alert("add inspection");
}

function initDashboard() {
    let rentprogress = document.getElementById("rental-progress");
    let i = getCarIdFromUrl();
    let user = userData[i];
    const bookStatus = document.getElementById("book-status");
    const bookId = document.getElementById("book-id");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const finalCost = document.getElementById("final-cost");
    const vechicleName = document.getElementById("vehicle-name");
    const vechicleCat = document.getElementById("vehicle-category");
    const vechicleCost = document.getElementById("cost-perday");
    const vehicleStatus = document.getElementById("vehicle-status-id");
    const startDate = document.getElementById("start-date");
    const endDate = document.getElementById("end-date");
    const puLoc = document.getElementById("pickUpLocation");
    const doLoc = document.getElementById("dropOffLocation");

    let userStatus = userData[i].status;
    let userCar = carData[Number(userData[i].car)];
    updateStatus(seeStatus(userStatus));


    bookStatus.innerText = userStatus;
    bookId.innerText = user.bookId;
    name.innerText = user.name;
    email.innerText = user.uname;
    if (userStatus.inspection) {
        for (inspect of userStatus.inspection) {
            userData[i].totalCost = userData[i].totalCost + inspect.repairCost;
        }

    }
    finalCost.innerText = user.totalCost.toFixed(2).toString();

    vechicleName.innerText = userCar.name;
    vechicleCat.innerText = userCar.category;
    vechicleCost.innerText = "$" + userCar.price.toFixed(2).toString();
    vehicleStatus.innerText = "Avaliable";
    startDate.innerText = user.dateStart
    endDate.innerText = user.dateEnd;
    puLoc.innerText = user.pickupAdd;
    doLoc.innerText = user.returnAdd;

    const progressFill = document.getElementById("progress-filler");
    let proStats = document.getElementById("progress-parent");
    let proStatChild = proStats.children;
    let tempA = document.getElementsByClassName("rental-action-button");

    if (user.status === "Active") {
        progressFill.style.width = "50%";
        rentprogress.innerText = "50% Complete"
        tempA[0].classList.remove("buttonFocus");
        tempA[0].classList.add("buttonNotFocus");
        tempA[1].classList.remove("buttonNotFocus");
        tempA[1].classList.add("buttonFocus");
        proStatChild[1].classList.add("highlight");

        updateStatus(seeStatus(user.status))
    }
    else if (user.status === "Returned") {
        progressFill.style.width = "75%";
        rentprogress.innerText = "75% Complete"
        tempA[1].classList.remove("buttonFocus");
        tempA[1].classList.add("buttonNotFocus");
        tempA[2].classList.remove("buttonNotFocus");
        tempA[2].classList.add("buttonFocus");
        proStatChild[2].classList.add("highlight");
        updateStatus(seeStatus(user.status))


    }
    else if (user.status === "Completed") {
        progressFill.style.width = "100%";
        rentprogress.innerText = "100% Complete"
        tempA[2].classList.remove("buttonFocus");
        tempA[2].classList.add("buttonNotFocus");
        proStatChild[3].classList.add("highlight");
        user.status = "Completed";
        updateStatus(seeStatus(user.status))


    }
    else if (user.status === "Canceled") {
        progressFill.style.width = "0%";
        rentprogress.innerText = "0% Complete"
        for (e of tempA) {
            e.classList.remove("buttonFocus");
            e.classList.add("buttonNotFocus");
        }
        for (element of proStatChild) {
            element.classList.remove("highlight");
        }
        updateStatus(seeStatus(user.status))

    }
    else
    {
        tempA[0].classList.remove("buttonNotFocus");
        tempA[0].classList.add("buttonFocus");
    }

}

function updateStatus(statusClass) {
    if (statusClass === "")
        return;

    const bookStatus = document.getElementById("book-status");
    const book = bookStatus.parentElement;

    book.classList.remove("booking-active");
    book.classList.remove("booking-return");
    book.classList.remove("booking-complete");

    book.classList.add(statusClass);
}

function seeStatus(status) {
    const bookStatus = document.getElementById("book-status");

    bookStatus.innerText = status;

    status = status.toLowerCase();
    switch (status) {
        case "active": return "booking-active";
        case "returned": return "booking-return";
        case "completed": return "booking-complete";
        case "canceled": return "booking-cancel";
        default: return "";
    }
}


initDashboard();
addAnimation();