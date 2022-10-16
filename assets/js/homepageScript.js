var logOutBtn = document.querySelector("#signOut")
logOutBtn.addEventListener("click",signOutUser)
function signOutUser() {
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.setItem("login", false)
    window.location.href="./index.html"
}


//user clicks logout button
//clear e-mail and password and set is   localStorage.setItem("login", false)
//redirect to login page
