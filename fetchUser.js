
let userData = localStorage.getItem("user-data");



function fetchUsers() {
    if(userData)
    {
        temp = JSON.parse(userData);
        userData = temp;
    }
    else
    {
        userData=[];
    }
}

fetchUsers();

function generateBookingNumber() {
  const now = Date.now().toString(36).toUpperCase(); // base36 timestamp
  const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `BK-${now}-${rand}`;
}

function writeToDatabase(){
    // get all the ids and stuff
    alert("try save data");

    const fname= document.getElementById("fname").value;
    const lname= document.getElementById("lname").value;

    var name = fname +" "+lname;

    var names = document.getElementsByClassName("login-message");
    let uname = "";
    for(n of names)
    {
        if(n.innerText != "")
        uname = n.innerText.substring(9);
    }
    var dayCount = document.getElementById("duration").innerText;
    var car = getCarIdFromUrl();
    var bookId = generateBookingNumber();
    var status="Booked";
    var dateStart = document.getElementById("startDate").value.toString();
    var dateEnd=document.getElementById("endDate").value.toString();
    var pickupAdd =document.getElementById("pickupLocation").value.toString();
    var returnAdd = document.getElementById("dropoffLocation").value.toString();
    var totalCost = carData[car].price * Number(dayCount) * 1.1; 
    var inspectionArray =[
        {
            condition : "Excellent",
            damages : "Dummy damage",
            repairCost : 0,
            notes : "dummy notes"
        }
    ];
    const bookingDetailsArray = 
        {
            name :name,
            uname:uname,
            car: car,
            bookId: bookId,
            status: status,
            dateStart: dateStart,
            dateEnd: dateEnd,
            pickupAdd : pickupAdd,
            returnAdd : returnAdd,
            totalCost: totalCost,
            inspection: inspectionArray
        };

    userData.push(bookingDetailsArray);
    localStorage.setItem("user-data", JSON.stringify(userData));
}


function getCarIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || '0'; // Default to car 0 if no ID provided

}
