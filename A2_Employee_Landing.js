function getUser() {
    if (sessionStorage.getItem("admin")) {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.remove("hide");
            i.href ="A2_Rental_Dashboard.html";
        }
    }
    else if (sessionStorage.getItem("user")) {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.remove("hide");
            i.href="user_dashboard.html";
        }
    }
    else {
        for (var i of document.getElementsByClassName("rental-dashboard-acess")) {
            i.classList.add("hide");
        }
    }
}
getUser();

function Login() {
    if (!validateForm())
        return;

    let KEY = "admin";
    const user = document.getElementById("idInput").value;
    sessionStorage.setItem(KEY, user);
}

function validateForm() {
    let x = document.forms["myForm"]["uname"].value;
    let y = document.forms["myForm"]["pwname"].value;
    return x && y;
}

