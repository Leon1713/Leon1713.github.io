var isReg = false;

document.getElementById("click-container").addEventListener("click", togglepw);

function toggleRegister() {
    isReg = !isReg;

    const title = document.getElementById("login-big");
    const sub = document.getElementById("login-small");
    const regDesc = document.getElementById("register");
    const btn = document.getElementById("action-btn");

    if (isReg) {
        title.innerText = "Register now";
        sub.innerText = "register now to gain access to bookings management";
        btn.innerText = "Register now";
        regDesc.innerText = "Already have an account? Sign in"
    }
    else {

        title.innerText = "Welcome Back";
        sub.innerText = "Sign in to access your luxury car rentals"
        btn.innerText = "Sign in";
        regDesc.innerText = "Don't have an account? Create one"

    }
}
function Login() {

    const email = document.getElementById("email");
    const pw = document.getElementById("input-pw");
    if (!validateForm())
        return;
    else if (isReg) {

        let temp = (localStorage.getItem("userAuth")) ? (localStorage.getItem("userAuth")) : [];
        
        if(!Array.isArray(temp) && temp) temp = JSON.parse(temp);
        for(const data of temp)
        {
            if(data.username == email.value)
            {
                Msg(3,"Email is in used");
                return;
            }
        }
        
        temp.push(
            {
                username: email.value,
                password: pw.value
            }
        )
        localStorage.setItem("userAuth", JSON.stringify(temp));
        toggleRegister();
    }
    else {
        if (fakeAuth()) {
            sessionStorage.setItem("user", document.getElementById("email").value)
            if (getCarIdFromUrl() === "-1") {
                alert("redirecting to dashboard");
                window.location.href = "user_dashboard.html";
            }
            else {
                alert("redirecting to payment");
                window.location.href = "payment.html?id=" + getCarIdFromUrl();
            }
        }
    }
}

function fakeAuth() {
    const email = document.getElementById("email");
    const pw = document.getElementById("input-pw");
    const users = localStorage.getItem("userAuth");
    if(!users)
    {
        Msg(3,"incorrect username or password!" );
        return false;
    }
    var t_users = JSON.parse(users);
    for (const user of t_users) {
        if (user.username === email.value && user.password === pw.value) {
            Msg(3, "redirecting user");
            return true;
        }
    }
    Msg(3, "incorrect username or password!");
    return false;
}

async function Msg(fadeInSeconds, message) {
    const p = document.getElementById('login-small');
    const text = document.createElement('p');
    text.innerText = message;
    text.style.color = "red";
    p.insertAdjacentElement("afterend", text);

    setTimeout(() => {
        text.remove();
    }, fadeInSeconds * 1000);
}
function togglepw() {

    var PWfield = document.getElementById("input-pw");
    const eye = document.getElementById("show-pw");
    const eyeoff = document.getElementById("hide-pw");
    if (PWfield.type === "password") {
        PWfield.type = "text";
        eyeoff.classList.remove("hide");
        eye.classList.add("hide");
    }
    else {
        PWfield.type = "password";
        eyeoff.classList.add("hide");
        eye.classList.remove("hide");
    }
}

function validateForm() {
    let x = document.forms["myForm"]["uname"].value;
    let y = document.forms["myForm"]["pwname"].value;
    return x && y;
}

function handleSubmit(event) {
    event.preventDefault();
    Login();
}
