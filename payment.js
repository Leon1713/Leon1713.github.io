function back() {
    var i = getCarIdFromUrl();
    window.location.href = "A2_Car_Detail.html?id=" + i;
}
if (carData) {
    initializePaymentPage();
}
else {
    loadCars().then(() => {
        initializePaymentPage();
    });
}

const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");

function initializePaymentPage() {
    var i = getCarIdFromUrl();

    const name = document.getElementById("car-name-s");
    const brand = document.getElementById("car-brand-s");
    const carType = document.getElementById("car-type-s");
    const cost = document.getElementById("daily-rate");
    const dayCount = document.getElementById("duration");
    const subtotal = document.getElementById("subtotal");
    const taxAmount = document.getElementById("tax");
    const total = document.getElementById("total-cost");
    const img = document.getElementById("car-img");

    name.innerText = carData[i].name;
    brand.innerText = carData[i].brand;
    carType.innerText = carData[i].category;
    cost.innerText = "$" + (carData[i].price).toFixed(2).toString();
    dayCount.innerText = "1";
    subtotal.innerText = "$" + (carData[i].price).toFixed(2).toString();
    taxAmount.innerText = "$" + (carData[i].price * 0.1).toFixed(2).toString();
    total.innerText = "$" + (carData[i].price * 1.1).toFixed(2).toString();
    img.src = carData[i].image;
}

function formSubmitEvent(event) {
    event.preventDefault()
    writeToDatabase();
}

function updateCost() {
    var i = getCarIdFromUrl();

    if (!startDateInput.value || !endDateInput.value)
        return;

    var start = new Date(startDateInput.value);
    var end = new Date(endDateInput.value);
    if (end - start < 0)
        return;
    const cost = document.getElementById("daily-rate");
    const oneDay = 1000 * 60 * 60 * 24;
    const subtotal = document.getElementById("subtotal");
    const dayCount = document.getElementById("duration");
    const taxAmount = document.getElementById("tax");
    const total = document.getElementById("total-cost");
    const paymentBtn = document.getElementById("payment-btn");

    var dayElasped = ((end - start) / oneDay) + 1

    dayCount.innerText = dayElasped.toString();
    subtotal.innerText = "$" + (dayElasped * carData[i].price).toFixed(2).toString();
    taxAmount.innerText = "$" + (((dayElasped * carData[i].price) * 10) / 100).toFixed(2).toString();
    total.innerText = "$" + ((dayElasped * carData[i].price) * 1.10).toFixed(2).toString();
    paymentBtn.innerText = "Complete Payment - " + total.innerText;
}