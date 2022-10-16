var signInBtn = document.querySelector(".btn")
signInBtn.addEventListener("click", signIn)
logInValidity()


function signIn(event) {
    event.preventDefault()
    var emailInput = document.querySelector("#inputEmail3")
    var passwordInput = document.querySelector("#inputPassword3")
    localStorage.setItem("email", emailInput.value)
    localStorage.setItem("password", passwordInput.value)
    localStorage.setItem("login", true)
    window.location.href = '/homepage.html';
}

function logInValidity() {
    //check if local storage login is true
    var LoggedIn = localStorage.getItem("login")
    if (LoggedIn == "true") {
        //display homepage if user is logged in
        window.location.href = '/homepage.html';
    } else {
        //if local storage is false, user returns to login page
        return
    }

}





